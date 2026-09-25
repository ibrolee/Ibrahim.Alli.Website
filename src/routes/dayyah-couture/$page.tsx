import { createFileRoute } from "@tanstack/react-router";
import { DayyahSubpage } from "@/components/dayyah-couture";

const titles: Record<string, string> = {
  collections: "Collections",
  bridal: "Bridal",
  bespoke: "Bespoke",
  gallery: "Gallery",
  about: "About",
  process: "How It Works",
  "start-order": "Start Your Order",
  contact: "Contact",
};

export const Route = createFileRoute("/dayyah-couture/$page")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${titles[params.page] ?? "Dayyah Couture"} — Dayyah Couture Concept`,
      },
      {
        name: "description",
        content:
          "A private concept website preview for Dayyah Couture, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DayyahPage,
});

function DayyahPage() {
  const { page } = Route.useParams();
  return <DayyahSubpage page={page} />;
}
