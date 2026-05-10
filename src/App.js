import { Routes, Route, Outlet } from "react-router";
import { useState } from "react";
import Dashboard from "./pages/dashboard.jsx";
import AIchat from "./pages/aiChat.jsx";
import History from "./pages/history.jsx";
import CamStream from "./pages/camStream.jsx";
import Login from "./auth/login.jsx";
import SignUp from "./auth/signup.jsx";
import Settings from "./pages/settings.jsx";
import Notifications from "./pages/notifications.jsx";
import Layout from "./layout.jsx";
import NotFound from "./pages/notFound.jsx";
import HACredentialsRequired from "./pages/haCredentialsRequired.jsx";
import useFarmPreferences from "./hooks/useFarmPreferences";
import ProtectedRoute from "./pages/ProtectedRoute .jsx";
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import { HAStatusProvider, useHAStatus, INVALID_STATUSES } from "./context/HAStatusContext";

// Import your new Landing Page
import LandingPage from "./pages/LandingPage.jsx"; 

// This layout ONLY blocks access. It assumes HAStatusProvider is higher up in the tree.
const HARequiredLayout = () => {
  const { haStatus, haLoading } = useHAStatus();

  if (haLoading) return null; 
  if (INVALID_STATUSES.includes(haStatus)) return <HACredentialsRequired />;
  
  return <Outlet />; 
};

function App() {
  const {
    temperatureUnit,
    humidityUnit,
    soilMoistureUnit,
    lightIntensityUnit,
  } = useFarmPreferences();

  return (
    <>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* --- PROTECTED ROUTES --- */}
        <Route element={<ProtectedRoute />}>
          
          {/* 1. Put the Provider HERE.
            Now ALL protected pages (including Settings/Chat) can use useHAStatus() without crashing.
          */}
          <Route element={<HAStatusProvider><Layout /></HAStatusProvider>}>
            
            {/* --- GROUP A: Strict Routes --- */}
            {/* 2. Put the Guard HERE. These pages will be blocked if HA is down. */}
            <Route element={<HARequiredLayout />}>
              {/* Removed the 'index' route so '/' maps exclusively to LandingPage. 
                  Users must navigate to '/dashboard' for the app home. */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="history"
                element={
                  <History
                    temperatureUnit={temperatureUnit}
                    humidityUnit={humidityUnit}
                    soilMoistureUnit={soilMoistureUnit}
                    lightIntensityUnit={lightIntensityUnit}
                  />
                }
              />
              <Route path="stream" element={<CamStream />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* --- GROUP B: Flexible Routes --- */}
            {/* These pages won't be blocked, but can still safely read haStatus if they want to. */}
            <Route path="chat" element={<AIchat />} />
            <Route path="settings" element={<Settings />} />

          </Route>

          {/* Catch-all for protected routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;