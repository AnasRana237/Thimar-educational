// ============================================================
// SITE SETTINGS — edit contact details here
// ============================================================

export const site = {
  whatsappNumber: "966542987885", // digits only, international format
  whatsappDisplay: "+966 54 298 7885",
  email: "gmail@thimarph.com",
  phoneDisplay: "+966 54 298 7885",
  // Web3Forms access key — contact-form submissions are relayed through
  // Web3Forms and delivered to the inbox this key is registered to
  // (gmail@thimarph.com). The key is a public submit-only token, safe to ship in
  // the frontend bundle; it cannot read mail or change the destination address.
  // To add a CC recipient, configure it in the Web3Forms dashboard for this form.
  web3formsKey: "c6349a43-d293-49dc-8390-536117f5f0a2",
  social: {
    instagram: "https://instagram.com/", // [INSTAGRAM URL]
    twitter: "https://x.com/", // [X / TWITTER URL]
    tiktok: "https://tiktok.com/", // [TIKTOK URL]
  },
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
