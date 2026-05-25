import { useTranslation } from "react-i18next";
import { Nav, Footer } from "./LandingPage";

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const posts = [
    { date: t('blog_post1_date'), tag: t('blog_post1_tag'), title: t('blog_post1_title'), excerpt: t('blog_post1_excerpt') },
    { date: t('blog_post2_date'), tag: t('blog_post2_tag'), title: t('blog_post2_title'), excerpt: t('blog_post2_excerpt') },
    { date: t('blog_post3_date'), tag: t('blog_post3_tag'), title: t('blog_post3_title'), excerpt: t('blog_post3_excerpt') },
    { date: t('blog_post4_date'), tag: t('blog_post4_tag'), title: t('blog_post4_title'), excerpt: t('blog_post4_excerpt') },
    { date: t('blog_post5_date'), tag: t('blog_post5_tag'), title: t('blog_post5_title'), excerpt: t('blog_post5_excerpt') },
    { date: t('blog_post6_date'), tag: t('blog_post6_tag'), title: t('blog_post6_title'), excerpt: t('blog_post6_excerpt') },
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "var(--bg)", minHeight: "100vh" }} dir={isArabic ? "rtl" : "ltr"}>
      <Nav />

      {/* Header */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(85,187,51,0.15) 0%, transparent 70%)", padding: "140px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "var(--green-dark)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
            {t('blog_header_title')}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(25,37,20,0.6)", lineHeight: 1.8 }}>
            {t('blog_header_desc')}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ maxWidth: 1152, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 28 }}>
          {posts.map((p) => (
            <article key={p.title} style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid rgba(25,37,20,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, background: "rgba(85,187,51,0.12)", color: "#3a8a1e" }}>{p.tag}</span>
                <span style={{ fontSize: 12, color: "rgba(25,37,20,0.4)" }}>{p.date}</span>
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--green-dark)", lineHeight: 1.4, margin: 0 }}>{p.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(25,37,20,0.6)", lineHeight: 1.7, margin: 0, flex: 1 }}>{p.excerpt}</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green-primary)", cursor: "pointer" }}>{t('blog_read_more')}</span>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
