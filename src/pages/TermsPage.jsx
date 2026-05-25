import { useTranslation } from "react-i18next";
import { Nav, Footer } from "./LandingPage";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--green-dark)", marginBottom: 12, borderLeft: "4px solid var(--green-primary)", paddingLeft: 14 }}>{title}</h2>
    <div style={{ fontSize: 15, color: "rgba(25,37,20,0.7)", lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function TermsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "var(--bg)", minHeight: "100vh" }} dir={isArabic ? "rtl" : "ltr"}>
      <Nav />

      {/* Hero */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(85,187,51,0.15) 0%, transparent 70%)", padding: "140px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "var(--green-dark)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
            {t('terms_header_title')}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(25,37,20,0.6)", lineHeight: 1.8 }}>
            {t('terms_header_desc')}
          </p>
        </div>
      </section>

      {/* Content */}
      <main style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px 100px" }}>
        <Section title={t('terms_s1_title')}>
          <p>{t('terms_s1_desc')}</p>
        </Section>

        <Section title={t('terms_s2_title')}>
          <p>{t('terms_s2_p1')}<strong>{t('terms_s2_strong')}</strong>{t('terms_s2_p2')}</p>
        </Section>

        <Section title={t('terms_s3_title')}>
          <p>{t('terms_s3_desc')}</p>
        </Section>

        <Section title={t('terms_s4_title')}>
          <p>{t('terms_s4_desc')}</p>
        </Section>

        <Section title={t('terms_s5_title')}>
          <p>{t('terms_s5_desc')}</p>
        </Section>

        <Section title={t('terms_s6_title')}>
          <p>{t('terms_s6_desc')}</p>
        </Section>

        <Section title={t('terms_s7_title')}>
          <p>{t('terms_s7_desc')}</p>
        </Section>

        <Section title={t('terms_s8_title')}>
          <p>{t('terms_s8_desc')}</p>
        </Section>

        <Section title={t('terms_s9_title')}>
          <p>{t('terms_s9_desc')}</p>
        </Section>

        <Section title={t('terms_s10_title')}>
          <p>{t('terms_s10_p1')}<strong>{t('terms_s10_strong')}</strong>{t('terms_s10_p2')}</p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
