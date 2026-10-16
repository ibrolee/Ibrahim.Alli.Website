import { ProjectScreenGallery } from "@/components/project-screen-gallery";

const screens = [
  {
    id: "home",
    label: "Storefront",
    title: "A fragrance brand with its own atmosphere.",
    description:
      "A soft palette, expressive typography and product photography introduce JIS, with direct routes into its fragrance collections.",
    image: "home",
    url: "https://www.jisbeautyfashion.com/",
    note: "Current storefront capture",
  },
  {
    id: "shop",
    label: "Catalogue",
    title: "Explore the range. Refine the choice.",
    description:
      "Product cards, category and brand filters, price controls and sorting help shoppers narrow down the catalogue.",
    image: "shop",
    url: "https://www.jisbeautyfashion.com/shop",
    note: "Current catalogue · Product filters and sorting",
  },
  {
    id: "product",
    label: "Product details",
    title: "Choose the scent before adding it to the bag.",
    description:
      "Product photography, scent options, prices, stock availability and quantity controls come together on the product page.",
    image: "product",
    url: "https://www.jisbeautyfashion.com/product/genies-collection-parfums",
    note: "Current product page · Genie's Collection scent options",
  },
  {
    id: "bag",
    label: "Shopping bag",
    title: "Review the selection in one place.",
    description:
      "The bag brings together the chosen product, scent, quantity, discount code and order summary before checkout.",
    image: "bag",
    url: "https://www.jisbeautyfashion.com/cart",
    note: "Demonstration bag with one sample item · Visitors' bags start separately",
  },
  {
    id: "checkout",
    label: "Checkout",
    title: "A considered final step.",
    description:
      "Guest checkout brings contact and delivery details alongside the order summary, with payment choices and manual transfer verification in the wider order flow.",
    image: "checkout",
    url: "https://www.jisbeautyfashion.com/shop",
    note: "Checkout capture with a sample item · No customer details entered or order submitted",
  },
] as const;

export function JisScreenGallery() {
  return (
    <ProjectScreenGallery
      screens={screens}
      brand="JIS"
      domain="jisbeautyfashion.com"
      imagePrefix="jis"
      id="jis-gallery"
      introduction="Follow the shopping journey from the storefront and catalogue to product options, the bag and checkout. Select a view to explore."
      className="jis-screen-gallery"
    />
  );
}
