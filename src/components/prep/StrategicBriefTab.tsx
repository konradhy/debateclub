import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { colors } from "@/lib/prep-colors";

interface StrategicBriefTabProps {
  strategicBrief: string | undefined;
  strategicBriefMetadata:
    | {
        generatedAt: number;
        wordCount: number;
        readingTimeMinutes: number;
      }
    | undefined;
}

export function StrategicBriefTab({
  strategicBrief,
  strategicBriefMetadata,
}: StrategicBriefTabProps) {
  if (!strategicBrief) {
    return <EmptyBriefState />;
  }

  return (
    <div className="space-y-0">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-t-xl"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        <div className="relative flex items-center gap-5 p-6 lg:p-8">
          {/* Icon Container */}
          <div
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl shadow-md"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <img
              src="/images/custom/strategy-map.svg"
              alt=""
              className="h-10 w-10"
            />
          </div>

          {/* Title & Meta */}
          <div className="flex-1">
            <h2
              className="text-2xl font-bold tracking-tight lg:text-3xl"
              style={{ color: "#FAFAF8", fontFamily: "Georgia, serif" }}
            >
              Strategic Brief
            </h2>
            <p className="mt-1 text-sm" style={{ color: "#C8D4B8" }}>
              Your tactical orientation for this engagement
            </p>
          </div>

          {/* Reading Time Badge - More Integrated */}
          {strategicBriefMetadata && (
            <div className="flex items-center gap-2.5 rounded-lg border px-5 py-3 shadow-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderColor: "rgba(60, 74, 50, 0.2)",
              }}
            >
              <div className="flex flex-col items-center">
                <span
                  className="text-2xl font-bold leading-none"
                  style={{ color: colors.primary }}
                >
                  {strategicBriefMetadata.readingTimeMinutes}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: colors.textLight }}>
                  min
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Document Body */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-b-xl border-x-2 border-b-2"
        style={{
          backgroundColor: "#FAFAF8",
          borderColor: colors.border,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Main Content Area */}
        <div className="px-6 py-12 lg:px-20 lg:py-16">
          <ReactMarkdown
            components={{
              h1: ({ children, ...props }) => (
                <h1
                  className="mb-8 mt-12 text-4xl font-bold tracking-tight first:mt-0"
                  style={{
                    color: colors.text,
                    fontFamily: "Georgia, serif",
                  }}
                  {...props}
                >
                  {children}
                </h1>
              ),
              h2: ({ children, ...props }) => (
                <div className="-mx-6 mb-10 mt-16 first:mt-0 lg:-mx-20">
                  <div
                    className="border-l-[6px] px-6 py-5 shadow-sm lg:px-20"
                    style={{
                      backgroundColor: `${colors.primary}15`,
                      borderColor: colors.accent,
                    }}
                  >
                    <h2
                      className="text-2xl font-bold tracking-tight lg:text-3xl"
                      style={{
                        color: colors.text,
                        fontFamily: "Georgia, serif",
                      }}
                      {...props}
                    >
                      {children}
                    </h2>
                  </div>
                </div>
              ),
              h3: ({ children, ...props }) => (
                <h3
                  className="mb-4 mt-10 text-xl font-bold tracking-tight"
                  style={{ color: colors.primary }}
                  {...props}
                >
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p
                  className="mb-5 text-[15px] leading-[1.8]"
                  style={{ color: colors.text }}
                  {...props}
                >
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className="mb-8 space-y-4" {...props}>
                  {children}
                </ul>
              ),
              li: ({ children, ...props }) => (
                <li className="flex items-start gap-4" {...props}>
                  <span
                    className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full shadow-sm"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <span
                    className="flex-1 text-[15px] leading-[1.8]"
                    style={{ color: colors.text }}
                  >
                    {children}
                  </span>
                </li>
              ),
              strong: ({ children, ...props }) => (
                <strong
                  className="font-bold"
                  style={{ color: colors.primary }}
                  {...props}
                >
                  {children}
                </strong>
              ),
              em: ({ children, ...props }) => (
                <em
                  className="not-italic font-semibold"
                  style={{ color: colors.primaryLight }}
                  {...props}
                >
                  {children}
                </em>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote
                  className="my-8 rounded-lg border-l-4 py-4 pl-6 pr-5 shadow-sm"
                  style={{
                    borderColor: colors.accent,
                    backgroundColor: `${colors.accent}20`,
                  }}
                  {...props}
                >
                  {children}
                </blockquote>
              ),
              hr: () => (
                <div
                  className="-mx-6 my-14 lg:-mx-20"
                  style={{
                    height: "2px",
                    background: `linear-gradient(to right, transparent, ${colors.accent}40, ${colors.accent}, ${colors.accent}40, transparent)`,
                  }}
                />
              ),
            }}
          >
            {strategicBrief}
          </ReactMarkdown>
        </div>

        {/* Footer Metadata */}
        {strategicBriefMetadata && (
          <div
            className="flex items-center justify-between border-t-2 px-6 py-5 lg:px-20"
            style={{
              borderColor: colors.border,
              backgroundColor: `${colors.primary}08`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <img
                src="/images/custom/stamped-document.svg"
                alt=""
                className="h-4 w-4 opacity-60"
              />
              <span className="text-xs font-medium" style={{ color: colors.textLight }}>
                Generated{" "}
                {new Date(strategicBriefMetadata.generatedAt).toLocaleDateString(
                  undefined,
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }
                )}
              </span>
            </div>
            <span className="text-xs font-medium" style={{ color: colors.textLight }}>
              {strategicBriefMetadata.wordCount.toLocaleString()} words
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/**
 * Empty state shown when no strategic brief has been generated yet.
 * Designed to be inviting and clearly communicate the value.
 */
function EmptyBriefState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-xl py-20"
      style={{
        backgroundColor: `${colors.primary}08`,
        border: `2px dashed ${colors.border}`,
      }}
    >
      {/* Icon */}
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg"
        style={{ backgroundColor: colors.primary }}
      >
        <img
          src="/images/custom/strategy-map.svg"
          alt=""
          className="h-12 w-12"
        />
      </div>

      {/* Title */}
      <h3
        className="mb-2 text-xl font-bold"
        style={{ color: colors.text, fontFamily: "Georgia, serif" }}
      >
        Strategic Brief
      </h3>

      {/* Description */}
      <p
        className="mb-6 max-w-md text-center text-sm leading-relaxed"
        style={{ color: colors.textMuted }}
      >
        A comprehensive tactical orientation document that synthesizes your
        research and prep materials into a coherent game plan.
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          "Battlefield Analysis",
          "Key Arguments",
          "Hasan Principles",
          "Deployment Flow",
        ].map((feature) => (
          <span
            key={feature}
            className="rounded-full border px-4 py-1.5 text-xs font-medium shadow-sm"
            style={{
              backgroundColor: `${colors.accent}25`,
              borderColor: `${colors.accent}40`,
              color: colors.primary,
            }}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Reading time indicator */}
      <div
        className="mt-8 flex items-center gap-2 rounded-lg border px-5 py-2.5 shadow-sm"
        style={{
          backgroundColor: `${colors.primary}12`,
          borderColor: `${colors.primary}20`,
        }}
      >
        <span className="text-xs font-medium" style={{ color: colors.textMuted }}>
          ~7 minute read
        </span>
      </div>

      {/* Instruction */}
      <p className="mt-6 text-xs font-medium" style={{ color: colors.textLight }}>
        Generate prep materials to unlock your strategic brief
      </p>
    </motion.div>
  );
}
