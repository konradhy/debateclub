import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from "react";
const ONBOARDING_PATH = "/_app/_auth/onboarding/username";
const DASHBOARD_PATH = "/_app/_auth/dashboard";
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
      navigate({ to: ONBOARDING_PATH });
      return;
    }
    if (!isLoading && isAuthenticated) {
      navigate({ to: DASHBOARD_PATH });
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
            ? "Sign in to continue to OratorPrep"
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
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
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
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
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
          className="w-full gap-2 bg-transparent"
          onClick={() => signIn("github", { redirectTo: "/login" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-primary/80 group-hover:text-primary"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          Github
        </Button>
      </div>

      <p className="px-12 text-center text-sm font-normal leading-normal text-primary/60">
        By clicking continue, you agree to our{" "}
        <a className="underline hover:text-primary">Terms of Service</a> and{" "}
        <a className="underline hover:text-primary">Privacy Policy.</a>
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
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
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
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
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
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
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
                className={`bg-transparent ${
                  field.state.meta?.errors.length > 0 &&
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
