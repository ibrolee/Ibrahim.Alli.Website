/**
 * Small, editorial resource library. Publish only checked, useful guidance.
 * These are planning frameworks — not price guarantees or claimed business results.
 */
export type InsightSection = {heading:string;paragraphs:string[];bullets?:string[]};
export type Insight = {
 slug:string;
 title:string;
 kicker:string;
 description:string;
 summary:string;
 readTime:string;
 audience:string;
 sections:InsightSection[];
 checklist:string[];
 action:string;
 service:string;
};
export const insights:Insight[]=[
 {
  slug:"how-much-does-a-business-website-cost",
  title:"How much does a business website cost?",
  kicker:"Planning / Budgeting",
  description:"A practical guide to what affects business website pricing, the costs people often forget and how to request a useful quote.",
  summary:"There's no honest one-price answer. Here's how to work out what you're paying for before choosing a designer.",
  readTime:"5-minute read",
  audience:"Owners planning a new website",
  sections:[
   {heading:"Start with the job the website needs to do",paragraphs:[
    "A simple website that introduces your business, explains your services and helps customers contact you is different from an online store or a membership portal. The number of pages matters, but so do the actions those pages must support.",
    "Before asking for a price, write down your main goal: enquiries, product orders, bookings, member registrations or simply a credible place for customers to learn about your business. That goal shapes almost every design decision.",
   ]},
   {heading:"What changes the cost?",paragraphs:[
    "Most quotes reflect a mix of content, design effort, technical complexity and the work needed after launch. A custom design with unique layouts and more review rounds usually takes more time than a focused site based on an established structure.",
   ],bullets:[
    "Scope: a five-page service website and a custom customer portal are not the same project.",
    "Content: who will supply writing, photography, product descriptions and branding?",
    "Features: payments, bookings, logins and integrations add testing and operational responsibilities.",
    "Ownership: will you have control of the domain, hosting and accounts used to run the website?",
    "Support: clarify what fixes and updates are included after launch.",
   ]},
   {heading:"Don't forget the ongoing costs",paragraphs:[
    "A website may also involve a domain name, hosting, business email, payment processing, licensed tools or maintenance. Some services are paid directly to third parties. Ask for a clear distinction between the one-time design fee and recurring expenses.",
    "If your business will receive payments, confirm which provider is supported in your country and account category. A checkout screenshot is not the same as a tested, live payment setup.",
   ]},
   {heading:"How to compare two quotations fairly",paragraphs:[
    "Compare what is included, not just the final amount. A cheaper quote may omit essential pages, testing, training or content work; a more expensive quote may include features you don't actually need. Neither tells you enough on its own.",
   ],bullets:[
    "Request a written list of deliverables and excluded work.",
    "Ask how many rounds of feedback are included and how changes are priced.",
    "Confirm mobile experience, accessibility basics and contact-form testing.",
    "Clarify who owns the domain, code or content, and what happens at handover.",
    "Agree milestones and the payment schedule before starting.",
   ]},
   {heading:"Start small if that fits the business",paragraphs:[
    "You don't need every possible feature on launch day. A focused website with the right content and enquiry journey can be a strong starting point. More complex workflows can be scoped as a second phase once their real value is clearer.",
    "I quote projects after understanding what the business needs. That approach is less exciting than a universal price tag, but it helps avoid assumptions that become expensive later.",
   ]},
  ],
  checklist:[
   "Write down the single most important website goal.",
   "List essential pages separately from nice-to-have features.",
   "Gather available logos, copy, images and product information.",
   "Choose a realistic budget range and preferred timeline.",
   "Ask for a written scope, exclusions and ongoing costs.",
  ],
  action:"Discuss a website quotation",
  service:"business-websites",
 },
 {
  slug:"launching-an-online-store-checklist",
  title:"What do you need before launching an online store?",
  kicker:"E-commerce / Preparation",
  description:"An online store launch checklist covering product content, orders, payments, delivery policies and the everyday work behind checkout.",
  summary:"A beautiful storefront is only one part of an online business. Prepare the practical details before connecting a checkout.",
  readTime:"5-minute read",
  audience:"Retail, fashion, beauty and product brands",
  sections:[
   {heading:"Make your product information ready first",paragraphs:[
    "Customers should know what they're looking at, what it costs and what to expect when it arrives. Clear product names, useful photographs and accurate descriptions are more important than decorative website effects.",
    "For brands with many variations, think through how you'll organise sizes, colours, fragrance types or other options. Your categories should follow how customers actually browse, not just how you store inventory internally.",
   ],bullets:[
    "A clean list of products, categories and variants",
    "Consistent photographs, names, descriptions and prices",
    "Accurate availability and stock-handling rules",
    "Clear contact details and a recognizable brand identity",
   ]},
   {heading:"Decide how orders will be accepted",paragraphs:[
    "Not every business needs a fully automated checkout on day one. A catalogue with clear WhatsApp enquiries may be appropriate for a small, hands-on operation. A checkout with card or bank payment can make sense when the payment provider, fulfilment process and support arrangements are ready.",
    "Whichever path you choose, customers should know whether they have placed an order, requested availability, or simply started a conversation. Don't label an enquiry as a completed purchase.",
   ]},
   {heading:"Payments, delivery and returns must agree",paragraphs:[
    "Check the payment providers and methods you can legally and technically use in the regions you serve. Account verification, charges, refunds and settlement times all affect the experience you can offer.",
    "Write delivery areas, estimated handling times and return or exchange policies before launch. If you offer a free-delivery threshold, make sure the calculation in the website matches your business rule and the policy is stated clearly.",
   ]},
   {heading:"Make the mobile buying journey understandable",paragraphs:[
    "Many customers discover a product on social media before opening a website on their phones. They should find the product, see the details, understand delivery and reach checkout or an enquiry channel without hunting through the menu.",
   ],bullets:[
    "Keep product images legible and pages readable on smaller screens.",
    "Show price, variation and availability information near the purchase action.",
    "Explain the payment and delivery steps before asking for an order.",
    "Test the complete journey yourself with a real mobile device.",
   ]},
   {heading:"Plan what happens after launch",paragraphs:[
    "Who updates products, answers customers, corrects stock and resolves order problems? Agree these responsibilities before the website goes live. A simple store you can maintain reliably is better than an elaborate checkout the team cannot operate.",
    "My JIS Beauty & Fashion storefront work illustrates branded product discovery and ordering flows. It is design and development experience, not a claim of completed customer orders or measured sales growth.",
   ]},
  ],
  checklist:[
   "Prepare product photography, pricing and variation information.",
   "Confirm payment provider eligibility and receiving accounts.",
   "Write shipping, handling, return and customer-support rules.",
   "Choose WhatsApp enquiry, checkout, or a clearly staged combination.",
   "Test every important mobile ordering step before launch.",
  ],
  action:"Plan an online store",
  service:"e-commerce",
 },
 {
  slug:"website-redesign-or-improvement",
  title:"Should you redesign your website or improve what you have?",
  kicker:"Website strategy / Decisions",
  description:"A practical decision guide for improving an existing website: when to refine the current site and when a full redesign may be worth it.",
  summary:"A dated website doesn't always need rebuilding. Learn what to inspect before spending money on a replacement.",
  readTime:"4-minute read",
  audience:"Businesses with an existing website",
  sections:[
   {heading:"Start with the problem, not the redesign",paragraphs:[
    "A site can feel old because of its colour scheme, but the real problem may be a confusing menu, missing service information, hard-to-use mobile layout or a contact process that doesn't work. Those are different kinds of problems, with different fixes.",
    "Try navigating your website as a new customer. Can you understand what the business offers in a few seconds? Can you find pricing or contact information? Does the site work on the phone your customers use?",
   ]},
   {heading:"When improving the existing site can make sense",paragraphs:[
    "If your core content, infrastructure and customer journeys still work, focused improvements may offer a practical route forward. Examples include rewriting a confusing homepage, reorganising services, improving navigation or checking accessibility and mobile layouts.",
   ],bullets:[
    "The current hosting and code are maintainable.",
    "Your content and page structure are mostly suitable.",
    "The main problems are limited to a handful of screens or journeys.",
    "Existing integrations work and can remain in place safely.",
   ]},
   {heading:"When a broader rebuild may be justified",paragraphs:[
    "Sometimes a website's limitations are structural. Its technology may no longer suit the business, editing simple content may be difficult, pages may not adapt properly to phones, or new features may be hard to add without breaking others.",
    "A rebuild is not automatically safer. Before changing platforms or hosting, document critical pages, login methods, payments, customer records and domain ownership. Arrange a preview and a tested way to recover if something goes wrong.",
   ]},
   {heading:"What to ask before migrating",paragraphs:[
    "A domain name, website files, email service and database may be managed in completely different places. Moving one does not necessarily move the others. Know which provider controls each part and who has access before making DNS or hosting changes.",
   ],bullets:[
    "Which pages and URLs must remain accessible?",
    "Will existing search links redirect correctly?",
    "How will contact forms, logins and payments be tested?",
    "Who controls DNS, hosting and business email?",
    "What is the rollback plan if the new version fails?",
   ]},
   {heading:"Choose the smallest safe change that solves the issue",paragraphs:[
    "A careful audit can identify which problems are urgent and which are purely aesthetic. The best outcome is not necessarily the newest technology; it's a site your customers can use and your business can maintain.",
    "If you're unsure, start by describing what currently frustrates visitors or your team. A public-facing website review is a reasonable first step before committing to a larger project.",
   ]},
  ],
  checklist:[
   "Test your website on your own phone as a new visitor.",
   "List broken features separately from visual preferences.",
   "Identify domain, email, hosting and content ownership.",
   "Document critical customer and staff workflows.",
   "Get a written improvement or migration scope before making changes.",
  ],
  action:"Talk through website improvements",
  service:"website-redesign",
 },
];
export function getInsight(slug:string):Insight|undefined{
 return insights.find(article=>article.slug===slug);
}
