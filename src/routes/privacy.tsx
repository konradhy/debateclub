import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <img
              src="/images/logotext.png"
              alt="DebateClub"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Privacy Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Introduction
            </h2>
            <p className="text-foreground mb-4">
              Mongoose Business ("we", "us", or "our") operates DebateClub. This
              Privacy Policy explains how we collect, use, and protect your
              personal information when you use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Information We Collect
            </h2>
            <p className="text-foreground mb-4">
              We collect the following types of information:
            </p>

            <h3 className="text-xl font-semibold text-primary mb-3">
              Account Information
            </h3>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Username</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3">
              Usage Data
            </h3>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>Debate session recordings and transcripts</li>
              <li>Practice history and performance analytics</li>
              <li>Feature usage and interaction patterns</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mb-3">
              Payment Information
            </h3>
            <p className="text-foreground mb-4">
              Payment processing is handled by Stripe. We do not store your
              credit card information. Stripe collects and processes payment
              data according to their privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              How We Use Your Information
            </h2>
            <p className="text-foreground mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>Provide and maintain the Service</li>
              <li>Process your subscription payments</li>
              <li>Store your debate sessions and performance data</li>
              <li>Send you important service updates and notifications</li>
              <li>Improve our Service and develop new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Third-Party Services
            </h2>
            <p className="text-foreground mb-4">
              We use the following third-party services to operate DebateClub:
            </p>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>
                <strong>Stripe</strong> - Payment processing
              </li>
              <li>
                <strong>Google</strong> - OAuth authentication (if you sign in
                with Google)
              </li>
              <li>
                <strong>Convex</strong> - Database and hosting infrastructure
              </li>
              <li>
                <strong>VAPI</strong> - Voice conversation processing
              </li>
              <li>
                <strong>OpenRouter</strong> - AI model access
              </li>
            </ul>
            <p className="text-foreground mb-4">
              Each of these services has their own privacy policy governing how
              they handle your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Data Retention
            </h2>
            <p className="text-foreground mb-4">
              We retain your account information and debate data for as long as
              your account is active. If you delete your account, we will delete
              all associated personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-foreground mb-4">
              We use cookies and similar technologies for:
            </p>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>
                <strong>Essential cookies</strong> - Required for authentication
                and basic functionality
              </li>
              <li>
                <strong>Analytics cookies</strong> - To understand how users
                interact with our Service
              </li>
            </ul>
            <p className="text-foreground mb-4">
              You can disable cookies in your browser settings, but this may
              affect Service functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Data Security
            </h2>
            <p className="text-foreground mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal data. However, no method of transmission
              over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Children's Privacy
            </h2>
            <p className="text-foreground mb-4">
              Our Service is not intended for children under 13. We do not
              knowingly collect personal information from children under 13. If
              you are under 18, you must have permission from a parent or
              guardian to use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Changes to This Policy
            </h2>
            <p className="text-foreground mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by email or through the
              Service. Your continued use of the Service after such changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Contact Us
            </h2>
            <p className="text-foreground mb-4">
              If you have questions about this Privacy Policy, please contact
              us:
            </p>
            <p className="text-foreground">
              <strong>Mongoose Business</strong>
              <br />
              Email: info@mangoosebusiness.com
              <br />
              Delaware, United States
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              By using DebateClub, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
