---
name: TanStack Start Migration
overview: Migrate from TanStack Router SPA to TanStack Start for SSR on public pages, following the current TanStack Start documentation and the blog post guide exactly.
todos:
  - id: clean-deps
    content: Uninstall all TanStack/Vite packages (router, vite, plugin-react, helmet), delete node_modules and lock
    status: completed
  - id: install-start
    content: Fresh install all deps including @tanstack/react-start, react-router, vite, vite-tsconfig-paths
    status: completed
    dependencies:
      - clean-deps
  - id: update-scripts
    content: Update package.json scripts to use vite dev/build
    status: in_progress
    dependencies:
      - install-start
  - id: update-vite-config
    content: Replace TanStackRouterVite with tanstackStart in vite.config.ts
    status: in_progress
    dependencies:
      - install-start
  - id: update-router
    content: Update router.tsx to export getRouter() factory function
    status: in_progress
    dependencies:
      - install-start
  - id: update-root-route
    content: Update __root.tsx with HTML document structure and head()
    status: completed
    dependencies:
      - update-router
  - id: update-app-route
    content: "Update _app.tsx with ssr: false and Convex providers"
    status: completed
    dependencies:
      - update-root-route
  - id: delete-obsolete
    content: Delete index.html, main.tsx, and app.tsx
    status: completed
    dependencies:
      - update-root-route
      - update-app-route
  - id: verify
    content: Run dev server and verify SSR in View Page Source
    status: completed
    dependencies:
      - delete-obsolete
---

# TanStack Start Migration Plan

## Overview

Migrate from a Vite SPA with TanStack Router to TanStack Start for SSR. Public routes (`/`, `/blog/*`) get SSR for SEO. Authenticated routes (`/_app/*`) stay client-only via `ssr: false`.

## Step 1: Clean Dependencies (Full Clean Slate)

Uninstall ALL TanStack Router and Vite-related packages to avoid peer dependency conflicts:

```bash
# Uninstall all related packages
npm uninstall @tanstack/react-router @tanstack/router-plugin @tanstack/router-devtools vite @vitejs/plugin-react react-helmet-async

# Delete node_modules and lock file for clean slate
rm -rf node_modules package-lock.json
```

Packages being removed:

- `@tanstack/react-router` - will reinstall with compatible version
- `@tanstack/router-plugin` - replaced by `tanstackStart()` in `@tanstack/react-start`
- `@tanstack/router-devtools` - will reinstall with compatible version
- `vite` - will reinstall with compatible version
- `@vitejs/plugin-react` - will reinstall with compatible version
- `react-helmet-async` - replaced by TanStack Start's `head()` function

## Step 2: Fresh Install All Dependencies

```bash
# Install TanStack Start (includes react-router as peer dep)
npm install @tanstack/react-start @tanstack/react-router

# Install Vite and plugins
npm install -D vite @vitejs/plugin-react vite-tsconfig-paths @tanstack/router-devtools

# Install all remaining deps
npm install
```

This ensures all TanStack packages are at compatible versions with no peer conflicts.

## Step 3: Update package.json Scripts

Change from parallel Vite + Convex to:

```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:frontend dev:backend",
    "dev:frontend": "vite dev",
    "dev:backend": "convex dev",
    "build": "vite build",
    "start": "vite preview"
  }
}
```



## Step 4: Update vite.config.ts

Replace `TanStackRouterVite()` with `tanstackStart()`:

```ts
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    viteReact(),  // Must come AFTER tanstackStart()
  ],
  resolve: {
    alias: {
      "~": __dirname,
      "@": path.resolve(__dirname, "./src"),
      "@cvx": path.resolve(__dirname, "./convex"),
    },
  },
});
```



## Step 5: Update src/router.tsx

Export a factory function instead of singleton (per docs):

```ts
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```



## Step 6: Update src/routes/__root.tsx

Add HTML document structure with `head()` function:

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "@/index.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DebateClub - Win Every Argument" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" },
    ],
    scripts: [
      // Theme script to avoid FOUC
      {
        children: `if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
          document.documentElement.classList.add("dark");
          document.documentElement.style.colorScheme = "dark";
        }`,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
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
```



## Step 7: Update src/routes/_app.tsx

Add `ssr: false` and move Convex providers here:

```tsx
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

export const Route = createFileRoute("/_app")({
  ssr: false,  // Disable SSR for all authenticated routes
  component: AppLayout,
  beforeLoad: async () => {
    await queryClient.ensureQueryData(
      convexQuery(api.app.getCurrentUser, {}),
    );
  },
});

function AppLayout() {
  return (
    <ConvexAuthProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ConvexAuthProvider>
  );
}
```



## Step 8: Delete Obsolete Files

- `index.html` - document now in `__root.tsx`
- `src/main.tsx` - TanStack Start handles entry
- `src/app.tsx` - providers moved to `_app.tsx`

## Step 9: Update Public Routes (Optional SEO)

Add `head()` to public routes for SEO meta tags:

```tsx
// src/routes/index.tsx
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DebateClub - Win Every Argument" },
      { name: "description", content: "Practice debate with AI opponents..." },
    ],
  }),
  component: LandingPage,
});
```



## File Changes Summary

| File | Action ||------|--------|| [package.json](package.json) | Remove deps, add `@tanstack/react-start`, update scripts || [vite.config.ts](vite.config.ts) | Replace `TanStackRouterVite` with `tanstackStart` || [src/router.tsx](src/router.tsx) | Export `getRouter()` factory function || [src/routes/__root.tsx](src/routes/__root.tsx) | Add HTML document, `head()`, remove Helmet || [src/routes/_app.tsx](src/routes/_app.tsx) | Add `ssr: false`, add Convex providers || `index.html` | Delete || `src/main.tsx` | Delete || `src/app.tsx` | Delete |

## Verification

After migration:

1. Run `npm run dev` 
2. Visit `http://localhost:5173/`