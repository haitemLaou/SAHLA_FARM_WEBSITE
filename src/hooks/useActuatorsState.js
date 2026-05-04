import { useState, useEffect } from "react";
import { DASHBOARD_ACTUATORS } from "../utilities/data/dashboardData";

let globalActuators = [...DASHBOARD_ACTUATORS]; // spread to avoid reference issues
const listeners = new Set();

export default function useActuatorsState() {
  const [state, setState] = useState(globalActuators);

  useEffect(() => {
    listeners.add(setState);
    // Sync with latest global state on mount
    setState(globalActuators);
    return () => listeners.delete(setState);
  }, []);

  const setSharedActuators = (newValue) => {
    globalActuators =
      typeof newValue === "function" ? newValue(globalActuators) : newValue;
    listeners.forEach((listener) => listener(globalActuators));
  };

  return [state, setSharedActuators];
}
