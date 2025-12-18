import { getRecaptchaToken } from "../recaptcha";
import { axionInstance } from "./axiosInstance";

export const getSeo = async (page,innerPage="")=>{
    try {
        const res = await axionInstance.get(`/seo/get-seo?page=${page}&innerPage=${innerPage}`)        
        return res.data.data
    } catch (error) {
        console.error(error);
        
    }
}
export const contact = async (contactData)=>{
    try {
        
        const res = await axionInstance.post(`/enquiry/save-enquiry`,contactData)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const gallery = async ()=>{
    try {
        
        const res = await axionInstance.get(`/gallery/get-images`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const faqs = async (faqs)=>{
    try {
        
        const res = await axionInstance.get(`/faq/get-all-faqs/${faqs}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const blogs = async (page,limit=8)=>{
    try {
        
        const res = await axionInstance.get(`/blog/get-blogs?page=${page}&limit=${limit}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const blogByUrl = async (blogUrl)=>{
    try {
        
        const res = await axionInstance.get(`/blog/get-blog/${blogUrl}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const blogInnerPage = async (subCategory)=>{
    try {
        
        const res = await axionInstance.get(`/blog/get-innerPage-blog/${subCategory}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}

export const getHeroSection = async () => {
    try {
        const response = await axionInstance.get(`/herosection/get-herosection`)
        return response.data
    } catch (error) {
        console.error(error);

    }
}
export const getFreezonePackages = async (url) => {
    try {
        const response = await axionInstance.get(`/packages/category-packages/${url}`)
        return response.data
    } catch (error) {
        console.error(error);

    }
}   

export const subscribeNewsletter = async (email) => {
  try {
    const trimmed = String(email || "").trim().toLowerCase();
    if (!trimmed) return { ok: false, message: "Email required" };

    // Get recaptcha token (robust) — allow null fallback
    const token = await getRecaptchaToken("newsletter_subscribe");
    const body = { email: trimmed };
    if (token) body.recaptchaToken = token;

    const res = await axionInstance.post(`/newsletter/subscribe`, body);
    return res?.data ?? { ok: false, message: "No response from server" };
  } catch (err) {
    console.error("subscribeNewsletter error:", err);
    // normalized return
    return { ok: false, message: err?.message || "Network error" };
  }
};

/**
 * Unsubscribe using a token.
 * Accepts token (from query param) and POSTs to backend.
 * Returns normalized { ok, message, ... }.
 */
export const unsubscribeNewsletter = async (token) => {
  try {
    if (!token) return { ok: false, message: "Missing token" };

    // We send as body { token } — backend supports query and body.
    const res = await axionInstance.post(`/newsletter/unsubscribe`, { token });

    return res?.data ?? { ok: false, message: "No response from server" };
  } catch (err) {
    // Normalized error return
    const message = err?.response?.data?.message || err?.message || "Network error";
    console.error("unsubscribeNewsletter error:", err);
    return { ok: false, message };
  }
};

export const GetCommonPackages = async (type = "") => {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : "";
    const res = await axionInstance.get(`/packages/common-packages${query}`);
    return res.data;
  } catch (error) {
    console.error("GetCommonPackages error:", error);
    throw error;
  }
};


export const GetCategoryPackages = async ({ categoryKey, pageName } = {}) => {
  try {
    const params = {};
    if (categoryKey) params.categoryKey = categoryKey;
    if (pageName) params.pageName = pageName;

    const res = await axionInstance.get("/packages/category-packages", { params });
    return res.data ?? null;
  } catch (err) {
    // If axios has a response object, it's an HTTP error
    if (err?.response) {
      const status = err.response.status;
      if (status === 404) {
        // Expected: category or page not found — not an app crash, warn and return null
        // Use warn to avoid huge stack logs in dev console
        // eslint-disable-next-line no-console
        console.warn(
          "GetCategoryPackages: 404 Not Found — category or page missing",
          { categoryKey, pageName, status, data: err.response.data }
        );
        return null;
      }

      // Other HTTP errors (400/500) — log and return null (silent fallback)
      // eslint-disable-next-line no-console
      console.error(
        "GetCategoryPackages: HTTP error",
        { categoryKey, pageName, status, data: err.response.data }
      );
      return null;
    }

    // Network or unknown error (no response)
    // eslint-disable-next-line no-console
    console.error("GetCategoryPackages: Network/unknown error", err);
    return null;
  }
};


