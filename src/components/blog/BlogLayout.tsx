import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface BlogLayoutProps {
  /** Category badge text (e.g., "Sales Practice", "Negotiation") */
  badge: string;
  /** Article title */
  title: string;
  /** Read time and category (e.g., "10 min read · Sales Scenarios") */
  meta: string;
  /** Article content */
  children: ReactNode;
  /** Footer text (defaults to generic DebateClub copyright) */
  footerText?: string;
  /** Previous article link */
  prevLink?: { to: string; label: string };
  /** Next article link */
  nextLink?: { to: string; label: string };
}

/**
 * Standard blog post layout with header, footer, and article structure.
 * Provides consistent styling and navigation across all blog posts.
 */
export function BlogLayout({
  badge,
  title,
  meta,
  children,
  footerText,
  prevLink,
  nextLink,
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header
        className="border-b py-6"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "#5C5C54" }}
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>
          <Link to="/">
            <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>
              DebateClub
            </span>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span
            className="mb-4 inline-block rounded-md px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "#A8B08C", color: "#3A4030" }}
          >
            {badge}
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            {title}
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            {meta}
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {children}

          {/* Article Navigation */}
          {(prevLink || nextLink) && (
            <div
              className="mt-12 flex justify-between border-t pt-8"
              style={{ borderColor: "#E8E4DA" }}
            >
              {prevLink ? (
                <Link
                  to={prevLink.to}
                  className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: "#3C4A32" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {prevLink.label}
                </Link>
              ) : (
                <div />
              )}
              {nextLink ? (
                <Link
                  to={nextLink.to}
                  className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: "#3C4A32" }}
                >
                  {nextLink.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                  style={{ color: "#3C4A32" }}
                >
                  Try It Yourself
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            {footerText ||
              `© ${new Date().getFullYear()} DebateClub. Techniques based on research from multiple frameworks.`}
          </p>
        </div>
      </footer>
    </div>
  );
}
