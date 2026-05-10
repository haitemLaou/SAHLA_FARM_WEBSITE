import i18n from "i18next";


// ─── Config ────────────────────────────────────────────────────────────────
const TRANSLATOR_URLS = [
  process.env.REACT_APP_TRANSLATOR_URL_1,
  process.env.REACT_APP_TRANSLATOR_URL_2,
  process.env.REACT_APP_TRANSLATOR_URL_3,
  process.env.REACT_APP_TRANSLATOR_URL_4,
  process.env.REACT_APP_TRANSLATOR_URL_5,
  process.env.REACT_APP_TRANSLATOR_URL_6,
].filter(Boolean);

const SECRET_KEY = process.env.REACT_APP_TRANSLATOR_SECRET;

const cache = {};
const inFlight = {};

/**
 * Hybrid Translator
 * 1. Checks local i18n JSON templates first (Fastest)
 * 2. Checks memory cache (Fast)
 * 3. Calls Google Script Cluster (Fallback)
 */
export async function translateText(text, language) {
  if (!text || !language) return text;

  const currentLang = i18n.language || "en";

  // Skip translation ONLY when both current app language AND target are English
  const isCurrentEn = currentLang === "en" || currentLang.startsWith("en-");
  const isTargetEn = language === "en" || language.startsWith("en-");

  if (isCurrentEn && isTargetEn) return text;

  // If current language is 'ar' or 'fr' (or anything non-English),
  // translation proceeds even if target is 'en'
  const cleanText = text.toLowerCase().trim();
  const i18nPath = `profile.options.crops.${cleanText}`;

  // 1. Local i18n JSON lookup
  if (i18n.exists(i18nPath)) {
    return i18n.t(i18nPath, { lng: language });
  }

  // 2. Cache & deduplication check
  const cacheKey = `${cleanText}__${language}`;
  if (cache[cacheKey]) return cache[cacheKey];
  if (inFlight[cacheKey]) return inFlight[cacheKey];

  // 3. API translation with failover across cluster
  const translateWithRetry = async (urlIndex = 0) => {
    if (urlIndex >= TRANSLATOR_URLS.length) return text;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const url = `${TRANSLATOR_URLS[urlIndex]}?q=${encodeURIComponent(text)}&target=${language}&key=${SECRET_KEY}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.translatedText) {
        cache[cacheKey] = data.translatedText;
        return data.translatedText;
      }

      console.warn(
        `Account ${urlIndex} returned no translation, failing over...`,
      );
      return translateWithRetry(urlIndex + 1);
    } catch (error) {
      clearTimeout(timeout);
      console.warn(`Account ${urlIndex} failed:`, error.message);
      return translateWithRetry(urlIndex + 1);
    }
  };

  inFlight[cacheKey] = translateWithRetry().finally(() => {
    delete inFlight[cacheKey];
  });

  return inFlight[cacheKey];
}
