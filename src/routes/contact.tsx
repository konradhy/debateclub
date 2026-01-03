import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us | DebateClub",
      },
      {
        name: "description",
        content:
          "Get in touch with the DebateClub team. We're here to help with questions, feedback, and support for your debate practice journey.",
      },
      {
        property: "og:title",
        content: "Contact Us | DebateClub",
      },
      {
        property: "og:description",
        content:
          "Get in touch with the DebateClub team. We're here to help with questions, feedback, and support for your debate practice journey.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: ContactPage,
});

/**
 * Contact page with multiple ways to reach the team.
 * Provides email contact and describes what kind of inquiries we handle.
 */
function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EF" }}>
      {/* Header */}
      <header
        className="border-b py-6"
        style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: "#5C5C54" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link to="/">
            <span className="text-xl font-bold" style={{ color: "#2A2A20" }}>
              DebateClub
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Get in Touch
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-lg" style={{ color: "#5C5C54" }}>
            We're here to help you master the art of debate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8"
        >
          {/* Contact Methods */}
          <div className="grid gap-6 sm:grid-cols-1">
            {/* Email Contact */}
            <div
              className="flex items-start gap-5 rounded-xl p-8"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E5DFD3" }}
              >
                <Mail className="h-7 w-7" style={{ color: "#3C4A32" }} />
              </div>
              <div className="flex-1">
                <h2
                  className="mb-2 text-2xl font-bold"
                  style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
                >
                  Email Us
                </h2>
                <p className="mb-3 text-base leading-relaxed" style={{ color: "#5C5C54" }}>
                  Click the email below to send us a message.
                </p>
                <a
                  href="mailto:contact@debateclub.io"
                  className="text-base font-medium underline transition-opacity hover:opacity-70"
                  style={{ color: "#3C4A32" }}
                >
                  contact@debateclub.io
                </a>
              </div>
            </div>
          </div>

          {/* What We Can Help With */}
          <div
            className="rounded-xl p-8"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <h2
              className="mb-6 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              How Can We Help?
            </h2>

            <div className="space-y-6">
              {/* General Questions */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <HelpCircle className="h-5 w-5" style={{ color: "#3C4A32" }} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold" style={{ color: "#2A2A20" }}>
                    General Questions
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#5C5C54" }}>
                    Questions about how DebateClub works, pricing, or features
                  </p>
                </div>
              </div>

              {/* Technical Support */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <MessageSquare className="h-5 w-5" style={{ color: "#3C4A32" }} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold" style={{ color: "#2A2A20" }}>
                    Technical Support
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#5C5C54" }}>
                    Experiencing issues? Let us know and we'll help troubleshoot
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <Mail className="h-5 w-5" style={{ color: "#3C4A32" }} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold" style={{ color: "#2A2A20" }}>
                    Feedback & Suggestions
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "#5C5C54" }}>
                    We'd love to hear your ideas for improving DebateClub
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="rounded-xl p-8"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <h2
              className="mb-4 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Before You Reach Out
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#C8D4B8" }}>
              Looking for information about our platform? Check out these helpful resources:
            </p>
            <div className="space-y-3">
              <Link
                to="/#features"
                className="block text-base transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                style={{ color: "#A8B08C" }}
                aria-label="Learn about features and capabilities"
              >
                → Features & Capabilities
              </Link>
              <Link
                to="/#pricing"
                className="block text-base transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                style={{ color: "#A8B08C" }}
                aria-label="View pricing information"
              >
                → Pricing Information
              </Link>
              <Link
                to="/#how-it-works"
                className="block text-base transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                style={{ color: "#A8B08C" }}
                aria-label="Learn how DebateClub works"
              >
                → How DebateClub Works
              </Link>
              <Link
                to="/blog"
                className="block text-base transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
                style={{ color: "#A8B08C" }}
                aria-label="Read blog articles and debate technique guides"
              >
                → Blog & Technique Guides
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            © {new Date().getFullYear()} DebateClub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
