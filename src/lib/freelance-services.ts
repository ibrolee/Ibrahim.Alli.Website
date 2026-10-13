export type ServiceSlug =
  | "business-websites"
  | "e-commerce"
  | "mobile-apps"
  | "business-systems"
  | "website-redesign";

export type ServiceDetail = {
  slug: ServiceSlug;
  number: string;
  name: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  suitedFor: string;
  deliverables: string[];
  considerations: string[];
  exampleSlug?: string;
  exampleName?: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "business-websites",
    number: "01",
    name: "Business websites",
    eyebrow: "Make a strong first impression",
    tagline: "Make your business easy to find, understand and contact.",
    intro: "An intentional website gives people a clear view of what you offer and an easy next step. I focus on hierarchy, credibility and a mobile experience that works in everyday use.",
    suitedFor: "Local businesses, growing brands, professionals and service providers",
    deliverables: [
      "Discovery, page structure and content priorities",
      "Responsive website design and implementation",
      "Service presentation, contact or enquiry journey",
      "Basic search metadata and launch checks",
      "Handover and agreed post-launch support",
    ],
    considerations: [
      "Whether your copy, logo and images are ready",
      "Any forms, booking links or external services you need",
      "Who will update the website after launch",
    ],
    exampleSlug: "super-plus-fitness",
    exampleName: "Super Plus Fitness & Spa",
  },
  {
    slug: "e-commerce",
    number: "02",
    name: "E-commerce stores",
    eyebrow: "Designed for easier shopping",
    tagline: "Turn your products into a store customers can navigate confidently.",
    intro: "A shop should feel like your brand, while making categories, product details, delivery information and checkout easy to follow — especially on a phone.",
    suitedFor: "Retailers, beauty brands and product-focused businesses",
    deliverables: [
      "Branded storefront and product/category pages",
      "Mobile product browsing and navigation",
      "Cart and checkout flow where supported by the chosen platform",
      "Clear shipping, payment and customer information",
      "Testing and guidance for managing your catalogue",
    ],
    considerations: [
      "Product photos, descriptions and inventory readiness",
      "Your fulfilment, delivery and returns rules",
      "Payment provider eligibility, fees and integrations",
    ],
    exampleSlug: "jis-beauty-fashion",
    exampleName: "JIS Beauty & Fashion",
  },
  {
    slug: "mobile-apps",
    number: "03",
    name: "Mobile apps",
    eyebrow: "A product your audience can keep",
    tagline: "Build a mobile experience around a real customer need.",
    intro: "From a companion to your website to a more tailored customer experience, I can help shape and build an app with a practical feature set instead of unnecessary complexity.",
    suitedFor: "Businesses with returning customers, member services or a useful app idea",
    deliverables: [
      "Feature discovery and a realistic first-version plan",
      "Mobile interface design for the agreed platforms",
      "Implementation of the agreed app functionality",
      "Device testing and preparation for review",
      "Guidance with supported distribution or app-store submission steps",
    ],
    considerations: [
      "iOS, Android or both, and any app-store requirements",
      "Accounts, notifications and data-security needs",
      "Ongoing hosting, updates and maintenance",
    ],
    exampleSlug: "super-plus-fitness",
    exampleName: "Super Plus Fitness & Spa",
  },
  {
    slug: "business-systems",
    number: "04",
    name: "Business systems",
    eyebrow: "Better tools behind the scenes",
    tagline: "Make repeat tasks simpler for the people doing the work.",
    intro: "A useful internal system starts with understanding your everyday operations. I work with processes such as memberships, attendance and staff workflows to turn them into clearer digital tools.",
    suitedFor: "Teams handling manual records, repeated admin tasks or member accounts",
    deliverables: [
      "Workflow discovery and a written feature scope",
      "Relevant dashboards, forms and team-facing screens",
      "Role-based access and data handling requirements",
      "Testing around real operational scenarios",
      "Handover notes and support scope",
    ],
    considerations: [
      "Who should access or edit each type of information",
      "Security, backups and data-retention responsibilities",
      "Integrations, ongoing infrastructure and future upgrades",
    ],
    exampleSlug: "super-plus-fitness",
    exampleName: "Super Plus Fitness & Spa",
  },
  {
    slug: "website-redesign",
    number: "05",
    name: "Website improvements",
    eyebrow: "Keep what works. Improve what doesn't.",
    tagline: "Give an existing website more clarity, polish and purpose.",
    intro: "Sometimes a site doesn't need to start from scratch. I can review the experience, identify friction and improve the pages, performance or visual direction that matter most.",
    suitedFor: "Businesses with a live website that feels dated, confusing or difficult on mobile",
    deliverables: [
      "Review of the existing pages and key customer journeys",
      "Prioritised recommendations and design direction",
      "Agreed page redesigns or content restructuring",
      "Responsive, accessibility and basic performance improvements",
      "Testing before replacing the existing version",
    ],
    considerations: [
      "Your current hosting and access to source code",
      "Which content, functionality and integrations must remain",
      "How to deploy safely and preserve the live site",
    ],
  },
];

export const projectProcess = [
  {
    number: "01",
    title: "Discover",
    description: "You explain your business, your audience and what the website needs to achieve. I ask the right questions.",
  },
  {
    number: "02",
    title: "Scope & propose",
    description: "I recommend a sensible feature list, timeline and quote. We agree what's included before building.",
  },
  {
    number: "03",
    title: "Design & build",
    description: "I create the experience around the agreed brief, with mobile layouts and the details that make it useful.",
  },
  {
    number: "04",
    title: "Review together",
    description: "You see the work, give feedback within our agreed revision rounds and check important user journeys.",
  },
  {
    number: "05",
    title: "Launch & hand over",
    description: "We complete the final checks and launch. Ownership, access and ongoing support are clarified.",
  },
];

export const projectFaqs = [
  {
    question: "How much does a website cost?",
    answer: "It depends on the number of pages, design complexity, content and any integrations. I prepare a project-specific quote after understanding your needs, rather than advertising a price that might not fit.",
  },
  {
    question: "Can you work with clients outside Nigeria?",
    answer: "Yes. I work online and can discuss projects remotely. Scheduling, payment options and delivery arrangements are confirmed in the proposal.",
  },
  {
    question: "Do I need to have a logo and website content already?",
    answer: "Not necessarily. Tell me what you have. We can plan around existing assets, and any additional branding, writing or photography work will be quoted separately if needed.",
  },
  {
    question: "Will my website work well on phones?",
    answer: "Responsive layouts are part of the agreed website scope. I also review important mobile journeys during testing; specific devices and requirements are confirmed at the start.",
  },
  {
    question: "Do you handle hosting, domains and ongoing updates?",
    answer: "I can help you understand hosting and launch options, as well as ongoing maintenance. Third-party subscriptions, support responsibilities and ownership are outlined separately in your quote.",
  },
  {
    question: "Can you redesign my current site without losing its features?",
    answer: "That is often possible. I first review the existing setup and identify what must stay. A redesign plan should document any technical limitations and include a safe preview before publishing.",
  },
  {
    question: "How long will my project take?",
    answer: "That depends on scope, content readiness, integrations and review times. I'll propose a realistic timeline once the requirements are clear.",
  },
  {
    question: "Can we start with a small version and expand later?",
    answer: "Absolutely. A focused first release often makes more sense than building every possible feature at once. We can agree on the essentials and plan future additions separately.",
  },
];
