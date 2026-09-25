import { createFileRoute } from "@tanstack/react-router";
import { DayyahHome } from "@/components/dayyah-couture";

export const Route = createFileRoute("/dayyah-couture/")({
  head: () => ({
    meta: [
      { title: "Dayyah Couture — Concept by Ibrahim Alli" },
      {
        name: "description",
        content:
          "A private concept website preview for Dayyah Couture, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DayyahHome,
});
