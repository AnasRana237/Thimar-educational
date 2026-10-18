// ============================================================
// SITE SETTINGS — edit contact details here
// ============================================================

export const site = {
  whatsappNumber: "966544555117", // digits only, international format
  whatsappDisplay: "+966 54 455 5117",
  email: "anasrana.abr@gmail.com",
  phoneDisplay: "+966 54 455 5117",
  // FormSubmit target — contact-form submissions are emailed here. Replace this
  // with the random alias string FormSubmit sends once the address is confirmed,
  // so the inbox is no longer in the published bundle. See DEPLOY.md step 6.
  formTarget: "anasrana.abr@gmail.com",
  social: {
    instagram: "https://instagram.com/", // [INSTAGRAM URL]
    twitter: "https://x.com/", // [X / TWITTER URL]
    tiktok: "https://tiktok.com/", // [TIKTOK URL]
  },
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
