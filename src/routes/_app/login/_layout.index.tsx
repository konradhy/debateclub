import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from "react";
import { Route as OnboardingUsernameRoute } from "@/routes/_app/_auth/onboarding/_layout.username";
import { Route as DashboardRoute } from "@/routes/_app/_auth/dashboard/_layout.index";
import { useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexAuth } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";

export const Route = createFileRoute("/_app/login/_layout/")({
  component: Login,
});

type Step =
  | "signIn"
  | "signUp"
  | { email: string; flow: "verify" }
  | "forgotPassword"
  | { email: string; flow: "resetPassword" };

/**
 * Map auth error messages to user-friendly text.
 * Convex auth errors come as server errors containing internal codes like "InvalidSecret".
 */
function getAuthErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("InvalidSecret")) {
    return "Invalid email or password";
  }
  if (
    message.includes("InvalidAccountId") ||
    message.includes("account was not found")
  ) {
    return "No account found with this email";
  }
  if (message.includes("InvalidCode") || message.includes("invalid code")) {
    return "Invalid verification code";
  }
  if (message.includes("TooManyFailedAttempts")) {
    return "Too many failed attempts. Please try again later";
  }
  if (
    message.includes("EmailAlreadyInUse") ||
    message.includes("already exists")
  ) {
    return "An account with this email already exists";
  }

  return "Authentication failed. Please try again";
}

function Login() {
  const [step, setStep] = useState<Step>("signIn");
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const navigate = useNavigate();

  useEffect(() => {
    if ((isLoading && !isAuthenticated) || !user) {
      return;
    }
    if (!isLoading && isAuthenticated && !user.username) {
      navigate({ to: OnboardingUsernameRoute.fullPath });
      return;
    }
    if (!isLoading && isAuthenticated) {
      navigate({ to: DashboardRoute.fullPath });
      return;
    }
  }, [user, isLoading, isAuthenticated, navigate]);

  if (step === "signIn" || step === "signUp") {
    return (
      <SignInForm
        flow={step}
        onToggle={() => setStep(step === "signIn" ? "signUp" : "signIn")}
        onForgotPassword={() => setStep("forgotPassword")}
        onVerify={(email) => setStep({ email, flow: "verify" })}
      />
    );
  }

  if (step === "forgotPassword") {
    return (
      <ForgotPasswordForm
        onCancel={() => setStep("signIn")}
        onCodeSent={(email) => setStep({ email, flow: "resetPassword" })}
      />
    );
  }

  if (typeof step === "object" && step.flow === "verify") {
    return (
      <VerifyEmailForm email={step.email} onCancel={() => setStep("signIn")} />
    );
  }

  if (typeof step === "object" && step.flow === "resetPassword") {
    return (
      <ResetPasswordForm
        email={step.email}
        onCancel={() => setStep("signIn")}
      />
    );
  }

  return null;
}

function SignInForm({
  flow,
  onToggle,
  onForgotPassword,
  onVerify,
}: {
  flow: "signIn" | "signUp";
  onToggle: () => void;
  onForgotPassword: () => void;
  onVerify: (email: string) => void;
}) {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("email", value.email);
        formData.append("password", value.password);
        formData.append("flow", flow);

        // For sign-up, always redirect to verification after sending email
        if (flow === "signUp") {
          await signIn("password", formData);
          // Always show verification form for new sign-ups
          onVerify(value.email);
        } else {
          // For sign-in, only show verification if not immediately successful
          const result = await signIn("password", formData);
          if (!result) {
            onVerify(value.email);
          }
        }
      } catch (err) {
        setError(getAuthErrorMessage(err));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="mb-2 flex flex-col gap-2">
        <h3 className="text-center text-2xl font-medium text-primary">
          {flow === "signIn" ? "Welcome back" : "Create your account"}
        </h3>
        <p className="text-center text-base font-normal text-primary/60">
          {flow === "signIn"
            ? "Sign in to continue to DebateClub"
            : "Start preparing for your debates"}
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <form.Field
            name="email"
            validators={{
              onSubmit: z
                .string()
                .max(256)
                .email("Email address is not valid."),
            }}
            children={(field) => (
              <Input
                placeholder="Email"
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                  }`}
              />
            )}
          />
          <form.Subscribe
            selector={(state) => state.fieldMeta.email?.errors}
            children={(errors) =>
              errors && errors.length > 0 ? (
                <span className="text-sm text-destructive dark:text-destructive-foreground">
                  {errors.join(" ")}
                </span>
              ) : null
            }
          />
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <form.Field
            name="password"
            validators={{
              onSubmit: z
                .string()
                .min(8, "Password must be at least 8 characters."),
            }}
            children={(field) => (
              <Input
                placeholder="Password"
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                  }`}
              />
            )}
          />
          <form.Subscribe
            selector={(state) => state.fieldMeta.password?.errors}
            children={(errors) =>
              errors && errors.length > 0 ? (
                <span className="text-sm text-destructive dark:text-destructive-foreground">
                  {errors.join(" ")}
                </span>
              ) : null
            }
          />
        </div>

        {error && (
          <span className="text-sm text-destructive dark:text-destructive-foreground">
            {error}
          </span>
        )}

        {flow === "signIn" && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary/60 hover:text-primary"
          >
            Forgot password?
          </button>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : flow === "signIn" ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </Button>

        <button
          type="button"
          onClick={onToggle}
          className="w-full text-sm text-primary/60 hover:text-primary"
        >
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </form>

      <div className="relative flex w-full items-center justify-center">
        <span className="absolute w-full border-b border-border" />
        <span className="z-10 bg-card px-2 text-xs font-medium uppercase text-primary/60">
          Or continue with
        </span>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="w-full gap-2 bg-transparent border-border hover:bg-muted"
          onClick={() => signIn("google", { redirectTo: "/login" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </div>

      <p className="px-12 text-center text-sm font-normal leading-normal text-primary/60">
        By clicking continue, you agree to our{" "}
        <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and{" "}
        <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
}

function VerifyEmailForm({
  email,
  onCancel,
}: {
  email: string;
  onCancel: () => void;
}) {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("code", value.code);
        formData.append("flow", "email-verification");

        await signIn("password", formData);
      } catch (err) {
        setError(getAuthErrorMessage(err));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="mb-2 flex flex-col gap-2">
        <p className="text-center text-2xl text-primary">Check your inbox!</p>
        <p className="text-center text-base font-normal text-primary/60">
          We've sent a verification code to
          <br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="code" className="sr-only">
            Verification Code
          </label>
          <form.Field
            name="code"
            validators={{
              onSubmit: z
                .string()
                .min(8, "Code must be at least 8 characters."),
            }}
            children={(field) => (
              <Input
                placeholder="Verification Code"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                  }`}
              />
            )}
          />
          <form.Subscribe
            selector={(state) => state.fieldMeta.code?.errors}
            children={(errors) =>
              errors && errors.length > 0 ? (
                <span className="text-sm text-destructive dark:text-destructive-foreground">
                  {errors.join(" ")}
                </span>
              ) : null
            }
          />
        </div>

        {error && (
          <span className="text-sm text-destructive dark:text-destructive-foreground">
            {error}
          </span>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify Email"}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          className="w-full"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

function ForgotPasswordForm({
  onCancel,
  onCodeSent,
}: {
  onCancel: () => void;
  onCodeSent: (email: string) => void;
}) {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("email", value.email);
        formData.append("flow", "reset");

        await signIn("password", formData);
        onCodeSent(value.email);
      } catch (err) {
        setError(getAuthErrorMessage(err));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="mb-2 flex flex-col gap-2">
        <p className="text-center text-2xl text-primary">Reset your password</p>
        <p className="text-center text-base font-normal text-primary/60">
          Enter your email and we'll send you a reset code
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <form.Field
            name="email"
            validators={{
              onSubmit: z
                .string()
                .max(256)
                .email("Email address is not valid."),
            }}
            children={(field) => (
              <Input
                placeholder="Email"
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                  }`}
              />
            )}
          />
          <form.Subscribe
            selector={(state) => state.fieldMeta.email?.errors}
            children={(errors) =>
              errors && errors.length > 0 ? (
                <span className="text-sm text-destructive dark:text-destructive-foreground">
                  {errors.join(" ")}
                </span>
              ) : null
            }
          />
        </div>

        {error && (
          <span className="text-sm text-destructive dark:text-destructive-foreground">
            {error}
          </span>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Send Reset Code"
          )}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          className="w-full"
        >
          Back to Sign In
        </Button>
      </form>
    </div>
  );
}

function ResetPasswordForm({
  email,
  onCancel,
}: {
  email: string;
  onCancel: () => void;
}) {
  const { signIn } = useAuthActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      code: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("code", value.code);
        formData.append("newPassword", value.newPassword);
        formData.append("flow", "reset-verification");

        await signIn("password", formData);
      } catch (err) {
        setError(getAuthErrorMessage(err));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="mb-2 flex flex-col gap-2">
        <p className="text-center text-2xl text-primary">Enter reset code</p>
        <p className="text-center text-base font-normal text-primary/60">
          Check your email for the verification code
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="code" className="sr-only">
            Reset Code
          </label>
          <form.Field
            name="code"
            validators={{
              onSubmit: z
                .string()
                .min(8, "Code must be at least 8 characters."),
            }}
            children={(field) => (
              <Input
                placeholder="Reset Code"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                  }`}
              />
            )}
          />
          <form.Subscribe
            selector={(state) => state.fieldMeta.code?.errors}
            children={(errors) =>
              errors && errors.length > 0 ? (
                <span className="text-sm text-destructive dark:text-destructive-foreground">
                  {errors.join(" ")}
                </span>
              ) : null
            }
          />
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="newPassword" className="sr-only">
            New Password
          </label>
          <form.Field
            name="newPassword"
            validators={{
              onSubmit: z
                .string()
                .min(8, "Password must be at least 8 characters."),
            }}
            children={(field) => (
              <Input
                placeholder="New Password"
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`bg-transparent ${field.state.meta?.errors.length > 0 &&
                  "border-destructive focus-visible:ring-destructive"
                  }`}
              />
            )}
          />
          <form.Subscribe
            selector={(state) => state.fieldMeta.newPassword?.errors}
            children={(errors) =>
              errors && errors.length > 0 ? (
                <span className="text-sm text-destructive dark:text-destructive-foreground">
                  {errors.join(" ")}
                </span>
              ) : null
            }
          />
        </div>

        {error && (
          <span className="text-sm text-destructive dark:text-destructive-foreground">
            {error}
          </span>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          variant="ghost"
          className="w-full"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
