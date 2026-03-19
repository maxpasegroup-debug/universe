const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export const env = {
  API_BASE,
  WHATSAPP_LINK: process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/917591929909",
  REFERRAL_LINK: process.env.NEXT_PUBLIC_REFERRAL_LINK || "https://businesslink.com/referral/ownerlink",
};

