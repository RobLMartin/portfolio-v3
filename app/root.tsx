import { json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import Sidebar from "~/components/sidebar";
import MobileNav from "./components/mobile.nav";
// import { lazy, Suspense } from "react";

// const VisualEditing = lazy(() => import("~/components/visual.editing"));

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = () => {
  return json({
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      // SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  });
};

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="text-neutral-950">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex">
        <div className="lg:w-1/4 hidden lg:block h-screen">
          <Sidebar />
        </div>
        <MobileNav />
        <div className="w-full lg:w-3/4 h-screen">
          <Outlet />
        </div>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {/* {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
          <Suspense>
            <VisualEditing />
          </Suspense>
        ) : null} */}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
