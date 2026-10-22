import { ProjectScreenGallery } from "@/components/project-screen-gallery";

const screens = [
  {
    id: "home",
    label: "Website",
    title: "A first impression with a clear next step.",
    description:
      "Training, spa and recovery brought together, with direct routes to membership and registration.",
    image: "home",
    url: "https://www.superplusfitness.com/",
    note: "Live website capture",
  },
  {
    id: "membership",
    label: "Memberships",
    title: "Find the right plan. Understand the price.",
    description:
      "Filterable plans, clear registration fees and a route from choosing a membership to joining the gym.",
    image: "membership",
    url: "https://www.superplusfitness.com/membership",
    note: "Live membership page · Gym category",
  },
  {
    id: "spa",
    label: "Spa & booking",
    title: "Recovery has its own customer journey.",
    description:
      "A dedicated service catalogue connects spa and recovery options with booking and payment.",
    image: "spa",
    url: "https://www.superplusfitness.com/spa-recovery",
    note: "Live spa and recovery page",
  },
  {
    id: "portals",
    label: "Team portals",
    title: "A workspace for each part of the team.",
    description:
      "Separate entry points for staff, reception and management. Behind them are attendance, registration, QR check-in, payroll and reporting tools.",
    image: "portals",
    url: "https://www.superplusfitness.com/portal",
    note: "Public portal chooser · Account dashboards require sign-in",
  },
  {
    id: "app",
    label: "Member app",
    title: "The member experience continues on the phone.",
    description:
      "The SP Fitness iPhone app brings together a digital membership card, visit tracking, SP Points, weekly spin, badges, rewards and challenges. Open the official App Store listing to install it.",
    image: "app-page",
    url: "https://apps.apple.com/ng/app/sp-fitness/id6820107696",
    note: "Official SP Fitness iOS app · Available on the Apple App Store",
  },
] as const;

export function SuperplusScreenGallery() {
  return (
    <ProjectScreenGallery
      screens={screens}
      brand="Super Plus"
      domain="superplusfitness.com"
      imagePrefix="spf"
      id="spf-gallery"
      introduction="Explore the public website, membership journey, team access and SP Fitness member app. Select a view to take a closer look; the app link opens the official App Store listing."
    />
  );
}
