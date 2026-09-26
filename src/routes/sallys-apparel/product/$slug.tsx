import { createFileRoute } from "@tanstack/react-router";
import { SallysProduct } from "@/components/sallys-apparel";

export const Route = createFileRoute("/sallys-apparel/product/$slug")({
  head: () => ({
    meta: [
      { title: "Product — Sally's Apparel Concept" },
      {
        name: "description",
        content:
          "A private Sally's Apparel product-page concept designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SallysProductRoute,
});

function SallysProductRoute() {
  const { slug } = Route.useParams();
  return <SallysProduct slug={slug} />;
}
