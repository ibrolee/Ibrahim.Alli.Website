import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import appCss from "../styles.css?url";
import aboutCss from "../about-editorial.css?url";
import premiumCss from "../premium.css?url";
import photographyCss from "../photography.css?url";
import redWaveCss from "../red-wave.css?url";
import autoDarkCss from "../auto-dark.css?url";
import freelanceStage1Css from "../freelance-stage1.css?url";
import portfolioStage2Css from "../portfolio-stage2.css?url";
import compactHomeCss from "../compact-home.css?url";
import technicalStage3Css from "../technical-stage3.css?url";
import businessStage4aCss from "../business-stage4a.css?url";
import businessStage4bCss from "../business-stage4b.css?url";

/** Accurate portfolio identity metadata; no fake ratings, addresses or client results. */
const portfolioSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ibrahimalli.com/#person",
      name: "Ibrahim Alli",
      url: "https://ibrahimalli.com/",
      jobTitle: "Independent Web Designer and Developer",
      description: "Designs and develops business websites, online stores and practical digital systems.",
      sameAs: [
        "https://www.instagram.com/ibroleee_/",
        "https://www.pexels.com/@ibrolee/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ibrahimalli.com/#website",
      name: "Ibrahim Alli — Portfolio",
      url: "https://ibrahimalli.com/",
      inLanguage: "en",
      publisher: { "@id": "https://ibrahimalli.com/#person" },
    },
  ],
};


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/** Adds subtle reveal animations to short, non-interactive site elements. */
function ScrollAnimations() {
  const router = useRouter();
  const location = router.state.location;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // The expandable story can grow much taller than the viewport. Observing
    // its entire container with an intersection threshold can leave it
    // permanently transparent after opening, so it must never be animated.
    document.querySelectorAll<HTMLElement>(".personal-story-trigger").forEach((element) => {
      element.classList.remove("scroll-reveal", "scroll-reveal-visible");
      element.style.removeProperty("--reveal-delay");
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const selectors = [
      ".p-reveal",
      ".section-heading-row",
      ".project-card",
      ".build-inner > div",
      ".service-card",
      ".contact-copy",
      ".contact-actions",
      ".about-hero-grid > div",
      ".personal-list > div:not(.personal-story-trigger)",
      ".about-prose",
      ".education-card",
      ".experience-card",
      ".skill-group",
      ".interest-grid-about > div",
      ".hobby-note",
      ".about-cta .section-inner",
      ".project-detail section",
      ".case-study section",
    ].join(", ");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.add("scroll-reveal-visible");
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    elements.forEach((element, index) => {
      if (element.classList.contains("scroll-reveal-visible")) return;

      // Do not hide content already visible when the page loads.
      const bounds = element.getBoundingClientRect();
      const initiallyVisible = bounds.top < window.innerHeight && bounds.bottom > 0;

      if (initiallyVisible) return;

      element.classList.add("scroll-reveal");

      // Small stagger for neighbouring cards, without excessive delays.
      element.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);

      observer.observe(element);
    });

    return () => {
      observer.disconnect();

      // Prevent elements from remaining invisible during navigation.
      elements.forEach((element) => {
        element.classList.remove("scroll-reveal");
        element.classList.remove("scroll-reveal-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [location.pathname]);

  return null;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { name: "author", content: "Ibrahim Alli" },
      { name: "theme-color", content: "#f4f5f9", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#171717", media: "(prefers-color-scheme: dark)" },
      { property: "og:site_name", content: "Ibrahim Alli" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: aboutCss,
      },
      { rel: "stylesheet", href: premiumCss },
      { rel: "stylesheet", href: photographyCss },
      { rel: "stylesheet", href: redWaveCss },
      { rel: "stylesheet", href: autoDarkCss },
      { rel: "stylesheet", href: freelanceStage1Css },
      { rel: "stylesheet", href: portfolioStage2Css },
      { rel: "stylesheet", href: compactHomeCss },
      { rel: "stylesheet", href: technicalStage3Css },
      { rel: "stylesheet", href: businessStage4aCss },
      { rel: "stylesheet", href: businessStage4bCss },
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isDayyahConcept = pathname.startsWith("/dayyah-couture");
  const isSafiyyrConcept = pathname.startsWith("/safiyyr");
  const isSallysConcept = pathname.startsWith("/sallys-apparel");
  const isSuperPlusStudios = pathname.startsWith("/super-plus-studios");
  const isStandaloneConcept =
    pathname === "/mims" || pathname.startsWith("/mims/") ||
    isDayyahConcept ||
    isSafiyyrConcept ||
    isSallysConcept ||
    isSuperPlusStudios;

  return (
    <QueryClientProvider client={queryClient}>
      {isStandaloneConcept ? (
        <Outlet />
      ) : (
        <div className="portfolio-shell">
          <a className="p-skip" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          {pathname === "/" && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c"),
              }}
            />
          )}
          <ScrollAnimations />
          <Outlet />
          <SiteFooter />
        </div>
      )}
    </QueryClientProvider>
  );
}
