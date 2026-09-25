import { createFileRoute } from "@tanstack/react-router";
import { SafiyyrShop } from "@/components/safiyyr";

export const Route = createFileRoute("/safiyyr/shop")({
  head: () => ({
    meta: [
      { title: "Shop — SAFIYYR Concept" },
      {
        name: "description",
        content:
          "A private e-commerce concept catalogue for SAFIYYR, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SafiyyrShop,
});
