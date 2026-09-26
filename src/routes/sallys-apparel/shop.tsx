import { createFileRoute } from "@tanstack/react-router";
import { SallysShop } from "@/components/sallys-apparel";

export const Route = createFileRoute("/sallys-apparel/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Sally's Apparel Concept" },
      {
        name: "description",
        content:
          "A private e-commerce concept catalogue for Sally's Apparel, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SallysShop,
});
