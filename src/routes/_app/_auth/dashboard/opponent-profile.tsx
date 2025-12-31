import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import { Popover, PopoverTrigger, PopoverContent } from "@/ui/popover";
import siteConfig from "~/site.config";
import {
  Save,
  Target,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Coins,
  Infinity as InfinityIcon,
} from "lucide-react";
import {
  SCENARIOS,
  getScenariosByCategory,
  DEFAULT_SCENARIO_ID,
  type ScenarioConfig,
  type FormSection,
  type InputFieldConfig,
} from "@/scenarios";
import { cn } from "@/utils/misc";
import { motion } from "framer-motion";
import { useAllTokenBalances } from "@/components/TokenBalance";

export const Route = createFileRoute("/_app/_auth/dashboard/opponent-profile")({
  component: OpponentProfile,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Create Practice Session`,
    headerTitle: "Create Practice Session",
    headerDescription: "Configure your practice partner",
  }),
});

// ==========================================
// Color Constants (matching marketing pages)
// ==========================================
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  headerBg: "#FAFAF8",
  border: "#E8E4DA",
  borderLight: "#EBE7DD",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  primaryLighter: "#7B8A6F",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
  accent: "#A8B08C",
  accentDark: "#3A4030",
  cream: "#E8DFC8",
  creamDark: "#5C5444",
};

// ==========================================
// Helper Components
// ==========================================

/**
 * Labeled textarea with helper text for form fields.
 */
function LabeledTextarea({
  id,
  label,
  placeholder,
  helperText,
  value,
  onChange,
  rows = 3,
}: {
  id: string;
  label: string;
  placeholder: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: colors.text }}
      >
        {label}
      </label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="resize-none border-2 bg-white transition-all focus:border-[#7B8A6F] focus:ring-0"
        style={{ borderColor: colors.border }}
      />
      {helperText && (
        <p className="text-xs" style={{ color: colors.textLight }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Labeled input for text fields.
 */
function LabeledInput({
  id,
  label,
  placeholder,
  helperText,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: colors.text }}
      >
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 bg-white transition-all focus:border-[#7B8A6F] focus:ring-0"
        style={{ borderColor: colors.border }}
      />
      {helperText && (
        <p className="text-xs" style={{ color: colors.textLight }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Labeled select dropdown.
 */
function LabeledSelect({
  id,
  label,
  value,
  onChange,
  options,
  helperText,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  helperText?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: colors.text }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-md border-2 bg-white px-3 py-2 text-sm transition-all focus:border-[#7B8A6F] focus:outline-none focus:ring-0"
        style={{ borderColor: colors.border }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className="text-xs" style={{ color: colors.textLight }}>
          {helperText}
        </p>
      )}
    </div>
  );
}

/**
 * Generic field renderer based on field config.
 */
function FormField({
  fieldKey,
  config,
  value,
  onChange,
}: {
  fieldKey: string;
  config: InputFieldConfig;
  value: string;
  onChange: (value: string) => void;
}) {
  const fieldType = config.type || "textarea";

  switch (fieldType) {
    case "text":
      return (
        <LabeledInput
          id={fieldKey}
          label={config.label}
          placeholder={config.placeholder}
          helperText={config.helperText}
          value={value}
          onChange={onChange}
        />
      );
    case "select":
      return (
        <LabeledSelect
          id={fieldKey}
          label={config.label}
          value={value}
          onChange={onChange}
          options={config.options || []}
          helperText={config.helperText}
        />
      );
    case "textarea":
    default:
      return (
        <LabeledTextarea
          id={fieldKey}
          label={config.label}
          placeholder={config.placeholder}
          helperText={config.helperText}
          value={value}
          onChange={onChange}
          rows={config.rows || 3}
        />
      );
  }
}

/**
 * Simple accordion section renderer - discreet styling.
 */
function AccordionSection({
  section,
  scenario,
  formData,
  updateField,
}: {
  section: FormSection;
  scenario: ScenarioConfig;
  formData: Record<string, string>;
  updateField: (key: string, value: string) => void;
}) {
  return (
    <AccordionItem
      value={section.id}
      className="border-b last:border-b-0"
      style={{ borderColor: colors.border }}
    >
      <AccordionTrigger className="py-3 hover:no-underline">
        <span className="text-sm" style={{ color: colors.textMuted }}>
          {section.title}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-4 pb-4 pl-4">
          {section.fields.map((fieldKey: string) => {
            const fieldConfig = scenario.inputs[fieldKey];
            if (!fieldConfig || fieldConfig.hidden) return null;
            return (
              <FormField
                key={fieldKey}
                fieldKey={fieldKey}
                config={fieldConfig}
                value={formData[fieldKey] || ""}
                onChange={(v) => updateField(fieldKey, v)}
              />
            );
          })}
          {section.subsections && section.subsections.length > 0 && (
            <Accordion type="multiple">
              {section.subsections.map((sub: FormSection) => (
                <AccordionSection
                  key={sub.id}
                  section={sub}
                  scenario={scenario}
                  formData={formData}
                  updateField={updateField}
                />
              ))}
            </Accordion>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

/**
 * Modal displayed when user clicks on a locked scenario.
 */
function LockedScenarioModal({
  scenarioName,
  onClose,
}: {
  scenarioName: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="mx-4 w-full max-w-sm rounded-xl p-6"
        style={{ backgroundColor: colors.cardBg }}
      >
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: colors.text }}
        >
          {scenarioName} Locked
        </h3>
        <p
          className="text-sm mb-6"
          style={{ color: colors.textMuted }}
        >
          You need tokens to practice this scenario.
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
            style={{ backgroundColor: colors.primary }}
            onClick={() => navigate({ to: "/dashboard/settings/billing" })}
          >
            Buy Tokens
          </button>
          <button
            type="button"
            className="w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-gray-50"
            style={{
              backgroundColor: `${colors.primary}10`,
              color: colors.primary,
            }}
            onClick={() => navigate({ to: "/dashboard/settings/billing" })}
          >
            Upgrade to Pro
          </button>
          <button
            type="button"
            className="w-full rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-50"
            style={{ color: colors.textMuted }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Scenario selector popover - closes on selection.
 * Shows token access info for each scenario.
 */
function ScenarioPopover({
  currentScenario,
  onScenarioChange,
  tokenBalances,
  isSubscriber,
}: {
  currentScenario: string;
  onScenarioChange: (id: string) => void;
  tokenBalances: Record<string, number>;
  isSubscriber: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [lockedScenario, setLockedScenario] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const scenariosByCategory = getScenariosByCategory();

  const handleSelect = (id: string, name: string) => {
    // Check access before allowing selection
    const hasAccess = isSubscriber || (tokenBalances[id] ?? 0) > 0;
    if (!hasAccess) {
      // Show locked modal
      setLockedScenario({ id, name });
      setOpen(false);
      return;
    }
    onScenarioChange(id);
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: colors.textMuted }}
          >
            Change practice type
            <ChevronDown className="h-3 w-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-72 p-0 overflow-hidden"
          align="start"
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex flex-col">
            {Object.entries(scenariosByCategory).map(
              ([category, scenarios], idx) => (
                <div
                  key={category}
                  className={idx > 0 ? "border-t" : ""}
                  style={{ borderColor: colors.border }}
                >
                  <div
                    className="px-3 py-1.5 text-xs font-medium uppercase tracking-wide"
                    style={{
                      backgroundColor: colors.background,
                      color: colors.textLight,
                    }}
                  >
                    {category}
                  </div>
                  <div className="p-1">
                    {scenarios.map((s) => {
                      const balance = tokenBalances[s.id] ?? 0;
                      const hasAccess = isSubscriber || balance > 0;
                      const isSelected = currentScenario === s.id;

                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSelect(s.id, s.name)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between",
                            isSelected && "font-medium",
                            hasAccess && !isSelected && "hover:bg-black/5",
                            !hasAccess && "opacity-50",
                          )}
                          style={{
                            backgroundColor: isSelected
                              ? colors.accent
                              : "transparent",
                            color: isSelected ? colors.accentDark : colors.text,
                          }}
                        >
                          <span>{s.name}</span>
                          {/* Show token info only if subscriber or has tokens */}
                          {isSubscriber ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-600">
                              <InfinityIcon className="h-3 w-3" />
                            </span>
                          ) : balance > 0 ? (
                            <span className="flex items-center gap-1 text-xs text-amber-600">
                              <Coins className="h-3 w-3" />
                              {balance}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ),
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Locked Scenario Modal */}
      {lockedScenario && (
        <LockedScenarioModal
          scenarioName={lockedScenario.name}
          onClose={() => setLockedScenario(null)}
        />
      )}
    </>
  );
}

// ==========================================
// Main Component
// ==========================================

function OpponentProfile() {
  const navigate = useNavigate();

  // Fetch current user
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));

  // Token balances for scenario gating
  const { balances: tokenBalances, isSubscriber } = useAllTokenBalances();

  // Create opponent mutation
  const createOpponent = useConvexMutation(api.opponents.create);

  // Scenario selection
  const [scenarioType, setScenarioType] = useState(DEFAULT_SCENARIO_ID);
  const scenario = SCENARIOS[scenarioType];
  const isDebate = scenario?.pipeline?.prepType === "debate";

  // Check access for current scenario
  const currentScenarioBalance = tokenBalances[scenarioType] ?? 0;
  const hasCurrentScenarioAccess = isSubscriber || currentScenarioBalance > 0;

  // Form data
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    topic: "",
    position: "pro",
    style: "aggressive",
    difficulty: "medium",
  });

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle scenario change - only allow if user has access
  const handleScenarioChange = (newScenarioId: string) => {
    const hasAccess = isSubscriber || (tokenBalances[newScenarioId] ?? 0) > 0;
    if (!hasAccess) {
      return; // Shouldn't reach here due to popover disabling, but safety check
    }
    setScenarioType(newScenarioId);
    // Reset form to defaults for new scenario
    setFormData({
      name: "",
      topic: "",
      position: "pro",
      style: "aggressive",
      difficulty: "medium",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?._id) {
      setError("You must be logged in to create an opponent profile");
      return;
    }

    // Validation for required fields
    if (!formData.name?.trim()) {
      setError("Practice partner name is required");
      return;
    }
    if (!formData.topic?.trim()) {
      setError("Topic is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build payload - only include non-empty optional fields
      const payload: Record<string, string | undefined> = {
        name: formData.name.trim(),
        topic: formData.topic.trim(),
        position: formData.position || "pro",
        style: formData.style || "aggressive",
        difficulty: formData.difficulty || "medium",
        scenarioType,
        prepType: scenario?.pipeline?.prepType || "debate",
      };

      // Add all other fields that have values
      Object.entries(formData).forEach(([key, value]) => {
        if (
          !["name", "topic", "position", "style", "difficulty"].includes(key)
        ) {
          if (typeof value === "string" && value.trim()) {
            payload[key] = value.trim();
          }
        }
      });

      const opponentId = await createOpponent(payload as any);

      // Navigate to prep screen with this opponent
      navigate({
        to: "/dashboard/prep",
        search: { opponentId },
      });
    } catch (err) {
      console.error("Error creating opponent:", err);
      setError(err instanceof Error ? err.message : "Failed to create session");
      setIsSubmitting(false);
    }
  };

  // Get form layout from scenario (with fallback for legacy scenarios)
  const formLayout = scenario?.formLayout;
  const hasFormLayout = !!formLayout;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b py-4"
        style={{ backgroundColor: colors.headerBg, borderColor: colors.border }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: colors.textMuted }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logotext.png"
              alt="DebateClub"
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h1
              className="mb-2 text-3xl font-bold lg:text-4xl"
              style={{ color: colors.text, fontFamily: "Georgia, serif" }}
            >
              {isDebate
                ? "Set Up Your Debate"
                : `Create ${scenario?.name || "Practice"} Session`}
            </h1>
            <p style={{ color: colors.textMuted }}>
              {isDebate
                ? "Configure your practice partner and prepare for battle"
                : "Configure your practice session details"}
            </p>
          </div>

          {/* Form Card */}
          <div
            className="overflow-hidden rounded-2xl border-2"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.border,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Core Fields Section */}
              <div
                className="p-6 lg:p-8"
                style={{ borderBottom: `1px solid ${colors.border}` }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Target className="h-5 w-5" style={{ color: "#C8D4B8" }} />
                  </div>
                  <div>
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: colors.text }}
                    >
                      Session Basics
                    </h2>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      Required information for your practice session
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Practice Partner Name (always visible) */}
                  <LabeledInput
                    id="name"
                    label="Practice Partner Name"
                    placeholder="e.g., Tough Prospect, Skeptical Investor, Devil's Advocate"
                    value={formData.name || ""}
                    onChange={(v) => updateField("name", v)}
                  />

                  {/* Core fields from scenario formLayout */}
                  {hasFormLayout ? (
                    <>
                      {formLayout.core.fields.map((fieldKey) => {
                        const fieldConfig = scenario.inputs[fieldKey];
                        if (!fieldConfig || fieldConfig.hidden) return null;

                        // Special handling for position field (styled radio buttons)
                        if (fieldKey === "position") {
                          return (
                            <div key={fieldKey} className="flex flex-col gap-2">
                              <label
                                className="text-sm font-medium"
                                style={{ color: colors.text }}
                              >
                                {fieldConfig.label}
                              </label>
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={() => updateField("position", "pro")}
                                  className={cn(
                                    "flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all",
                                  )}
                                  style={{
                                    backgroundColor:
                                      formData.position === "pro"
                                        ? colors.accent
                                        : "white",
                                    borderColor:
                                      formData.position === "pro"
                                        ? colors.primaryLighter
                                        : colors.border,
                                    color:
                                      formData.position === "pro"
                                        ? colors.accentDark
                                        : colors.textMuted,
                                  }}
                                >
                                  Pro (For the motion)
                                </button>
                                <button
                                  type="button"
                                  onClick={() => updateField("position", "con")}
                                  className={cn(
                                    "flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all",
                                  )}
                                  style={{
                                    backgroundColor:
                                      formData.position === "con"
                                        ? colors.accent
                                        : "white",
                                    borderColor:
                                      formData.position === "con"
                                        ? colors.primaryLighter
                                        : colors.border,
                                    color:
                                      formData.position === "con"
                                        ? colors.accentDark
                                        : colors.textMuted,
                                  }}
                                >
                                  Con (Against the motion)
                                </button>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <FormField
                            key={fieldKey}
                            fieldKey={fieldKey}
                            config={fieldConfig}
                            value={formData[fieldKey] || ""}
                            onChange={(v) => updateField(fieldKey, v)}
                          />
                        );
                      })}
                    </>
                  ) : (
                    /* Fallback for scenarios without formLayout */
                    <>
                      <FormField
                        fieldKey="topic"
                        config={
                          scenario.inputs.topic || {
                            label: "Topic",
                            placeholder: "Enter topic",
                          }
                        }
                        value={formData.topic || ""}
                        onChange={(v) => updateField("topic", v)}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Optional Sections - discreet */}
              {hasFormLayout && formLayout.sections.length > 0 && (
                <div className="px-6 pb-6 lg:px-8 lg:pb-8">
                  <Accordion type="multiple">
                    {formLayout.sections.map((section) => (
                      <AccordionSection
                        key={section.id}
                        section={section}
                        scenario={scenario}
                        formData={formData}
                        updateField={updateField}
                      />
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Hidden fields for style and difficulty */}
              {formLayout?.core.showStyleDifficulty && (
                <>
                  <input
                    type="hidden"
                    name="style"
                    value={formData.style || "aggressive"}
                  />
                  <input
                    type="hidden"
                    name="difficulty"
                    value={formData.difficulty || "medium"}
                  />
                </>
              )}

              {/* Error Display */}
              {error && (
                <div
                  className="mx-6 mb-6 rounded-xl border-2 p-4 lg:mx-8"
                  style={{
                    backgroundColor: "#FEF2F2",
                    borderColor: "#FCA5A5",
                    color: "#DC2626",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div
                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8"
                style={{
                  backgroundColor: colors.background,
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                <ScenarioPopover
                  currentScenario={scenarioType}
                  onScenarioChange={handleScenarioChange}
                  tokenBalances={tokenBalances}
                  isSubscriber={isSubscriber}
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: "/dashboard" })}
                    className="border-2"
                    style={{ borderColor: colors.border }}
                  >
                    Cancel
                  </Button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                    style={{ backgroundColor: colors.primaryLight }}
                  >
                    {isSubmitting ? (
                      "Creating..."
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Start Practice
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
