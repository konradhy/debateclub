import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useConvexAuth } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import { Loader2, Gift, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { SCENARIOS } from "@/scenarios";

export const Route = createFileRoute("/_app/claim/$token")({
  component: ClaimPage,
});

/**
 * Marketing funnel claim page.
 *
 * User journey:
 * 1. Click marketing link (e.g., /claim/xyz789)
 * 2. If not logged in: See offer, store token in sessionStorage, redirect to signup
 * 3. If logged in: Auto-claim tokens, redirect to opponent-profile for that scenario
 */
function ClaimPage() {
  const { token } = Route.useParams();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const navigate = useNavigate();

  // Query grant token validity
  const { data: grantInfo, isLoading: grantLoading } = useQuery(
    convexQuery(api.tokens.checkGrantToken, { grantToken: token })
  );

  // Claim mutation
  const claimMutation = useConvexMutation(api.tokens.claimGrant);

  const [claimStatus, setClaimStatus] = useState<
    "idle" | "claiming" | "success" | "error"
  >("idle");
  const [claimError, setClaimError] = useState<string | null>(null);

  // Get scenario info for display
  const scenarioConfig = grantInfo?.scenarioId
    ? SCENARIOS[grantInfo.scenarioId]
    : null;

  // Auto-claim when authenticated and grant is valid
  useEffect(() => {
    if (
      isAuthenticated &&
      grantInfo?.valid &&
      claimStatus === "idle" &&
      !grantLoading
    ) {
      setClaimStatus("claiming");

      claimMutation
        .mutateAsync({ grantToken: token })
        .then((result) => {
          if (result.success) {
            setClaimStatus("success");
            // Clear any stored token
            sessionStorage.removeItem("pendingGrantToken");
            // Redirect to opponent-profile for this scenario
            setTimeout(() => {
              navigate({
                to: "/dashboard/opponent-profile",
                search: { scenario: result.scenarioId },
              });
            }, 1500);
          } else {
            setClaimStatus("error");
            setClaimError(
              getErrorMessage(result.error || "unknown_error")
            );
          }
        })
        .catch((err) => {
          setClaimStatus("error");
          setClaimError(err.message || "Failed to claim tokens");
        });
    }
  }, [isAuthenticated, grantInfo, claimStatus, grantLoading, token]);

  // Loading state
  if (authLoading || grantLoading) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#3C4A32] mx-auto mb-4" />
          <p className="text-[#5C5C54]">Loading...</p>
        </div>
      </div>
    );
  }

  // Invalid grant
  if (!grantInfo?.valid) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2A2A20] mb-2">
            Invalid or Expired Link
          </h1>
          <p className="text-[#5C5C54] mb-6">
            {getErrorMessage(grantInfo?.error || "not_found")}
          </p>
          <Link to="/">
            <Button className="bg-[#3C4A32] hover:bg-[#5C6B4A] text-white">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Claiming state
  if (claimStatus === "claiming") {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#3C4A32] mx-auto mb-4" />
          <p className="text-[#5C5C54]">Claiming your free tokens...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (claimStatus === "success") {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2A2A20] mb-2">
            Tokens Claimed!
          </h1>
          <p className="text-[#5C5C54] mb-4">
            You've received {grantInfo.tokenAmount} free practice sessions.
          </p>
          <p className="text-sm text-[#888880]">
            Redirecting to setup your practice session...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (claimStatus === "error") {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#2A2A20] mb-2">
            Couldn't Claim Tokens
          </h1>
          <p className="text-[#5C5C54] mb-6">{claimError}</p>
          <Link to="/dashboard">
            <Button className="bg-[#3C4A32] hover:bg-[#5C6B4A] text-white">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Not authenticated - show signup prompt
  if (!isAuthenticated) {
    // Store token for after signup
    sessionStorage.setItem("pendingGrantToken", token);

    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8DFC8] mb-4">
              <Gift className="h-8 w-8 text-[#3C4A32]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2A2A20] mb-2">
              You've Been Invited!
            </h1>
            <p className="text-[#5C5C54]">
              Sign up to claim your free practice sessions
            </p>
          </div>

          <div className="bg-[#F5F3EF] rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[#5C5C54]">
                Free Tokens
              </span>
              <span className="text-2xl font-bold text-[#3C4A32]">
                {grantInfo.tokenAmount}
              </span>
            </div>

            {scenarioConfig && (
              <div className="border-t border-[#E8E4DA] pt-4">
                <span className="text-sm font-medium text-[#5C5C54]">
                  Scenario
                </span>
                <p className="text-[#2A2A20] font-medium mt-1">
                  {scenarioConfig.name}
                </p>
                {scenarioConfig.description && (
                  <p className="text-sm text-[#5C5C54] mt-1">
                    {scenarioConfig.description}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Link to="/login" className="block">
              <Button className="w-full bg-[#3C4A32] hover:bg-[#5C6B4A] text-white">
                Sign Up to Claim
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-center text-sm text-[#888880]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#3C4A32] hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </div>

          <p className="text-xs text-center text-[#888880] mt-6">
            Each token grants you one practice session. Prep materials are
            always free.
          </p>
        </div>
      </div>
    );
  }

  // Fallback loading (shouldn't reach here normally)
  return (
    <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#3C4A32]" />
    </div>
  );
}

/**
 * Converts error codes to user-friendly messages.
 */
function getErrorMessage(error: string): string {
  switch (error) {
    case "not_found":
      return "This link doesn't exist or has already been used.";
    case "already_claimed":
      return "This offer has already been claimed by someone.";
    case "expired":
      return "This offer has expired. Contact us for a new link.";
    case "already_claimed_scenario":
      return "You've already claimed free tokens for this scenario.";
    case "not_authenticated":
      return "Please sign in to claim your tokens.";
    default:
      return "Something went wrong. Please try again or contact support.";
  }
}

