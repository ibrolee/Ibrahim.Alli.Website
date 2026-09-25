import { createFileRoute } from "@tanstack/react-router";
import { SafiyyrProduct } from "@/components/safiyyr";

export const Route = createFileRoute("/safiyyr/product/$slug")({
  head: () => ({
    meta: [
      { title: "Product — SAFIYYR Concept" },
      {
        name: "description",
        content:
          "A private SAFIYYR product-page concept designed by Ibrahim Alli.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SafiyyrProductRoute,
});

function SafiyyrProductRoute() {
  const { slug } = Route.useParams();
  return <SafiyyrProduct slug={slug} />;
}
