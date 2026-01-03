---
id: quick-start
title: Quick Start
---

## Impatient?

The fastest way to get a Start project up and running is with the cli. Just run

```
pnpm create @tanstack/start@latest
```

or

```
npm create @tanstack/start@latest
```

depending on your package manager of choice. You'll be prompted to add things like Tailwind, eslint, and a ton of other options.

You can also clone and run the [Basic](https://github.com/TanStack/router/tree/main/examples/react/start-basic) example right away with the following commands:

```bash
npx gitpick TanStack/router/tree/main/examples/react/start-basic start-basic
cd start-basic
npm install
npm run dev
```

If you'd like to use a different example, you can replace `start-basic` above with the slug of the example you'd like to use from the list below.

Once you've cloned the example you want, head back to the [Routing](./guide/routing) guide to learn how to use TanStack Start!

## Examples

TanStack Start has load of examples to get you started. Pick one of the examples below to get started!

- [Basic](https://github.com/TanStack/router/tree/main/examples/react/start-basic) (start-basic)
- [Basic + Auth](https://github.com/TanStack/router/tree/main/examples/react/start-basic-auth) (start-basic-auth)
- [Counter](https://github.com/TanStack/router/tree/main/examples/react/start-counter) (start-counter)
- [Basic + React Query](https://github.com/TanStack/router/tree/main/examples/react/start-basic-react-query) (start-basic-react-query)
- [Clerk Auth](https://github.com/TanStack/router/tree/main/examples/react/start-clerk-basic) (start-clerk-basic)
- [Convex + Trellaux](https://github.com/TanStack/router/tree/main/examples/react/start-convex-trellaux) (start-convex-trellaux)
- [Supabase](https://github.com/TanStack/router/tree/main/examples/react/start-supabase-basic) (start-supabase-basic)
- [Trellaux](https://github.com/TanStack/router/tree/main/examples/react/start-trellaux) (start-trellaux)
- [WorkOS](https://github.com/TanStack/router/tree/main/examples/react/start-workos) (start-workos)
- [Material UI](https://github.com/TanStack/router/tree/main/examples/react/start-material-ui) (start-material-ui)

### Stackblitz

Each example above has an embedded stackblitz preview to find the one that feels like a good starting point

### Quick Deploy

To quickly deploy an example, click the **Deploy to Netlify** button on an example's page to both clone and deploy the example to Netlify.

### Manual Deploy

To manually clone and deploy the example to anywhere else you'd like, use the following commands replacing `EXAMPLE_SLUG` with the slug of the example you'd like to use from above:

```bash
npx gitpick TanStack/router/tree/main/examples/react/EXAMPLE_SLUG my-new-project
cd my-new-project
npm install
npm run dev
```

Once you've clone or deployed an example, head back to the [Routing](./guide/routing) guide to learn how to use TanStack Start!

## Other Router Examples

While not Start-specific examples, these may help you understand more about how TanStack Router works:

- [Quickstart (file-based)](https://github.com/TanStack/router/tree/main/examples/react/quickstart-file-based)
- [Basic (file-based)](https://github.com/TanStack/router/tree/main/examples/react/basic-file-based)
- [Kitchen Sink (file-based)](https://github.com/TanStack/router/tree/main/examples/react/kitchen-sink-file-based)
- [Kitchen Sink + React Query (file-based)](https://github.com/TanStack/router/tree/main/examples/react/kitchen-sink-react-query-file-based)
- [Location Masking](https://github.com/TanStack/router/tree/main/examples/react/location-masking)
- [Authenticated Routes](https://github.com/TanStack/router/tree/main/examples/react/authenticated-routes)
- [Scroll Restoration](https://github.com/TanStack/router/tree/main/examples/react/scroll-restoration)
- [Deferred Data](https://github.com/TanStack/router/tree/main/examples/react/deferred-data)
- [Navigation Blocking](https://github.com/TanStack/router/tree/main/examples/react/navigation-blocking)
- [View Transitions](https://github.com/TanStack/router/tree/main/examples/react/view-transitions)
- [With tRPC](https://github.com/TanStack/router/tree/main/examples/react/with-trpc)
- [With tRPC + React Query](https://github.com/TanStack/router/tree/main/examples/react/with-trpc-react-query)

---
id: build-from-scratch
title: Build a Project from Scratch
---

> [!NOTE]
> If you chose to quick start with an example or cloned project, you can skip this guide and move on to the [Routing](./guide/routing) guide.

_So you want to build a TanStack Start project from scratch?_

This guide will help you build a **very** basic TanStack Start web application. Together, we will use TanStack Start to:

- Serve an index page
- Display a counter
- Increment the counter on the server and client

[Here is what that will look like](https://stackblitz.com/github/tanstack/router/tree/main/examples/react/start-counter)

Let's create a new project directory and initialize it.

```shell
mkdir myApp
cd myApp
npm init -y
```

> [!NOTE]
> We use `npm` in all of these examples, but you can use your package manager of choice instead.

## TypeScript Configuration

We highly recommend using TypeScript with TanStack Start. Create a `tsconfig.json` file with at least the following settings:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ES2022",
    "skipLibCheck": true,
    "strictNullChecks": true
  }
}
```

> [!NOTE]
> Enabling `verbatimModuleSyntax` can result in server bundles leaking into client bundles. It is recommended to keep this option disabled.

## Install Dependencies

TanStack Start is powered by [Vite](https://vite.dev/) and [TanStack Router](https://tanstack.com/router) and requires them as dependencies.

To install them, run:

```shell
npm i @tanstack/react-start @tanstack/react-router
```

We also need vite as a devDependency:

```shell
npm i -D vite
```

You'll also need React:

```shell
npm i react react-dom
```

As well as React's Vite plugin:

```shell
npm i -D @vitejs/plugin-react
```

Alternatively, you can also use `@vitejs/plugin-react-oxc` or `@vitejs/plugin-react-swc`.

and some TypeScript:

```shell
npm i -D typescript @types/react @types/react-dom @types/node vite-tsconfig-paths
```

## Update Configuration Files

We'll then update our `package.json` to use Vite's CLI and set `"type": "module"`:

```json
{
  // ...
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build"
  }
}
```

Then configure TanStack Start's Vite plugin in `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})
```

## Add the Basic Templating

There are 2 required files for TanStack Start usage:

1. The router configuration
2. The root of your application

Once configuration is done, we'll have a file tree that looks like the following:

```
.
├── src/
│   ├── routes/
│   │   └── `__root.tsx`
│   ├── `router.tsx`
│   ├── `routeTree.gen.ts`
├── `vite.config.ts`
├── `package.json`
└── `tsconfig.json`
```

## The Router Configuration

This is the file that will dictate the behavior of TanStack Router used within Start. Here, you can configure everything
from the default [preloading functionality](/router/latest/docs/framework/react/guide/preloading) to [caching staleness](/router/latest/docs/framework/react/guide/data-loading).

> [!NOTE]
> You won't have a `routeTree.gen.ts` file yet. This file will be generated when you run TanStack Start for the first time.

```tsx
// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

## The Root of Your Application

Finally, we need to create the root of our application. This is the entry point for all other routes. The code in this file will wrap all other routes in the application.

```tsx
// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

## Writing Your First Route

Now that we have the basic templating setup, we can write our first route. This is done by creating a new file in the `src/routes` directory.

```tsx
// src/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
  .inputValidator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate()
        })
      }}
    >
      Add 1 to {state}?
    </button>
  )
}
```

That's it! 🤯 You've now set up a TanStack Start project and written your first route. 🎉

You can now run `npm run dev` to start your server and navigate to `http://localhost:3000` to see your route in action.

You want to deploy your application? Check out the [hosting guide](./guide/hosting.md).
