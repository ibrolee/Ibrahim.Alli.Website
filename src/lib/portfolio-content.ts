import superplusImage from "@/assets/superplus-case.jpg";
import jisImage from "@/assets/jis-case.jpg";
import studiosImage from "@/assets/studios-case.jpg";

export const timeline = [
  ["1998", "Born."],
  ["2018", "Completed BSc in Mass Communication at Olabisi Onabanjo University."],
  ["2023", "Completed a Master’s degree in Political Science and International Relations at Bahçeşehir Cyprus University."],
  ["2024", "Worked in construction, gaining practical experience in site preparation, material handling and general site operations."],
  ["2025", "Began managing and developing digital operations for Super Plus Fitness & Spa."],
  ["2026", "Expanded into website development, digital products, business systems and freelance web development."],
] as const;

export const skills = {
  "Digital & Technology": ["Web Development", "Website Design", "Responsive Design", "E-commerce", "Business Systems", "Wix", "GitHub", "Vercel", "AI-assisted development"],
  Design: ["Canva", "Adobe Illustrator", "UI / Visual Design", "Branding", "Social Media Design"],
  Business: ["Business Management", "Digital Marketing", "Staff Management", "Customer Experience", "Business Operations"],
  Professional: ["Microsoft Office", "Communication", "Team Coordination", "Problem Solving", "Adaptability"],
};

export type Project = {
  slug: string; number: string; name: string; type: string; summary: string; image: string;
  tags: string[]; challenge: string; approach: string; build: string; result: string; tools: string[]; url?: string;
};

export const projects: Project[] = [
  { slug: "super-plus-fitness", number: "01", name: "Super Plus Fitness & Spa", type: "Business Website & Digital Systems", image: superplusImage,
    summary: "Developing and managing the digital presence of a fitness and wellness business in Lagos — from its public website to practical internal systems.",
    tags: ["Website", "Memberships", "Business systems"], url: "https://www.superplusfitness.com",
    challenge: "Bring customer information, membership journeys, promotions and everyday business processes into a clearer digital experience.",
    approach: "Treat the website and internal tools as connected parts of the same business: simplify what customers see while making recurring work easier for the team.",
    build: "A business website with membership information, registration and payment functionality, promotions, staff and membership management systems, QR/check-in related systems, and ongoing internal tools.",
    result: "A working digital foundation for the business that supports customers, staff and continued operational development without overstating unverified performance figures.",
    tools: ["Wix", "Canva", "Business systems", "Payment integration"] },
  { slug: "jis-beauty-fashion", number: "02", name: "JIS Beauty & Fashion", type: "E-commerce Website", image: jisImage,
    summary: "An e-commerce experience created to present beauty and fragrance products with clarity, polish and an easy mobile shopping journey.",
    tags: ["E-commerce", "Responsive design", "Brand presentation"],
    challenge: "Give a beauty and fragrance business a credible digital storefront where products and brand character could be presented together.",
    approach: "Use a refined visual hierarchy and mobile-first product flow so browsing and purchasing feel clear rather than crowded.",
    build: "Product presentation, e-commerce functionality, brand-led layouts, responsive pages and a customer purchasing experience.",
    result: "A complete, mobile-responsive e-commerce experience designed around product discovery and purchasing. A public URL has not been supplied.",
    tools: ["Website design", "E-commerce", "Responsive design", "Canva"] },
  { slug: "super-plus-studios", number: "03", name: "Super Plus Studios", type: "Creative / Product Design Project", image: studiosImage,
    summary: "A creative project exploring custom skins and visual identities for personal gadgets across culture, sport, nature and technology.",
    tags: ["Product design", "Visual design", "Brand exploration"],
    challenge: "Create a flexible visual world that could translate different interests into distinctive gadget skin collections.",
    approach: "Build themed collections with a consistent product presentation while allowing each category its own visual language.",
    build: "Concepts spanning gaming, anime, automotive, sports, space, abstract, nature, neon, transparent tech and blackout categories.",
    result: "A coherent creative direction for a product-design project, ready to expand as new collections and physical products are developed.",
    tools: ["Canva", "Adobe Illustrator", "Visual design", "Branding"] },
];
