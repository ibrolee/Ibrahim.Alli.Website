import superplusImage from "@/assets/superplus-case.jpg";
import jisImage from "@/assets/jis-case.jpg";
import studiosImage from "@/assets/studios-case.jpg";

export const timeline = [
  ["1998", "Born."],
  [
    "2018",
    "Completed BSc in Mass Communication at Olabisi Onabanjo University.",
  ],
  [
    "2023",
    "Completed a Master’s degree in Political Science and International Relations at Bahçeşehir Cyprus University.",
  ],
  [
    "2024",
    "Worked in construction, gaining practical experience in site preparation, material handling and general site operations.",
  ],
  [
    "2025",
    "Began managing and developing digital operations for Super Plus Fitness & Spa.",
  ],
  [
    "2026",
    "Expanded into website development, digital products, business systems and freelance web development.",
  ],
] as const;

export const skills = {
  "Digital & Technology": [
    "Web Development",
    "Website Design",
    "Responsive Design",
    "E-commerce",
    "Business Systems",
    "Wix",
    "GitHub",
    "Vercel",
    "AI-assisted development",
  ],
  Design: [
    "Canva",
    "Adobe Illustrator",
    "UI / Visual Design",
    "Branding",
    "Social Media Design",
  ],
  Business: [
    "Business Management",
    "Digital Marketing",
    "Staff Management",
    "Customer Experience",
    "Business Operations",
  ],
  Professional: [
    "Microsoft Office",
    "Communication",
    "Team Coordination",
    "Problem Solving",
    "Adaptability",
  ],
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  type: string;
  summary: string;
  image: string;
  tags: string[];
  challenge: string;
  approach: string;
  build: string;
  result: string;
  tools: string[];
  url?: string;
};

// ACTIVE PROJECTS — displayed on the website.
export const projects: Project[] = [
  {
    slug: "super-plus-fitness",
    number: "01",
    name: "Super Plus Fitness & Spa",
    type: "Business Website & Digital Systems",
    image: superplusImage,
    summary:
      "Developing and managing the digital presence of a fitness and wellness business in Lagos — from its public website to practical internal systems.",
    tags: ["Website", "Memberships", "Business systems"],
    url: "https://www.superplusfitness.com",
    challenge:
      "Bring customer information, membership journeys, promotions and everyday business processes into a clearer digital experience.",
    approach:
      "Treat the website and internal tools as connected parts of the same business: simplify what customers see while making recurring work easier for the team.",
    build:
      "A business website with membership information, registration and payment functionality, promotions, staff and membership management systems, QR/check-in related systems, and ongoing internal tools.",
    result:
      "A working digital foundation for the business that supports customers, staff and continued operational development.",
    tools: [
      "Wix",
      "Canva",
      "Business systems",
      "Payment integration",
    ],
  },
  {
    slug: "jis-beauty-fashion",
    number: "02",
    name: "JIS Beauty & Fashion",
    type: "E-commerce Website",
    image: jisImage,
    summary:
      "An e-commerce experience created to present beauty and fragrance products with clarity, polish and an easy mobile shopping journey.",
    tags: [
      "E-commerce",
      "Responsive design",
      "Brand presentation",
    ],
    url: "https://jisbeautyfashion.com",
    challenge:
      "Give a beauty and fragrance business a credible digital storefront where products and brand character could be presented together.",
    approach:
      "Use a refined visual hierarchy and mobile-first product flow so browsing and purchasing feel clear rather than crowded.",
    build:
      "Product presentation, e-commerce functionality, brand-led layouts, responsive pages and a customer purchasing experience.",
    result:
      "A live, mobile-responsive e-commerce storefront designed around product discovery and purchasing, now available at jisbeautyfashion.com.",
    tools: [
      "Website design",
      "E-commerce",
      "Responsive design",
      "GitHub",
      "Vercel",
      "Supabase",
    ],
  },
];

// ARCHIVED PROJECT — retained for future use.
// This is NOT included in the homepage or active project pages.
export const archivedProjects: Project[] = [
  {
    slug: "super-plus-studios",
    number: "03",
    name: "Super Plus Studios",
    type: "Early-stage Business Concept",
    image: studiosImage,
    summary:
      "An early-stage custom device skin business concept. Initial research and brand development have been completed, but product design and production have not started. The project is currently on hold.",
    tags: [
      "Business concept",
      "Research",
      "Brand development",
    ],
    challenge:
      "Explore the requirements for establishing a custom device skin business.",
    approach:
      "Research the production process, materials, equipment and potential product categories.",
    build:
      "Initial business research and brand setup. No physical products or finished skin designs have been produced.",
    result:
      "The concept is currently on hold and may be revisited in the future.",
    tools: [
      "Research",
      "Business planning",
      "Brand development",
    ],
  },
];