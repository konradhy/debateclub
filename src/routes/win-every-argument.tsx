import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Book,
  Headphones,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/win-every-argument")({
  head: () => ({
    meta: [
      {
        title: "Win Every Argument by Mehdi Hasan | DebateClub",
      },
      {
        name: "description",
        content:
          "The book behind DebateClub. Buy Win Every Argument by Mehdi Hasan: The Art of Debating, Persuading, and Public Speaking. Links to book, audiobook, and author.",
      },
      {
        property: "og:title",
        content: "Win Every Argument by Mehdi Hasan | DebateClub",
      },
      {
        property: "og:description",
        content:
          "The book behind DebateClub. Buy Win Every Argument by Mehdi Hasan: The Art of Debating, Persuading, and Public Speaking. Links to book, audiobook, and author.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/images/landingpage.png" },
      { property: "og:site_name", content: "DebateClub" },
    ],
  }),
  component: WinEveryArgumentPage,
});

/**
 * Attribution and disclaimer page for Mehdi Hasan's "Win Every Argument."
 * Clearly states non-affiliation while crediting the source material
 * and providing links to the original book, audiobook, and author's social media.
 */
function WinEveryArgumentPage() {
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
            About "Win Every Argument"
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-lg" style={{ color: "#5C5C54" }}>
            Attribution, Disclaimer, and Resources
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Disclaimer Section */}
          <div
            className="mb-12 rounded-xl border-l-4 p-8"
            style={{
              backgroundColor: "#FAFAF8",
              borderColor: "#B8860B",
            }}
          >
            <h2
              className="mb-4 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              Important Disclaimer
            </h2>
            <div className="space-y-4" style={{ color: "#5C5C54" }}>
              <p className="leading-relaxed">
                <strong style={{ color: "#2A2A20" }}>
                  DebateClub is not affiliated with, endorsed by, or sponsored
                  by Mehdi Hasan, Henry Holt and Company, or any entity
                  associated with the publication of "Win Every Argument."
                </strong>
              </p>
              <p className="leading-relaxed">
                This platform is an independent educational tool that was
                inspired by concepts and techniques discussed in the book "Win
                Every Argument: The Art of Debating, Persuading, and Public
                Speaking" by Mehdi Hasan. Any references to the book are made
                for educational and informational purposes only.
              </p>
              <p className="leading-relaxed">
                The views, opinions, and content presented on DebateClub are
                solely those of the DebateClub team and do not represent or
                reflect the views of Mehdi Hasan or his publishers. Nothing on
                this platform should be construed as an endorsement by or
                association with Mr. Hasan.
              </p>
            </div>
          </div>

          {/* About the Book */}
          <div className="mb-12">
            <h2
              className="mb-6 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              About the Book
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "#5C5C54" }}>
              "Win Every Argument: The Art of Debating, Persuading, and Public
              Speaking" is a bestselling book by journalist and broadcaster
              Mehdi Hasan, published in 2023. The book presents practical
              techniques for effective argumentation, drawing on classical
              rhetoric and modern communication strategies.
            </p>
            <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
              We encourage everyone interested in improving their debate and
              persuasion skills to read the original work. It provides
              invaluable insights that go far beyond what any practice tool can
              offer.
            </p>
          </div>

          {/* Resource Links */}
          <div className="mb-12">
            <h2
              className="mb-6 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              Get the Book
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Physical Book */}
              <a
                href="https://www.amazon.com/Win-Every-Argument-Debating-Persuading/dp/1250853478"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl p-6 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "#FAFAF8" }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <Book className="h-6 w-6" style={{ color: "#3C4A32" }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                    Hardcover & Paperback
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Available on Amazon
                  </p>
                </div>
                <ExternalLink
                  className="h-5 w-5"
                  style={{ color: "#8A8A80" }}
                />
              </a>

              {/* Audiobook */}
              <a
                href="https://www.audible.com/pd/Win-Every-Argument-Audiobook/B0BGYBQJ2S"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl p-6 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "#FAFAF8" }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E5DFD3" }}
                >
                  <Headphones
                    className="h-6 w-6"
                    style={{ color: "#3C4A32" }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                    Audiobook
                  </h3>
                  <p className="text-sm" style={{ color: "#5C5C54" }}>
                    Narrated by the author on Audible
                  </p>
                </div>
                <ExternalLink
                  className="h-5 w-5"
                  style={{ color: "#8A8A80" }}
                />
              </a>
            </div>
          </div>

          {/* About Mehdi Hasan */}
          <div className="mb-12">
            <h2
              className="mb-6 text-2xl font-bold"
              style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
            >
              About the Author
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "#5C5C54" }}>
              Mehdi Hasan is an award-winning journalist, broadcaster, and
              author. He has worked for MSNBC, The Intercept, and Al Jazeera
              English, and is known for his incisive interviewing style and
              sharp debate skills. His work has been recognized with numerous
              awards, and he is a respected voice in political journalism.
            </p>
            <a
              href="https://x.com/mehdirhasan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: "#FAFAF8" }}
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: "#1F1F1A" }}
              >
                <Twitter className="h-5 w-5" style={{ color: "#FAFAF8" }} />
              </div>
              <div>
                <h3 className="font-bold" style={{ color: "#2A2A20" }}>
                  @mehdirhasan
                </h3>
                <p className="text-sm" style={{ color: "#5C5C54" }}>
                  Follow Mehdi Hasan on X (Twitter)
                </p>
              </div>
              <ExternalLink className="h-5 w-5" style={{ color: "#8A8A80" }} />
            </a>
          </div>

          {/* Our Approach */}
          <div
            className="mb-12 rounded-xl p-8"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <h2
              className="mb-4 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Why DebateClub Exists
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#C8D4B8" }}>
              We built DebateClub because we believe everyone deserves the
              opportunity to practice and improve their argumentation skills.
              Public speaking and debate are learnable skills, and having a safe
              space to practice—with real-time feedback—can accelerate anyone's
              growth.
            </p>
            <p className="leading-relaxed" style={{ color: "#C8D4B8" }}>
              The techniques in "Win Every Argument" provide an excellent
              framework for what makes argumentation effective. Our goal is to
              complement the book by giving readers a practical way to apply
              these concepts through voice-based practice with AI opponents.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="mb-4 text-sm" style={{ color: "#8A8A80" }}>
              Questions about this disclaimer or our use of referenced material?
            </p>
            <a
              href="mailto:contact@debateclub.io"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Contact Us
              <ExternalLink className="h-4 w-4" />
            </a>
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
