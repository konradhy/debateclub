import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsOfService,
});

function TermsOfService() {
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
            Terms of Service
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground mb-4">
              By accessing and using DebateClub (the "Service"), you accept and
              agree to be bound by the terms and provision of this agreement.
              This Service is operated by Mongoose Business, a Delaware
              corporation ("Company", "we", "us", or "our").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              2. Description of Service
            </h2>
            <p className="text-foreground mb-4">
              DebateClub provides an AI-powered debate and argumentation
              training platform. The Service includes access to AI debate
              opponents, practice scenarios, and performance analysis tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              3. Privacy & Data Usage
            </h2>

            <p className="text-foreground mb-4">
              We collect only the minimum data necessary to operate the Service,
              including account information and usage analytics. For full
              details on data collection and usage, please see our Privacy
              Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              4. Subscription & Payment
            </h2>
            <p className="text-foreground mb-4">
              Certain features of the Service require a paid subscription or
              paid tokens. By subscribing, you agree to pay all fees associated
              with your chosen plan.
            </p>
            <p className="text-foreground mb-4">
              <strong>No Refunds:</strong> All subscription and token purchase
              fees are non-refundable. You may cancel your subscription at any
              time, but you will not receive a refund for any unused portion of
              your subscription period. Your access will continue until the end
              of your current billing period.
            </p>
            <p className="text-foreground mb-4">
              Subscription fees are billed in advance on a recurring basis
              (monthly or annually, depending on your plan). We reserve the
              right to change our pricing with 30 days notice to existing
              subscribers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              5. Account Responsibilities
            </h2>
            <p className="text-foreground mb-4">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>
            <p className="text-foreground mb-4">
              You must be at least 13 years old to use this Service. If you are
              under 18, you must have permission from a parent or guardian.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              6. Acceptable Use
            </h2>
            <p className="text-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>
                Use the Service for any illegal purpose or in violation of any
                laws
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                Service
              </li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service to harass, abuse, or harm another person</li>
              <li>
                Impersonate any person or entity or misrepresent your
                affiliation
              </li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-foreground mb-4">
              The Service and its original content, features, and functionality
              are owned by Mongoose Business and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
            <p className="text-foreground mb-4">
              You retain ownership of any content you create using the Service.
              However, by using the Service, you grant us a limited license to
              store and process your content solely for the purpose of providing
              the Service to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-foreground mb-4">
              <strong>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </strong>
            </p>
            <p className="text-foreground mb-4">We do not warrant that:</p>
            <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
              <li>
                The Service will be uninterrupted, timely, secure, or error-free
              </li>
              <li>
                The results obtained from using the Service will be accurate or
                reliable
              </li>
              <li>Any errors in the Service will be corrected</li>
              <li>
                The AI opponents will provide perfect or professional-grade
                debate training
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-foreground mb-4">
              <strong>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MONGOOSE BUSINESS, ITS
                AFFILIATES, AND ITS AGENTS, DIRECTLY OR INDIRECTLY, SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
                INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE,
                GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </strong>
            </p>
            <p className="text-foreground mb-4">
              Our total liability to you for all claims arising from or relating
              to the Service shall not exceed the amount you paid us in the
              twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              10. Termination
            </h2>
            <p className="text-foreground mb-4">
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, for any reason,
              including if you breach these Terms.
            </p>
            <p className="text-foreground mb-4">
              Upon termination, your right to use the Service will immediately
              cease. All provisions of these Terms which by their nature should
              survive termination shall survive, including ownership provisions,
              warranty disclaimers, and limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              11. Governing Law
            </h2>
            <p className="text-foreground mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Delaware, United States, without regard
              to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              12. Dispute Resolution
            </h2>
            <p className="text-foreground mb-4">
              Any dispute arising from these Terms or the Service shall be
              resolved through binding arbitration in accordance with the
              American Arbitration Association's rules, conducted in Delaware.
              You waive your right to a jury trial.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-foreground mb-4">
              We reserve the right to modify these Terms at any time. We will
              notify users of any material changes by email or through the
              Service. Your continued use of the Service after such
              modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              14. Contact
            </h2>
            <p className="text-foreground mb-4">
              If you have questions about these Terms, please contact us at:
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
              By using DebateClub, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
