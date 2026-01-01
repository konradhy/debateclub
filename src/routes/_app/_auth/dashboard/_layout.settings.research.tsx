import { createFileRoute } from "@tanstack/react-router";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "~/convex/_generated/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// Color constants matching dashboard
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
};

export const Route = createFileRoute(
  "/_app/_auth/dashboard/_layout/settings/research"
)({
  component: ResearchSettings,
  beforeLoad: () => ({
    title: "Research Settings",
    headerTitle: "Research Settings",
    headerDescription: "Configure how thoroughly AI researches your debates.",
  }),
});

type ResearchIntensity = "basic" | "aggressive" | "deep";

export default function ResearchSettings() {
  const { data: settings } = useQuery(
    convexQuery(api.app.getResearchSettings, {})
  );
  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: useConvexMutation(api.app.updateResearchSettings),
  });

  const [intensity, setIntensity] = useState<ResearchIntensity>("aggressive");
  const [articlesPerSearch, setArticlesPerSearch] = useState(5);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when settings load
  useEffect(() => {
    if (settings) {
      setIntensity(settings.researchIntensity as ResearchIntensity);
      setArticlesPerSearch(settings.articlesPerSearch);
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        researchIntensity: intensity,
        articlesPerSearch,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const intensityOptions = [
    {
      value: "basic" as const,
      label: "Basic",
      description: "Quick prep (2-3 searches)",
    },
    {
      value: "aggressive" as const,
      label: "Aggressive",
      description: "Standard depth (5-7 searches)",
    },
    {
      value: "deep" as const,
      label: "Deep",
      description: "Exhaustive research (10+ searches)",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: colors.text, fontFamily: "Georgia, serif" }}
          >
            Research Settings
          </h1>
          <p className="mt-1" style={{ color: colors.textMuted }}>
            Control how thoroughly AI researches your debate topics
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Research Intensity (Primary Control) */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="p-6">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Research Intensity
              </h2>
              <p className="text-sm mb-6" style={{ color: colors.textMuted }}>
                Choose how many searches the AI performs when researching your topic
              </p>

              <div className="flex flex-col gap-3">
                {intensityOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-sm"
                    style={{
                      borderColor:
                        intensity === option.value
                          ? colors.primary
                          : colors.border,
                      backgroundColor:
                        intensity === option.value
                          ? `${colors.primary}08`
                          : colors.background,
                    }}
                  >
                    <input
                      type="radio"
                      name="intensity"
                      value={option.value}
                      checked={intensity === option.value}
                      onChange={(e) =>
                        setIntensity(e.target.value as ResearchIntensity)
                      }
                      className="mt-0.5"
                      style={{ accentColor: colors.primary }}
                    />
                    <div className="flex-1">
                      <div
                        className="font-medium"
                        style={{ color: colors.text }}
                      >
                        {option.label}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: colors.textMuted }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div
              className="flex min-h-14 w-full items-center justify-between rounded-b-xl border-t-2 px-6 py-3"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <p className="text-sm" style={{ color: colors.textMuted }}>
                More searches = more diverse sources and deeper analysis
              </p>
              <button
                type="button"
                className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50"
                style={{ backgroundColor: colors.primary }}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Advanced Settings (Ghost/De-emphasized) */}
          <div
            className="rounded-xl border-2"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.cardBg,
              opacity: showAdvanced ? 1 : 0.7,
            }}
          >
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-6 text-left"
            >
              <h2
                className="text-lg font-medium flex items-center gap-2"
                style={{ color: colors.textMuted }}
              >
                Advanced Settings
                <span className="text-sm">
                  {showAdvanced ? "▼" : "▶"}
                </span>
              </h2>
            </button>

            {showAdvanced && (
              <div className="px-6 pb-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm" style={{ color: colors.textMuted }}>
                    Articles per search
                  </label>
                  <select
                    value={articlesPerSearch}
                    onChange={(e) =>
                      setArticlesPerSearch(Number(e.target.value))
                    }
                    className="w-40 rounded-lg border-2 px-3 py-2 text-sm"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                      color: colors.text,
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={10}>10</option>
                  </select>
                  <p
                    className="text-xs"
                    style={{ color: colors.textLight }}
                  >
                    Only adjust if Research Intensity isn't giving enough sources.
                    Higher values increase cost and time.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
