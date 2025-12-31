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
  Clock,
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

  const { mutateAsync: createGrantLink, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.tokens.createGrantLink),
  });
  const { mutateAsync: deactivateGrant } = useMutation({
    mutationFn: useConvexMutation(api.tokens.deactivateGrant),
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
          <p className="mt-1" style={{ color: colors.textMuted }}>
            Token Management
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
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

        <div className="flex flex-col gap-6">
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
      </div>

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

