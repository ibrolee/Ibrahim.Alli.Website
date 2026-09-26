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
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import appCss from "../styles.css?url";
import aboutCss from "../about-editorial.css?url";
import dayyahCss from "../dayyah-couture.css?url";
import safiyyrCss from "../safiyyr.css?url";
import sallysCss from "../sallys-apparel.css?url";
import premiumCss from "../premium.css?url";

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
      {
        rel: "stylesheet",
        href: dayyahCss,
      },
      {
        rel: "stylesheet",
        href: safiyyrCss,
      },
      {
        rel: "stylesheet",
        href: sallysCss,
      },
      { rel: "stylesheet", href: premiumCss },
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
  const isStandaloneConcept = isDayyahConcept || isSafiyyrConcept || isSallysConcept;

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
          <ScrollAnimations />
          <Outlet />
          <SiteFooter />
        </div>
      )}
    </QueryClientProvider>
  );
}
