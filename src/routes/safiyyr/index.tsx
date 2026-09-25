import { createFileRoute } from "@tanstack/react-router";
import { SafiyyrHome } from "@/components/safiyyr";

export const Route = createFileRoute("/safiyyr/")({
  head: () => ({
    meta: [
      { title: "SAFIYYR — E-commerce Concept by Ibrahim Alli" },
      {
        name: "description",
        content:
          "A private e-commerce concept preview for SAFIYYR, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SafiyyrHome,
});
