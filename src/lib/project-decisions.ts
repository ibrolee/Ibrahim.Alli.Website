/**
 * Focused design decisions from two verifiable family-business website projects.
 * Do not add fabricated testimonials, impact statistics or external commissions.
 */
export const projectDecisions={
 "super-plus-fitness":{
  label:"Live business website · Ongoing improvements",
  scope:"A family-operated Lagos gym I help manage, with a real public website and member/staff systems.",
  steps:[
   {
    question:"How should prospective members choose a plan?",
    decision:"Bring service descriptions, memberships, pricing and registration steps into a connected customer journey.",
    reason:"Visitors should have a clear next step instead of relying on scattered information.",
   },
   {
    question:"What happens after registration?",
    decision:"Support recurring visits with member identity, QR check-in and reception-facing workflows.",
    reason:"A useful business website should account for the work that follows the first enquiry.",
   },
   {
    question:"How can the team work with the system?",
    decision:"Design separate staff and operational experiences rather than trying to fit every role into a single screen.",
    reason:"Reception, coaching and administration have different tasks and access needs.",
   },
  ],
  boundaries:"This work is ongoing and evolving. The website and flows can be inspected, but no financial return, conversion rate or customer growth percentage is claimed.",
  service:"business-systems",
  linkText:"Discuss a business system",
 },
 "jis-beauty-fashion":{
  label:"Developed storefront · Pre-launch brand",
  scope:"A real family-owned fragrance and fashion business website being prepared for use, not an operating online sales channel yet.",
  steps:[
   {
    question:"What should a customer notice first?",
    decision:"Give JIS its own recognisable visual direction, with fragrance and beauty categories as the focus.",
    reason:"The layout needs to communicate the brand before asking visitors to buy.",
   },
   {
    question:"How should products be explored on phones?",
    decision:"Plan mobile-friendly product discovery, category navigation and clear individual product pages.",
    reason:"A customer arriving from social media should understand the range without struggling through the interface.",
   },
   {
    question:"How do we prepare for orders responsibly?",
    decision:"Design the shopping flow while separating implemented website functionality from commercial launch readiness.",
    reason:"A working store interface is not proof that stock, fulfilment or live payments are operational.",
   },
  ],
  boundaries:"The digital storefront has been developed, but the business is not yet using it for customer sales. No orders, revenue figures or conversion outcomes are represented.",
  service:"e-commerce",
  linkText:"Discuss a storefront",
 },
} as const;
