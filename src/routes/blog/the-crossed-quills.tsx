import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/the-crossed-quills")({
  component: TheCrossedQuillsArticle,
});

/**
 * Blog article about the DebateClub logo design.
 * Explores the symbolism of crossed quills and connection to rhetoric.
 */
function TheCrossedQuillsArticle() {
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
            style={{ backgroundColor: "#E8DFC8", color: "#5C5444" }}
          >
            Behind the Brand
          </span>

          {/* Title */}
          <h1
            className="mb-6 text-4xl font-bold leading-tight lg:text-5xl"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Crossed Quills: A Symbol for the Art of Argument
          </h1>

          {/* Meta */}
          <p className="mb-12 text-sm" style={{ color: "#888880" }}>
            5 min read · Design & Philosophy
          </p>
        </motion.div>

        {/* Hero Image - The Logo */}
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div
            className="rounded-2xl p-12 shadow-lg"
            style={{
              backgroundColor: "#FAFAF8",
              border: "1px solid #E8E4DA",
            }}
          >
            <img
              src="/images/logo.png"
              alt="DebateClub Logo - Crossed Quills"
              className="h-32 w-auto lg:h-40"
            />
          </div>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Opening */}
          <p className="text-lg leading-relaxed" style={{ color: "#3A3A35" }}>
            Every symbol tells a story. When we set out to create the visual
            identity for DebateClub, we knew it had to capture something
            essential about what happens when two minds meet in argument. Not
            conflict for its own sake, but the kind of{" "}
            <strong>productive collision</strong> that sharpens ideas and
            reveals truth.
          </p>

          <p className="mt-6 leading-relaxed" style={{ color: "#5C5C54" }}>
            The result is the crossed quills: two feather pens crossed like
            swords, a visual metaphor for the oldest form of intellectual
            combat.
          </p>

          {/* Section 1 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Pen as Weapon
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            "The pen is mightier than the sword." Edward Bulwer-Lytton wrote
            those words in 1839, but the idea is ancient. Rhetoric, the art of
            persuasion, has toppled empires, launched revolutions, and changed
            the course of history more reliably than any army.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The quill pen was the instrument of this power for over a thousand
            years. From Cicero's orations to the Declaration of Independence,
            the quill was how arguments were refined, recorded, and transmitted
            across time. When you see a quill, you see the legacy of every
            philosopher, lawyer, and statesman who shaped the world with words.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "In a republican nation whose citizens are to be led by reason and
            persuasion and not by force, the art of reasoning becomes of first
            importance."
            <span className="mt-2 block text-sm not-italic">
              - Thomas Jefferson
            </span>
          </blockquote>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            By crossing two quills, we invoke the moment when two such weapons
            meet. Not to destroy, but to test. Every great debate is a duel of
            ideas where both sides emerge sharper for the encounter.
          </p>

          {/* Section 2 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Anatomy of the Mark
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            Look closely at the crossed quills and you will notice deliberate
            choices in every line:
          </p>

          <div
            className="my-6 rounded-xl p-6"
            style={{ backgroundColor: "#FAFAF8" }}
          >
            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                The Crossing Point
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The quills cross at their shafts, not their tips. This is
                intentional. The tips (the writing ends) point outward, ready to
                create. The crossing represents the moment of engagement, but
                the orientation reminds us that both parties leave the encounter
                ready to write, to build, to continue.
              </p>
            </div>

            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                Bilateral Symmetry
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The two quills are mirror images of each other. In heraldic
                tradition, this symmetry signals equality: neither combatant has
                an inherent advantage. Good debate begins from this premise:
                both sides deserve to be heard on equal footing.
              </p>
            </div>

            <div className="mb-6">
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                The Feather Barbs
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The stylized feather barbs along each quill add texture and
                organic warmth. These are not cold, industrial weapons. They are
                natural instruments, extensions of the human hand. Debate is a
                fundamentally human activity, and the logo reflects that.
              </p>
            </div>

            <div>
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: "#3C4A32" }}
              >
                The Nibs
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5C5C54" }}
              >
                The pointed nibs at the bottom of each quill are rendered as
                sharp triangles. These are the business end, the part that makes
                contact with the page, that commits ideas to permanence. Sharp,
                precise, and ready.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            The Color of Conviction
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The logo lives in a palette we call "Forest & Parchment": deep olive
            greens paired with warm cream and aged-paper tones. These colors
            were not chosen arbitrarily.
          </p>

          <div className="my-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-lg"
                style={{ backgroundColor: "#3C4A32" }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: "#2A2A20" }}>
                  Deep Forest
                </p>
                <p className="text-xs" style={{ color: "#888880" }}>
                  #3C4A32
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-lg"
                style={{ backgroundColor: "#9A9A6D" }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: "#2A2A20" }}>
                  Olive Gold
                </p>
                <p className="text-xs" style={{ color: "#888880" }}>
                  #9A9A6D
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-lg border"
                style={{ backgroundColor: "#FAFAF8", borderColor: "#E8E4DA" }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: "#2A2A20" }}>
                  Parchment
                </p>
                <p className="text-xs" style={{ color: "#888880" }}>
                  #FAFAF8
                </p>
              </div>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            <strong>Deep Forest Green</strong> is the color of Oxford libraries,
            leather-bound first editions, and the baize of parliamentary
            debating chambers. It signals intellectual tradition without
            stuffiness. Serious, but not severe.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            <strong>Olive Gold</strong> adds warmth and hints at the brass
            fittings of antique writing desks. It is the color of aged paper
            edges, of ideas that have stood the test of time.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            <strong>Parchment White</strong> provides the ground: clean, open
            space where ideas can breathe. Like a blank page waiting for the
            next argument.
          </p>

          {/* Section 4 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Classical Roots, Modern Practice
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            There is a tension at the heart of DebateClub: we are building
            cutting-edge AI technology to teach an art that is 2,500 years old.
            Aristotle codified rhetoric. Cicero perfected it. Lincoln and
            Douglas demonstrated it. And now you can practice it with a sparring
            partner that never tires.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The crossed quills bridge this gap. They are unmistakably
            classical (no one has written with a quill in over a century) yet they
            are rendered in a clean, geometric style that feels contemporary.
            History and innovation, tradition and technology, the ancient art
            and the modern tool.
          </p>

          <div
            className="my-8 overflow-hidden rounded-xl"
            style={{ backgroundColor: "#2A2A20" }}
          >
            <div className="px-6 py-4" style={{ backgroundColor: "#3C4A32" }}>
              <h4
                className="text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#C8D4B8" }}
              >
                The Lineage of Rhetoric
              </h4>
            </div>
            <div className="p-6 font-mono text-sm" style={{ color: "#C8D4B8" }}>
              <pre className="whitespace-pre-wrap">
                {`Ancient Greece (5th c. BCE)
    │
    ├── Aristotle's "Rhetoric"
    │   └── Logos, Pathos, Ethos
    │
    ▼
Roman Republic (1st c. BCE)
    │
    ├── Cicero's Orations
    │   └── "The Philippics"
    │
    ▼
Enlightenment (18th c.)
    │
    ├── Parliamentary Debate
    │   └── Burke, Fox, Pitt
    │
    ▼
Modern Era (20th c.)
    │
    ├── Broadcast Debate
    │   └── Kennedy-Nixon, 1960
    │
    ▼
Today
    │
    └── AI-Powered Practice
        └── DebateClub ✦`}
              </pre>
            </div>
          </div>

          {/* Section 5 */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Why Symbols Matter
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            A logo is more than decoration. It is a promise. Every time you see
            the crossed quills, you should be reminded of what you are here to
            do: to sharpen your ability to persuade, to think clearly under
            pressure, to win arguments not through volume but through skill.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The quills remind us that words have power. The crossing reminds us
            that debate is a contest. The symmetry reminds us that we owe our
            opponents the respect of taking their arguments seriously. And the
            sharp nibs remind us to be precise: to say exactly what we mean.
          </p>

          <blockquote
            className="my-8 border-l-4 py-2 pl-6 italic"
            style={{ borderColor: "#9A9A6D", color: "#5C5C54" }}
          >
            "The object of oratory is not truth, but persuasion."
            <span className="mt-2 block text-sm not-italic">
              - Thomas Babington Macaulay
            </span>
          </blockquote>

          {/* Closing */}
          <h2
            className="mb-4 mt-12 text-2xl font-bold"
            style={{ color: "#2A2A20", fontFamily: "Georgia, serif" }}
          >
            Pick Up Your Quill
          </h2>

          <p className="leading-relaxed" style={{ color: "#5C5C54" }}>
            The next time you open DebateClub, take a moment to look at the
            logo. Remind yourself that you are joining a tradition that
            stretches back millennia. You are practicing the same skills that
            Demosthenes practiced on the shores of the Aegean, that Lincoln
            practiced in dusty Illinois courtrooms, that every effective leader
            in history has cultivated.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            The quills are crossed. The debate is on.
          </p>

          <p className="mt-4 leading-relaxed" style={{ color: "#5C5C54" }}>
            Your move.
          </p>

          {/* CTA */}
          <div
            className="mt-12 rounded-xl p-8 text-center"
            style={{ backgroundColor: "#3C4A32" }}
          >
            <h3
              className="mb-4 text-2xl font-bold"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Ready to Cross Quills?
            </h3>
            <p className="mb-6" style={{ color: "#C8C8B8" }}>
              Start your first practice debate and join the lineage of great
              orators.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-all hover:gap-3"
              style={{ backgroundColor: "#FAFAF8", color: "#3C4A32" }}
            >
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Navigation */}
          <div
            className="mt-12 flex justify-between border-t pt-8"
            style={{ borderColor: "#E8E4DA" }}
          >
            <Link
              to="/blog"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
            <Link
              to="/blog/read-any-room"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#3C4A32" }}
            >
              Next: Read Any Room
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: "#E8E4DA" }}>
        <div className="mx-auto max-w-3xl px-8 text-center">
          <p className="text-sm" style={{ color: "#5C5C54" }}>
            © {new Date().getFullYear()} DebateClub. Based on "Win Every
            Argument" by Mehdi Hasan.
          </p>
        </div>
      </footer>
    </div>
  );
}
