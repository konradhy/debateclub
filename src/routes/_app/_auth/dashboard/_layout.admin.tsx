import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "~/convex/_generated/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { SCENARIOS } from "@/scenarios";
import { Id } from "~/convex/_generated/dataModel";
import {
  Link as LinkIcon,
  Copy,
  Check,
  X,
  ChartBar,
  Gift,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";

// Color constants matching dashboard
const colors = {
  background: "#F5F3EF",
  cardBg: "#FAFAF8",
  border: "#E8E4DA",
  primary: "#3C4A32",
  primaryLight: "#5C6B4A",
  text: "#2A2A20",
  textMuted: "#5C5C54",
  textLight: "#888880",
  success: "#16a34a",
  error: "#dc2626",
  warning: "#d97706",
};

export const Route = createFileRoute("/_app/_auth/dashboard/_layout/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const navigate = useNavigate();
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const { data: grantLinks } = useQuery(
    convexQuery(api.tokens.getAllGrantLinks, {}),
  );

  // Cost monitoring queries
  const { data: costsByService } = useQuery(
    convexQuery(api.costs.getTotalCostsByService, {}),
  );
  const { data: dailyCosts } = useQuery(
    convexQuery(api.costs.getDailyCosts, { days: 7 }),
  );
  const { data: expensiveDebates } = useQuery(
    convexQuery(api.costs.getMostExpensiveDebates, { limit: 5 }),
  );
  const { data: costsByTopic } = useQuery(
    convexQuery(api.costs.getCostsByTopic, {}),
  );

  // Tab state
  const [activeTab, setActiveTab] = useState<"tokens" | "costs">("tokens");

  const { mutateAsync: createGrantLink, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.tokens.createGrantLink),
  });
  const { mutateAsync: adminGrantTokens, isPending: isGranting } = useMutation({
    mutationFn: useConvexMutation(api.tokens.adminGrantTokens),
  });

  // Form state for creating grant links
  const [newGrantScenario, setNewGrantScenario] = useState("debate");
  const [newGrantAmount, setNewGrantAmount] = useState(10);
  const [newGrantExpiration, setNewGrantExpiration] = useState<number | null>(
    30,
  );
  const [newGrantUtmSource, setNewGrantUtmSource] = useState("");
  const [newGrantUtmCampaign, setNewGrantUtmCampaign] = useState("");

  // Created link modal
  const [createdLink, setCreatedLink] = useState<{
    token: string;
    scenarioId: string;
    amount: number;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Stats modal
  const [selectedGrantId, setSelectedGrantId] = useState<Id<"pendingGrants"> | null>(null);
  const { data: selectedGrantStats } = useQuery(
    convexQuery(
      api.tokens.getGrantLinkStats,
      selectedGrantId ? { grantId: selectedGrantId } : "skip",
    ),
  );

  // Manual grant form
  const [manualEmail, setManualEmail] = useState("");
  const [manualScenario, setManualScenario] = useState("debate");
  const [manualAmount, setManualAmount] = useState(10);
  const [manualReason, setManualReason] = useState<"admin_grant" | "refund">(
    "admin_grant",
  );
  const [manualMessage, setManualMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Redirect non-admins
  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  if (!user?.isAdmin) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <p style={{ color: colors.textMuted }}>Loading...</p>
      </div>
    );
  }

  const handleCreateLink = async () => {
    const result = await createGrantLink({
      scenarioId: newGrantScenario,
      tokenAmount: newGrantAmount,
      expirationDays: newGrantExpiration ?? undefined,
      utmSource: newGrantUtmSource || undefined,
      utmCampaign: newGrantUtmCampaign || undefined,
    });

    if (result.success) {
      setCreatedLink({
        token: result.grantToken,
        scenarioId: newGrantScenario,
        amount: newGrantAmount,
      });
      // Reset form
      setNewGrantUtmSource("");
      setNewGrantUtmCampaign("");
    }
  };

  const handleCopyLink = async () => {
    if (!createdLink) return;
    const url = `${window.location.origin}/claim/${createdLink.token}`;
    await navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleManualGrant = async () => {
    const result = await adminGrantTokens({
      userEmail: manualEmail,
      scenarioId: manualScenario,
      amount: manualAmount,
      reason: manualReason,
    });

    if (result.success) {
      setManualMessage({
        type: "success",
        text: `Granted ${manualAmount} tokens to ${manualEmail}`,
      });
      setManualEmail("");
    } else {
      setManualMessage({
        type: "error",
        text: result.error ?? "Failed to grant tokens",
      });
    }

    setTimeout(() => setManualMessage(null), 3000);
  };

  const activeLinks = grantLinks?.filter((g) => !g.claimed && !g.isExpired) ?? [];
  const totalClaims = grantLinks?.filter((g) => g.claimed).length ?? 0;
  const scenarioList = Object.values(SCENARIOS);

  return (
    <div
      className="min-h-screen flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: colors.text, fontFamily: "Georgia, serif" }}
          >
            Admin Panel
          </h1>

          {/* Tab Navigation */}
          <div className="mt-4 flex gap-1">
            <button
              onClick={() => setActiveTab("tokens")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "tokens"
                ? "text-white"
                : "hover:bg-black/5"
                }`}
              style={{
                backgroundColor: activeTab === "tokens" ? colors.primary : "transparent",
                color: activeTab === "tokens" ? "white" : colors.textMuted,
              }}
            >
              <Gift className="inline h-4 w-4 mr-2" />
              Token Management
            </button>
            <button
              onClick={() => setActiveTab("costs")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "costs"
                ? "text-white"
                : "hover:bg-black/5"
                }`}
              style={{
                backgroundColor: activeTab === "costs" ? colors.primary : "transparent",
                color: activeTab === "costs" ? "white" : colors.textMuted,
              }}
            >
              <DollarSign className="inline h-4 w-4 mr-2" />
              Cost Monitoring
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "tokens" && (
          <div className="flex flex-col gap-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <LinkIcon
                      className="h-5 w-5"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.text }}>
                      {activeLinks.length}
                    </p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      Active Links
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.success}15` }}
                  >
                    <Users className="h-5 w-5" style={{ color: colors.success }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.text }}>
                      {totalClaims}
                    </p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      Total Claims
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Create Grant Link */}
            <div
              className="rounded-xl border-2"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  Create Marketing Grant Link
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      Scenario
                    </label>
                    <select
                      value={newGrantScenario}
                      onChange={(e) => setNewGrantScenario(e.target.value)}
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    >
                      {scenarioList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      Token Amount
                    </label>
                    <input
                      type="number"
                      value={newGrantAmount}
                      onChange={(e) =>
                        setNewGrantAmount(parseInt(e.target.value) || 10)
                      }
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.textMuted }}
                  >
                    Expires In
                  </label>
                  <div className="flex gap-3">
                    {[
                      { label: "30 days", value: 30 },
                      { label: "60 days", value: 60 },
                      { label: "Never", value: null },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setNewGrantExpiration(opt.value)}
                        className="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all"
                        style={{
                          borderColor:
                            newGrantExpiration === opt.value
                              ? colors.primary
                              : colors.border,
                          backgroundColor:
                            newGrantExpiration === opt.value
                              ? `${colors.primary}10`
                              : colors.cardBg,
                          color:
                            newGrantExpiration === opt.value
                              ? colors.primary
                              : colors.text,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      UTM Source (optional)
                    </label>
                    <input
                      type="text"
                      value={newGrantUtmSource}
                      onChange={(e) => setNewGrantUtmSource(e.target.value)}
                      placeholder="instagram"
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      UTM Campaign (optional)
                    </label>
                    <input
                      type="text"
                      value={newGrantUtmCampaign}
                      onChange={(e) => setNewGrantUtmCampaign(e.target.value)}
                      placeholder="winter-launch-2025"
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="flex min-h-14 w-full items-center justify-end rounded-b-xl border-t-2 px-6 py-3"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }}
              >
                <button
                  type="button"
                  className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: colors.primary }}
                  onClick={handleCreateLink}
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Generate Link"}
                </button>
              </div>
            </div>

            {/* Active Grant Links Table */}
            <div
              className="rounded-xl border-2"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  Grant Links
                </h2>

                {grantLinks && grantLinks.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="border-b-2"
                          style={{ borderColor: colors.border }}
                        >
                          <th
                            className="text-left py-2 px-2 font-medium"
                            style={{ color: colors.textMuted }}
                          >
                            Token
                          </th>
                          <th
                            className="text-left py-2 px-2 font-medium"
                            style={{ color: colors.textMuted }}
                          >
                            Scenario
                          </th>
                          <th
                            className="text-left py-2 px-2 font-medium"
                            style={{ color: colors.textMuted }}
                          >
                            Amount
                          </th>
                          <th
                            className="text-left py-2 px-2 font-medium"
                            style={{ color: colors.textMuted }}
                          >
                            Created
                          </th>
                          <th
                            className="text-left py-2 px-2 font-medium"
                            style={{ color: colors.textMuted }}
                          >
                            Status
                          </th>
                          <th
                            className="text-right py-2 px-2 font-medium"
                            style={{ color: colors.textMuted }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {grantLinks.map((grant) => {
                          const scenarioName =
                            SCENARIOS[grant.scenarioId]?.name ?? grant.scenarioId;
                          const isClaimed = grant.claimed;
                          const isExpired = grant.isExpired;

                          let statusLabel = "Active";
                          let statusColor = colors.success;
                          if (isClaimed) {
                            statusLabel = "Claimed";
                            statusColor = colors.primary;
                          } else if (isExpired) {
                            statusLabel = "Expired";
                            statusColor = colors.error;
                          }

                          return (
                            <tr
                              key={grant._id}
                              className="border-b"
                              style={{ borderColor: colors.border }}
                            >
                              <td className="py-3 px-2">
                                <code
                                  className="text-xs rounded px-1.5 py-0.5"
                                  style={{
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                  }}
                                >
                                  {grant.grantToken.slice(0, 8)}...
                                </code>
                              </td>
                              <td
                                className="py-3 px-2"
                                style={{ color: colors.text }}
                              >
                                {scenarioName}
                              </td>
                              <td
                                className="py-3 px-2"
                                style={{ color: colors.text }}
                              >
                                {grant.tokenAmount}
                              </td>
                              <td
                                className="py-3 px-2"
                                style={{ color: colors.textMuted }}
                              >
                                {formatRelativeTime(grant.createdAt)}
                              </td>
                              <td className="py-3 px-2">
                                <span
                                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                                  style={{
                                    backgroundColor: `${statusColor}15`,
                                    color: statusColor,
                                  }}
                                >
                                  {statusLabel}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <div className="flex justify-end gap-1">
                                  {!isClaimed && !isExpired && (
                                    <button
                                      type="button"
                                      className="rounded p-1.5 transition-colors hover:bg-gray-100"
                                      title="Copy Link"
                                      onClick={async () => {
                                        const url = `${window.location.origin}/claim/${grant.grantToken}`;
                                        await navigator.clipboard.writeText(url);
                                      }}
                                    >
                                      <Copy
                                        className="h-4 w-4"
                                        style={{ color: colors.textMuted }}
                                      />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="rounded p-1.5 transition-colors hover:bg-gray-100"
                                    title="View Stats"
                                    onClick={() => setSelectedGrantId(grant._id)}
                                  >
                                    <ChartBar
                                      className="h-4 w-4"
                                      style={{ color: colors.textMuted }}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: colors.textMuted }}>
                    No grant links created yet
                  </p>
                )}
              </div>
            </div>

            {/* Manual Token Grant */}
            <div
              className="rounded-xl border-2"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="p-6">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.text }}
                >
                  Manual Token Grant
                </h2>
                <p className="text-sm mb-4" style={{ color: colors.textMuted }}>
                  Grant tokens directly to a user (for support or testing)
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2">
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      User Email
                    </label>
                    <input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      Scenario
                    </label>
                    <select
                      value={manualScenario}
                      onChange={(e) => setManualScenario(e.target.value)}
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    >
                      {scenarioList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      value={manualAmount}
                      onChange={(e) =>
                        setManualAmount(parseInt(e.target.value) || 10)
                      }
                      className="w-full rounded-lg border-2 px-4 py-2 text-sm"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.cardBg,
                        color: colors.text,
                      }}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.textMuted }}
                    >
                      Reason
                    </label>
                    <div className="flex gap-3">
                      {[
                        { label: "Admin Grant", value: "admin_grant" as const },
                        { label: "Refund", value: "refund" as const },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setManualReason(opt.value)}
                          className="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all"
                          style={{
                            borderColor:
                              manualReason === opt.value
                                ? colors.primary
                                : colors.border,
                            backgroundColor:
                              manualReason === opt.value
                                ? `${colors.primary}10`
                                : colors.cardBg,
                            color:
                              manualReason === opt.value
                                ? colors.primary
                                : colors.text,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {manualMessage && (
                  <div
                    className="mb-4 rounded-lg px-4 py-2 text-sm"
                    style={{
                      backgroundColor:
                        manualMessage.type === "success"
                          ? `${colors.success}15`
                          : `${colors.error}15`,
                      color:
                        manualMessage.type === "success"
                          ? colors.success
                          : colors.error,
                    }}
                  >
                    {manualMessage.text}
                  </div>
                )}
              </div>

              <div
                className="flex min-h-14 w-full items-center justify-end rounded-b-xl border-t-2 px-6 py-3"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }}
              >
                <button
                  type="button"
                  className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: colors.primary }}
                  onClick={handleManualGrant}
                  disabled={isGranting || !manualEmail}
                >
                  {isGranting ? "Granting..." : "Grant Tokens"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "costs" && (
          <>
            {/* Cost Tracking Explanation */}
            <div
              className="rounded-xl border-2 mb-6"
              style={{
                borderColor: colors.primary,
                backgroundColor: `${colors.primary}05`,
              }}
            >
              <div className="p-4">
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  💡 Cost Tracking
                </h3>
                <p className="text-sm" style={{ color: colors.text }}>
                  <strong>OpenRouter & Vapi:</strong> Accurate tracking.{" "}
                  <strong>Firecrawl:</strong> Estimate (~$0.01/search).{" "}
                  <strong>Gemini:</strong> Estimate (~$2.70/session avg from Dec 2025 billing).
                </p>
              </div>
            </div>

            {/* External Verification Links */}
            <div
              className="rounded-xl border-2 mb-6"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.cardBg,
              }}
            >
              <div className="p-4">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: colors.text }}
                >
                  🔍 Verify Costs Externally
                </h3>
                <p className="text-xs mb-4" style={{ color: colors.textMuted }}>
                  Cross-reference our tracking with the official service dashboards
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* OpenRouter */}
                  <a
                    href="https://openrouter.ai/activity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-lg border-2 p-3 transition-all hover:border-opacity-70"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: colors.text }}>
                      OpenRouter
                    </span>
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      Filter by referer: <code className="px-1 rounded" style={{ backgroundColor: `${colors.primary}10` }}>debateclub.app/[phase]</code>
                    </span>
                  </a>

                  {/* Vapi */}
                  <a
                    href="https://dashboard.vapi.ai/calls"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-lg border-2 p-3 transition-all hover:border-opacity-70"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: colors.text }}>
                      Vapi
                    </span>
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      View call history & durations
                    </span>
                  </a>

                  {/* Firecrawl */}
                  <a
                    href="https://www.firecrawl.dev/app/usage?view=weekly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-lg border-2 p-3 transition-all hover:border-opacity-70"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: colors.text }}>
                      Firecrawl
                    </span>
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      Weekly usage breakdown
                    </span>
                  </a>

                  {/* Gemini (Google AI Studio) */}
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-lg border-2 p-3 transition-all hover:border-opacity-70"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    }}
                  >
                    <span className="text-sm font-medium" style={{ color: colors.text }}>
                      Google AI Studio
                    </span>
                    <span className="text-xs" style={{ color: colors.textMuted }}>
                      Gemini API usage & billing
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Cost Overview Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.primary}15` }}
                  >
                    <DollarSign
                      className="h-5 w-5"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.text }}>
                      ${costsByService ? (costsByService.reduce((sum, s) => sum + s.totalCost, 0) / 100).toFixed(2) : "0.00"}
                    </p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      Total Costs
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.warning}15` }}
                  >
                    <Activity
                      className="h-5 w-5"
                      style={{ color: colors.warning }}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.text }}>
                      {costsByService ? costsByService.reduce((sum, s) => sum + s.count, 0) : 0}
                    </p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      API Calls
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.success}15` }}
                  >
                    <TrendingUp
                      className="h-5 w-5"
                      style={{ color: colors.success }}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.text }}>
                      ${dailyCosts && dailyCosts.length > 0 ? (dailyCosts[0].totalCost / 100).toFixed(2) : "0.00"}
                    </p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      Today's Costs
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-xl border-2 p-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.error}15` }}
                  >
                    <ChartBar
                      className="h-5 w-5"
                      style={{ color: colors.error }}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: colors.text }}>
                      ${expensiveDebates && expensiveDebates.length > 0 ? (expensiveDebates[0].totalCost / 100).toFixed(2) : "0.00"}
                    </p>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      Highest Debate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Service Breakdown */}
              <div
                className="rounded-xl border-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="p-6">
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: colors.text }}
                  >
                    Cost by Service
                  </h2>

                  {costsByService && costsByService.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr
                            className="border-b-2"
                            style={{ borderColor: colors.border }}
                          >
                            <th
                              className="text-left py-2 px-2 font-medium"
                              style={{ color: colors.textMuted }}
                            >
                              Service
                            </th>
                            <th
                              className="text-left py-2 px-2 font-medium"
                              style={{ color: colors.textMuted }}
                            >
                              Total Cost
                            </th>
                            <th
                              className="text-left py-2 px-2 font-medium"
                              style={{ color: colors.textMuted }}
                            >
                              API Calls
                            </th>
                            <th
                              className="text-left py-2 px-2 font-medium"
                              style={{ color: colors.textMuted }}
                            >
                              Avg Cost/Call
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {costsByService.map((service) => (
                            <tr
                              key={service.service}
                              className="border-b"
                              style={{ borderColor: colors.border }}
                            >
                              <td className="py-3 px-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="capitalize font-medium"
                                    style={{ color: colors.text }}
                                  >
                                    {getServiceDisplayName(service.service)}
                                  </span>
                                  {isEstimatedService(service.service) && (
                                    <span
                                      className="text-xs px-2 py-0.5 rounded-full"
                                      style={{
                                        backgroundColor: `${colors.warning}15`,
                                        color: colors.warning,
                                      }}
                                    >
                                      ESTIMATE
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td
                                className="py-3 px-2 font-mono"
                                style={{ color: colors.text }}
                              >
                                ${(service.totalCost / 100).toFixed(2)}
                              </td>
                              <td
                                className="py-3 px-2"
                                style={{ color: colors.text }}
                              >
                                {service.count.toLocaleString()}
                              </td>
                              <td
                                className="py-3 px-2 font-mono"
                                style={{ color: colors.textMuted }}
                              >
                                ${((service.totalCost / service.count) / 100).toFixed(4)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      No cost data available yet
                    </p>
                  )}
                </div>
              </div>

              {/* Costs by Topic/Workflow */}
              <div
                className="rounded-xl border-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="p-6">
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: colors.text }}
                  >
                    Costs by Topic/Workflow
                  </h2>
                  <p className="text-sm mb-4" style={{ color: colors.textMuted }}>
                    Total cost for each debate topic including research, prep, debates, and analysis
                  </p>

                  {costsByTopic && costsByTopic.length > 0 ? (
                    <div className="space-y-4">
                      {costsByTopic.slice(0, 10).map((topic) => (
                        <div
                          key={topic.opponentId}
                          className="rounded-lg border p-4"
                          style={{
                            borderColor: colors.border,
                            backgroundColor: colors.background,
                          }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-medium mb-1" style={{ color: colors.text }}>
                                {topic.topic}
                              </h3>
                              <p className="text-sm" style={{ color: colors.textMuted }}>
                                vs {topic.opponentName} • {topic.debateCount} debate{topic.debateCount !== 1 ? 's' : ''}
                              </p>
                              <p className="text-xs" style={{ color: colors.textLight }}>
                                Last activity: {new Date(topic.lastActivity).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold font-mono" style={{ color: colors.text }}>
                                ${(topic.totalCost / 100).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Phase Breakdown */}
                          <div className="mb-3">
                            <p className="text-xs font-medium mb-2" style={{ color: colors.textMuted }}>
                              By Phase:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {topic.phaseBreakdown.map((phase) => (
                                <span
                                  key={phase.phase}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{
                                    backgroundColor: getPhaseColor(phase.phase),
                                    color: colors.text,
                                  }}
                                >
                                  {getPhaseDisplayName(phase.phase)}: ${(phase.cost / 100).toFixed(2)}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Service Breakdown */}
                          <div>
                            <p className="text-xs font-medium mb-2" style={{ color: colors.textMuted }}>
                              By Service:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {topic.serviceBreakdown.map((service) => (
                                <span
                                  key={service.service}
                                  className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                  style={{
                                    backgroundColor: `${colors.primary}15`,
                                    color: colors.primary,
                                  }}
                                >
                                  {getServiceDisplayName(service.service)}: ${(service.cost / 100).toFixed(2)}
                                  {isEstimatedService(service.service) && (
                                    <span className="text-xs" style={{ color: colors.warning }}>~</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      No topic cost data available yet
                    </p>
                  )}
                </div>
              </div>

              {/* Most Expensive Items */}
              <div
                className="rounded-xl border-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="p-6">
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: colors.text }}
                  >
                    Most Expensive Sessions
                  </h2>

                  {expensiveDebates && expensiveDebates.length > 0 ? (
                    <div className="space-y-3">
                      {expensiveDebates.map((item, index) => (
                        <div
                          key={item.debateId || item.opponentId || `item-${index}`}
                          className="rounded-lg border p-4"
                          style={{
                            borderColor: colors.border,
                            backgroundColor: colors.background,
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {item.debateId ? (
                                  <a
                                    href={`/dashboard/analysis/${item.debateId}`}
                                    className="font-medium hover:underline"
                                    style={{ color: colors.primary }}
                                  >
                                    🎤 {item.title || "Debate"}
                                  </a>
                                ) : (
                                  <p className="font-medium" style={{ color: colors.text }}>
                                    🔬 {item.title || "Prep Session"}
                                  </p>
                                )}
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: item.type === "debate" ? `${colors.success}15` : `${colors.warning}15`,
                                    color: item.type === "debate" ? colors.success : colors.warning,
                                  }}
                                >
                                  {item.type === "debate" ? "DEBATE" : "PREP"}
                                </span>
                              </div>
                              {(item.opponentName || item.scenarioName) && (
                                <p className="text-sm" style={{ color: colors.textMuted }}>
                                  {item.opponentName && `vs ${item.opponentName}`}
                                  {item.opponentName && item.scenarioName && " • "}
                                  {item.scenarioName}
                                </p>
                              )}
                              <p className="text-xs" style={{ color: colors.textLight }}>
                                {new Date(item.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold font-mono" style={{ color: colors.text }}>
                                ${(item.totalCost / 100).toFixed(2)}
                              </span>
                              <p className="text-xs" style={{ color: colors.textMuted }}>#{index + 1}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.serviceBreakdown.map((service) => (
                              <span
                                key={service.service}
                                className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                                style={{
                                  backgroundColor: `${colors.primary}15`,
                                  color: colors.primary,
                                }}
                              >
                                {getServiceDisplayName(service.service)}: ${(service.cost / 100).toFixed(2)}
                                {isEstimatedService(service.service) && (
                                  <span className="text-xs" style={{ color: colors.warning }}>~</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      No cost data available yet
                    </p>
                  )}
                </div>
              </div>

              {/* Daily Costs Trend */}
              <div
                className="rounded-xl border-2"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                }}
              >
                <div className="p-6">
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: colors.text }}
                  >
                    Daily Costs (Last 7 Days)
                  </h2>

                  {dailyCosts && dailyCosts.length > 0 ? (
                    <div className="space-y-2">
                      {dailyCosts.map((day) => (
                        <div
                          key={day.date}
                          className="flex justify-between items-center py-2 px-3 rounded-lg"
                          style={{ backgroundColor: colors.background }}
                        >
                          <span style={{ color: colors.text }}>
                            {new Date(day.date).toLocaleDateString()}
                          </span>
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                              {day.serviceBreakdown.map((service) => (
                                <span
                                  key={service.service}
                                  className="text-xs px-2 py-1 rounded flex items-center gap-1"
                                  style={{
                                    backgroundColor: `${colors.textMuted}15`,
                                    color: colors.textMuted,
                                  }}
                                >
                                  {getServiceDisplayName(service.service)}: ${(service.cost / 100).toFixed(2)}
                                  {isEstimatedService(service.service) && (
                                    <span
                                      className="text-xs"
                                      style={{ color: colors.warning }}
                                    >
                                      ~
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                            <span
                              className="font-mono font-medium"
                              style={{ color: colors.text }}
                            >
                              ${(day.totalCost / 100).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      No daily cost data available yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Created Link Modal */}
        {createdLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
              className="mx-4 w-full max-w-md rounded-xl p-6"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors.success}15` }}
                  >
                    <Check
                      className="h-5 w-5"
                      style={{ color: colors.success }}
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: colors.text }}
                  >
                    Link Created!
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCreatedLink(null)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" style={{ color: colors.textMuted }} />
                </button>
              </div>

              <p className="text-sm mb-4" style={{ color: colors.textMuted }}>
                This link grants{" "}
                <strong style={{ color: colors.text }}>
                  {createdLink.amount} tokens
                </strong>{" "}
                for{" "}
                <strong style={{ color: colors.text }}>
                  {SCENARIOS[createdLink.scenarioId]?.name ?? createdLink.scenarioId}
                </strong>
              </p>

              <div
                className="rounded-lg border-2 p-3 mb-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                }}
              >
                <code
                  className="text-xs break-all"
                  style={{ color: colors.text }}
                >
                  {window.location.origin}/claim/{createdLink.token}
                </code>
              </div>

              <button
                type="button"
                className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
                onClick={handleCopyLink}
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Stats Modal */}
        {selectedGrantId && selectedGrantStats && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
              className="mx-4 w-full max-w-md rounded-xl p-6"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: colors.text }}
                >
                  Link Statistics
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedGrantId(null)}
                  className="rounded p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" style={{ color: colors.textMuted }} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: colors.textMuted }}>Scenario</span>
                  <span style={{ color: colors.text }}>
                    {SCENARIOS[selectedGrantStats.grant.scenarioId]?.name ??
                      selectedGrantStats.grant.scenarioId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textMuted }}>Token Amount</span>
                  <span style={{ color: colors.text }}>
                    {selectedGrantStats.grant.tokenAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: colors.textMuted }}>Created</span>
                  <span style={{ color: colors.text }}>
                    {new Date(
                      selectedGrantStats.grant.createdAt,
                    ).toLocaleDateString()}
                  </span>
                </div>
                {selectedGrantStats.grant.expiresAt && (
                  <div className="flex justify-between">
                    <span style={{ color: colors.textMuted }}>Expires</span>
                    <span style={{ color: colors.text }}>
                      {new Date(
                        selectedGrantStats.grant.expiresAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {selectedGrantStats.grant.utmSource && (
                  <div className="flex justify-between">
                    <span style={{ color: colors.textMuted }}>UTM Source</span>
                    <span style={{ color: colors.text }}>
                      {selectedGrantStats.grant.utmSource}
                    </span>
                  </div>
                )}
                {selectedGrantStats.grant.utmCampaign && (
                  <div className="flex justify-between">
                    <span style={{ color: colors.textMuted }}>UTM Campaign</span>
                    <span style={{ color: colors.text }}>
                      {selectedGrantStats.grant.utmCampaign}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: colors.textMuted }}>Status</span>
                  <span
                    style={{
                      color: selectedGrantStats.grant.claimed
                        ? colors.primary
                        : colors.success,
                    }}
                  >
                    {selectedGrantStats.grant.claimed ? "Claimed" : "Active"}
                  </span>
                </div>

                {selectedGrantStats.claimer && (
                  <>
                    <div
                      className="border-t pt-3 mt-3"
                      style={{ borderColor: colors.border }}
                    >
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: colors.text }}
                      >
                        Claimed By
                      </p>
                      <p className="text-sm" style={{ color: colors.textMuted }}>
                        {selectedGrantStats.claimer.email ?? "Unknown user"}
                      </p>
                      {selectedGrantStats.claimer.claimedAt && (
                        <p
                          className="text-xs"
                          style={{ color: colors.textLight }}
                        >
                          {new Date(
                            selectedGrantStats.claimer.claimedAt,
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50"
                style={{
                  borderColor: colors.border,
                  color: colors.text,
                }}
                onClick={() => setSelectedGrantId(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Format timestamp as relative time (e.g., "2d ago", "1w ago")
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

/**
 * Check if a service uses estimated costs vs accurate tracking
 */
function isEstimatedService(service: string): boolean {
  return service === "firecrawl" || service === "gemini";
}

/**
 * Get service display name with estimation indicator
 */
function getServiceDisplayName(service: string): string {
  const names: Record<string, string> = {
    openrouter: "OpenRouter",
    vapi: "Vapi",
    firecrawl: "Firecrawl",
    gemini: "Gemini",
  };

  const baseName = names[service] || service;
  return isEstimatedService(service) ? `${baseName} (Est.)` : baseName;
}

/**
 * Get phase display name
 */
function getPhaseDisplayName(phase: string): string {
  const names: Record<string, string> = {
    research: "Research",
    prep: "Prep",
    debate: "Debate",
    analysis: "Analysis",
    unknown: "Unknown",
  };
  return names[phase] || phase;
}

/**
 * Get phase color for visual distinction
 */
function getPhaseColor(phase: string): string {
  const phaseColors: Record<string, string> = {
    research: "#3B82F615", // Blue
    prep: "#10B98115", // Emerald
    debate: "#F59E0B15", // Amber
    analysis: "#8B5CF615", // Purple
    unknown: "#6B728015", // Gray
  };
  return phaseColors[phase] || phaseColors.unknown;
}

