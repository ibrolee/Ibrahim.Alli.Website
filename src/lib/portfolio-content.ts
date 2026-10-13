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
  deliverables: string[];
  evidenceNote: string;
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
      "A live fitness website supported by digital membership, payment, QR attendance and team-management workflows for a Lagos gym.",
    tags: ["Website", "Memberships", "Business systems"],
    url: "https://www.superplusfitness.com",
    challenge:
      "Move beyond a simple brochure site so members can explore plans and the team can manage registrations, payments and check-ins with less disconnected manual work.",
    approach:
      "Connect public service and pricing information with the actual operating flow used by reception, coaches and management, while keeping the customer journey mobile-friendly.",
    build:
      "Public service and plan pages, registration and payment flows, member and staff portals, reception QR check-in, personal-training management and operational reporting.",
    result:
      "A functioning live customer website and connected operational tools. Features are still maintained and refined as the gym's processes evolve; no conversion uplift is claimed.",
    tools: [
      "React",
      "TanStack",
      "Vercel",
      "Supabase",
      "Payment integration",
    ],
    deliverables: [
      "Responsive public website with membership information",
      "Digital membership registration and payments",
      "QR check-in and member account experience",
      "Reception, coach and staff operating tools",
    ],
    evidenceNote: "Live website and functional workflows. No unverified revenue or conversion statistics.",
  },
  {
    slug: "jis-beauty-fashion",
    number: "02",
    name: "JIS Beauty & Fashion",
    type: "E-commerce Website",
    image: jisImage,
    summary:
      "A brand-led online store for beauty and fragrance shoppers, with mobile product browsing and a clear path from discovery to checkout.",
    tags: [
      "E-commerce",
      "Responsive design",
      "Brand presentation",
    ],
    url: "https://jisbeautyfashion.com",
    challenge:
      "Make the JIS brand and product range easy to understand and shop on mobile, without losing the personality of the beauty and fragrance business.",
    approach:
      "Give fragrance categories room to breathe, guide visitors through products and make important shopping information visible before checkout.",
    build:
      "A responsive storefront with product categories, product detail pages, cart/checkout experience, brand presentation and supporting editorial content.",
    result:
      "A live storefront where customers can explore products and follow a shopping flow. Sales growth and checkout conversion are not represented as measured outcomes.",
    tools: [
      "Website design",
      "E-commerce",
      "Responsive design",
      "GitHub",
      "Vercel",
      "Supabase",
    ],
    deliverables: [
      "Mobile-first store layout and product discovery",
      "Fragrance categories and product presentation",
      "Shopping-cart and checkout experience",
      "Brand content and editorial section",
    ],
    evidenceNote: "Live business website. Results describe shipped functionality, not invented business metrics.",
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
    deliverables: ["Early business research and branding direction"],
    evidenceNote: "Archived concept; no shipped physical products.",
  },
];