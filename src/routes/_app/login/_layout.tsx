import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";

const HOME_PATH = "/";

const QUOTES = [
  {
    quote: "The best way to win an argument is to start by being right.",
    author: "Jill Lepore",
  },
  {
    quote:
      "In matters of style, swim with the current; in matters of principle, stand like a rock.",
    author: "Thomas Jefferson",
  },
  {
    quote: "The aim of argument should not be victory, but progress.",
    author: "Joseph Joubert",
  },
  {
    quote:
      "It is better to debate a question without settling it than to settle a question without debating it.",
    author: "Joseph Joubert",
  },
  {
    quote:
      "The most important thing in communication is hearing what isn't said.",
    author: "Peter Drucker",
  },
  {
    quote: "Rhetoric is the art of ruling the minds of men.",
    author: "Plato",
  },
];

const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

export const Route = createFileRoute("/_app/login/_layout")({
  component: LoginLayout,
});

function LoginLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading && !isAuthenticated) {
    return null;
  }
  return (
    <div className="flex h-screen w-full">
      <div className="absolute left-1/2 top-10 mx-auto flex -translate-x-1/2 transform lg:hidden">
        <Link
          to={HOME_PATH}
          className="z-10 flex h-10 flex-col items-center justify-center gap-2"
        >
          <img
            src="/images/logotext.png"
            alt="DebateClub"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <div className="relative hidden h-full w-[50%] flex-col justify-between overflow-hidden bg-card p-10 lg:flex">
        <Link to={HOME_PATH} className="z-10 flex items-center gap-1">
          <img
            src="/images/logotext.png"
            className="h-8 w-auto"
            alt="DebateClub"
          />
        </Link>

        <div className="z-10 flex flex-col items-start gap-2">
          <p className="text-base font-normal text-primary">
            {randomQuote.quote}
          </p>
          <p className="text-base font-normal text-primary/60">
            -{randomQuote.author}
          </p>
        </div>
        <div className="base-grid absolute left-0 top-0 z-0 h-full w-full opacity-40" />
      </div>
      <div className="flex h-full w-full flex-col border-l border-primary/5 bg-card lg:w-[50%]">
        <Outlet />
      </div>
    </div>
  );
}
