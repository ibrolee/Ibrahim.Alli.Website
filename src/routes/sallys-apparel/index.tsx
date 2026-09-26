import { createFileRoute } from "@tanstack/react-router";
import { SallysHome } from "@/components/sallys-apparel";

export const Route = createFileRoute("/sallys-apparel/")({
  head: () => ({
    meta: [
      { title: "Sally's Apparel — E-commerce Concept by Ibrahim Alli" },
      {
        name: "description",
        content:
          "A private premium e-commerce concept preview for Sally's Apparel, designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SallysHome,
});
