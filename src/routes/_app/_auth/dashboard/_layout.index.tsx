import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users, Swords } from "lucide-react";
import siteConfig from "~/site.config";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { Button } from "@/ui/button";
import { Id } from "@cvx/_generated/dataModel";

interface Opponent {
  _id: Id<"opponents">;
  _creationTime: number;
  name: string;
  topic: string;
  style: string;
  position: string;
  talkingPoints: string[];
  difficulty: string;
  userId: Id<"users">;
}

export const Route = createFileRoute("/_app/_auth/dashboard/_layout/")({
  component: Dashboard,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Dashboard`,
    headerTitle: "Dashboard",
    headerDescription: "Manage your Apps and view your usage.",
  }),
});

export default function Dashboard() {
  const { data: opponents = [] } = useQuery(
    convexQuery(api.opponents.list, {}),
  );

  return (
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium text-primary">
                  Your Opponents
                </h2>
                <p className="text-sm font-normal text-primary/60">
                  Create and manage your debate opponents.
                </p>
              </div>
              <Link to="/dashboard/opponent-profile">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Opponent
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Default Opponent Card */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-secondary p-6 dark:bg-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Swords className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">Flo Jo Debate</h3>
                    <p className="text-xs text-primary/60">Default Scenario</p>
                  </div>
                </div>
              </div>
              <p className="line-clamp-2 text-sm text-primary/80">
                Debate whether Florence Griffith-Joyner's records should be
                removed.
              </p>
              <div className="mt-auto pt-4">
                <Link to="/dashboard/debate" className="w-full">
                  <Button className="w-full" variant="outline">
                    Practice Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Custom Opponents */}
            {opponents?.map((opponent: Opponent) => (
              <div
                key={opponent._id}
                className="flex flex-col gap-4 rounded-lg border border-border bg-secondary p-6 dark:bg-card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">
                        {opponent.name}
                      </h3>
                      <p className="text-xs text-primary/60 capitalize">
                        {opponent.style} Style
                      </p>
                    </div>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-primary/80">
                  Topic: {opponent.topic}
                </p>
                <div className="mt-auto pt-4">
                  <Link
                    to="/dashboard/prep"
                    search={{ opponentId: opponent._id }}
                    className="w-full"
                  >
                    <Button className="w-full" variant="outline">
                      Challenge
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
