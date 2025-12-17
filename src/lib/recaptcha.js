
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

function injectScriptOnce(siteKey) {
  if (typeof document === "undefined") return Promise.resolve();
  if (document.querySelector('script[data-recaptcha="v3"]')) return Promise.resolve();
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-recaptcha", "v3");
    s.onload = () => setTimeout(resolve, 50); // small delay to let grecaptcha initialize
    s.onerror = () => setTimeout(resolve, 50);
    document.head.appendChild(s);
  });
}

function waitForGRecaptcha(timeout = 3000) {
  const start = Date.now();
  return new Promise((resolve) => {
    (function poll() {
      // @ts-ignore
      if (typeof window !== "undefined" && window.grecaptcha && window.grecaptcha.execute) {
        return resolve(true);
      }
      if (Date.now() - start > timeout) return resolve(false);
      setTimeout(poll, 80);
    })();
  });
}

/**
 * getRecaptchaToken(action = 'newsletter_subscribe', opts = { retry: true })
 * returns token string or null
 */
export async function getRecaptchaToken(action = "newsletter_subscribe", opts = { retry: true }) {
  if (!SITE_KEY) {
    console.warn("reCAPTCHA site key not set (NEXT_PUBLIC_RECAPTCHA_SITE_KEY). Skipping token.");
    return null;
  }
  if (typeof window === "undefined") return null;

  try {
    await injectScriptOnce(SITE_KEY);
    const ready = await waitForGRecaptcha(3000);
    if (!ready) {
      // the grecaptcha didn't become ready in time
      if (opts.retry) {
        // small backoff and try again once
        await new Promise((r) => setTimeout(r, 300));
        return getRecaptchaToken(action, { retry: false });
      }
      return null;
    }

    // prefer grecaptcha.ready then execute
    // @ts-ignore
    if (window.grecaptcha && window.grecaptcha.execute) {
      try {
        const token = await window.grecaptcha.execute(SITE_KEY, { action });
        if (token) return token;
      } catch (err) {
        console.warn("grecaptcha.execute error:", err);
        if (opts.retry) {
          await new Promise((r) => setTimeout(r, 300));
          return getRecaptchaToken(action, { retry: false });
        }
      }
    }
  } catch (err) {
    console.warn("getRecaptchaToken unexpected error:", err);
  }
  return null;
}
