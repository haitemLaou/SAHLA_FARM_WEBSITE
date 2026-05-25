import { useTranslation } from "react-i18next";
import { Nav, Footer } from "./LandingPage";

export default function MobileAppPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "var(--bg)", minHeight: "100vh" }} dir={isArabic ? "rtl" : "ltr"}>
      <Nav />

      {/* Hero */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(85,187,51,0.15) 0%, transparent 70%)", padding: "140px 24px 80px", textAlign: "center" }}>
        <div className="w-full px-2 mx-auto">
          <h1 style={{ fontSize: "clamp(36px,6vw,60px)", fontWeight: 900, color: "var(--green-dark)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            {t('mobile_title')}
          </h1>
          <p style={{ fontSize: 17, color: "rgba(25,37,20,0.6)", lineHeight: 1.8, marginBottom: 40 }}>
            {t('mobile_desc')}
          </p>
          {/* App store badges */}
          <div className="flex gap-3 justify-center flex-wrap">
            <a 
            href="/SahlaFarm.apk"
            download="SahlaFarm.apk"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--green-dark)" }}
          >{t('mobile_download_btn')}

            </a>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: "rgba(25,37,20,0.5)", textAlign: "center" }}>
          {t('mobile_download_hint')}
        </p>
        </div>
      </section>

      {/* Features */}
      <section style={{margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          {[
            { icon: "📡", title: t('mobile_f1_title'), desc: t('mobile_f1_desc') },
            { icon: "🤖", title: t('mobile_f2_title'), desc: t('mobile_f2_desc') },
            { icon: "🔔", title: t('mobile_f3_title'), desc: t('mobile_f3_desc') },
            { icon: "🎛️", title: t('mobile_f4_title'), desc: t('mobile_f4_desc') },
          ].map((f) => (
            <div key={f.title} style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid rgba(25,37,20,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--green-dark)", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(25,37,20,0.6)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
