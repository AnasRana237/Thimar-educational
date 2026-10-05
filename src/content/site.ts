// ============================================================
// SITE SETTINGS — edit contact details here
// ============================================================

export const site = {
  whatsappNumber: "966544555117", // digits only, international format
  whatsappDisplay: "+966 54 455 5117",
  email: "gmail@thimarph.com",
  phoneDisplay: "+966 54 455 5117",
  social: {
    instagram: "https://instagram.com/", // [INSTAGRAM URL]
    twitter: "https://x.com/", // [X / TWITTER URL]
    tiktok: "https://tiktok.com/", // [TIKTOK URL]
  },
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
