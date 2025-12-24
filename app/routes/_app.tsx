import { createFileRoute, Outlet } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";

/**
 * Authenticated app layout.
 * SSR is disabled for all child routes since Convex Auth is client-side only.
 * The beforeLoad hook ensures the user query is loaded before rendering.
 */
export const Route = createFileRoute("/_app")({
  // Disable SSR for all authenticated routes
  // Auth state is only available client-side with Convex Auth
  ssr: false,

  beforeLoad: async ({ context }) => {
    // Ensure the user query is loaded before rendering the app
    await context.queryClient.ensureQueryData(
      convexQuery(api.app.getCurrentUser, {}),
    );
  },

  component: AppLayout,
});

function AppLayout() {
  return <Outlet />;
}

