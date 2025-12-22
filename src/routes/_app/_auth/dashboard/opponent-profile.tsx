import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@cvx/_generated/api";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import siteConfig from "~/site.config";
import {
  Save,
  ChevronDown,
  User,
  FileText,
  Target,
  Users,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/_app/_auth/dashboard/opponent-profile")({
  component: OpponentProfile,
  beforeLoad: () => ({
    title: `${siteConfig.siteTitle} - Create Opponent Profile`,
    headerTitle: "Create Opponent Profile",
    headerDescription: "Configure a custom debate opponent",
  }),
});

/**
 * Collapsible section component for progressive disclosure of optional fields.
 */
function CollapsibleSection({
  title,
  description,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-lg border border-border bg-card/50"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer items-center gap-3 p-4 list-none [&::-webkit-details-marker]:hidden">
        <Icon className="h-5 w-5 text-primary/60" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-primary">{title}</h3>
          <p className="text-xs text-primary/50">{description}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-primary/40 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border p-4">{children}</div>
    </details>
  );
}

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
      <label htmlFor={id} className="text-sm font-medium text-primary">
        {label}
      </label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="resize-none"
      />
      {helperText && (
        <p className="text-xs text-primary/50">{helperText}</p>
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
      <label htmlFor={id} className="text-sm font-medium text-primary">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p className="text-xs text-primary/50">{helperText}</p>
      )}
    </div>
  );
}

function OpponentProfile() {
  const navigate = useNavigate();
  const { data: user } = useQuery(convexQuery(api.app.getCurrentUser, {}));
  const { mutateAsync: createOpponent } = useMutation({
    mutationFn: useConvexMutation(api.opponents.create),
  });

  // ==========================================
  // Required fields (Basic Info)
  // ==========================================
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [position, setPosition] = useState<"pro" | "con">("con");
  const [style, setStyle] = useState("aggressive");
  const [difficulty, setDifficulty] = useState("medium");

  // ==========================================
  // Audience Context (optional)
  // ==========================================
  const [audienceDescription, setAudienceDescription] = useState("");
  const [audienceType, setAudienceType] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [audienceDisposition, setAudienceDisposition] = useState("");
  const [debateFormat, setDebateFormat] = useState("");

  // ==========================================
  // Opponent Profile - About (optional)
  // ==========================================
  const [opponentDescription, setOpponentDescription] = useState("");
  const [opponentOrganization, setOpponentOrganization] = useState("");
  const [opponentCredentials, setOpponentCredentials] = useState("");
  const [credentialWeaknesses, setCredentialWeaknesses] = useState("");
  const [opponentDebateStyle, setOpponentDebateStyle] = useState("");
  const [opponentRhetoricalTendencies, setOpponentRhetoricalTendencies] =
    useState("");
  const [opponentTriggers, setOpponentTriggers] = useState("");
  const [opponentCharacterIssues, setOpponentCharacterIssues] = useState("");

  // ==========================================
  // Opponent Profile - Record (for traps)
  // ==========================================
  const [opponentPastStatements, setOpponentPastStatements] = useState("");
  const [opponentContradictions, setOpponentContradictions] = useState("");
  const [opponentTrackRecord, setOpponentTrackRecord] = useState("");

  // ==========================================
  // Opponent Profile - Steelmanning
  // ==========================================
  const [opponentStrongestArguments, setOpponentStrongestArguments] =
    useState("");
  const [opponentBestEvidence, setOpponentBestEvidence] = useState("");
  const [opponentLikelyCritiques, setOpponentLikelyCritiques] = useState("");

  // ==========================================
  // User Context (optional)
  // ==========================================
  const [userResearch, setUserResearch] = useState("");
  const [keyPointsToMake, setKeyPointsToMake] = useState("");
  const [thingsToAvoid, setThingsToAvoid] = useState("");
  const [toneDirectives, setToneDirectives] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?._id) {
      setError("You must be logged in to create an opponent profile");
      return;
    }

    // Validation for required fields
    if (!name.trim()) {
      setError("Opponent name is required");
      return;
    }
    if (!topic.trim()) {
      setError("Debate topic is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build the payload with all fields (optional fields will be undefined if empty)
      const opponentId = await createOpponent({
        // Required
        name: name.trim(),
        topic: topic.trim(),
        position,
        style,
        difficulty,

        // Audience context (only include if non-empty)
        audienceDescription: audienceDescription.trim() || undefined,
        audienceType: audienceType || undefined,
        audienceSize: audienceSize || undefined,
        audienceDisposition: audienceDisposition || undefined,
        debateFormat: debateFormat || undefined,

        // Opponent profile - about
        opponentDescription: opponentDescription.trim() || undefined,
        opponentOrganization: opponentOrganization.trim() || undefined,
        opponentCredentials: opponentCredentials.trim() || undefined,
        credentialWeaknesses: credentialWeaknesses.trim() || undefined,
        opponentDebateStyle: opponentDebateStyle || undefined,
        opponentRhetoricalTendencies:
          opponentRhetoricalTendencies.trim() || undefined,
        opponentTriggers: opponentTriggers.trim() || undefined,
        opponentCharacterIssues: opponentCharacterIssues.trim() || undefined,

        // Opponent profile - record (for traps)
        opponentPastStatements: opponentPastStatements.trim() || undefined,
        opponentContradictions: opponentContradictions.trim() || undefined,
        opponentTrackRecord: opponentTrackRecord.trim() || undefined,

        // Opponent profile - steelmanning
        opponentStrongestArguments:
          opponentStrongestArguments.trim() || undefined,
        opponentBestEvidence: opponentBestEvidence.trim() || undefined,
        opponentLikelyCritiques: opponentLikelyCritiques.trim() || undefined,

        // User context
        userResearch: userResearch.trim() || undefined,
        keyPointsToMake: keyPointsToMake.trim() || undefined,
        thingsToAvoid: thingsToAvoid.trim() || undefined,
        toneDirectives: toneDirectives.trim() || undefined,
      });

      // Navigate to prep screen with this opponent
      navigate({
        to: "/dashboard/prep",
        search: { opponentId },
      });
    } catch (err) {
      console.error("Error creating opponent:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create opponent"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full bg-secondary px-6 py-8 dark:bg-black">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl gap-12">
        <div className="flex w-full flex-col rounded-lg border border-border bg-card dark:bg-black">
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-medium text-primary">
                Create Opponent Profile
              </h2>
              <p className="text-sm font-normal text-primary/60">
                Configure your debate. Required fields get you started. Optional
                sections add context for more tailored AI prep.
              </p>
            </div>
          </div>

          <div className="flex w-full px-6">
            <div className="w-full border-b border-border" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4 overflow-y-auto p-6"
          >
            {/* ==========================================
                SECTION 1: Basic Info (Always visible, required)
                ========================================== */}
            <div className="flex flex-col gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-primary">
                  Basic Info
                </h3>
                <span className="text-xs text-primary/50">(required)</span>
              </div>

              {/* Opponent Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-primary"
                >
                Opponent Name
              </label>
              <Input
                id="name"
                type="text"
                  placeholder="e.g., Climate Skeptic, Senator Johnson, Policy Expert"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

              {/* Debate Topic */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="topic"
                  className="text-sm font-medium text-primary"
                >
                Debate Topic
              </label>
              <Input
                id="topic"
                type="text"
                  placeholder="e.g., Climate change requires immediate government intervention"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

              {/* Your Position */}
              <LabeledSelect
                id="position"
                label="Your Position"
                value={position}
                onChange={(v) => setPosition(v as "pro" | "con")}
                options={[
                  { value: "pro", label: "Pro - I'm supporting this motion" },
                  { value: "con", label: "Con - I'm opposing this motion" },
                ]}
                helperText="The AI will take the opposite position"
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Debate Style */}
                <LabeledSelect
                  id="style"
                  label="AI Opponent Style"
                  value={style}
                  onChange={setStyle}
                  options={[
                    { value: "aggressive", label: "Aggressive" },
                    { value: "socratic", label: "Socratic" },
                    { value: "academic", label: "Academic" },
                    { value: "political", label: "Political" },
                  ]}
                />

                {/* Difficulty */}
                <LabeledSelect
                  id="difficulty"
                  label="Difficulty Level"
                  value={difficulty}
                  onChange={setDifficulty}
                  options={[
                    { value: "easy", label: "Easy" },
                    { value: "medium", label: "Medium" },
                    { value: "hard", label: "Hard" },
                  ]}
                />
              </div>
            </div>

            {/* ==========================================
                SECTION 2: About Your Opponent (collapsed)
                ========================================== */}
            <CollapsibleSection
              title="About Your Opponent"
              description="Who are they? Background, style, and vulnerabilities (Chapter 4: The Three C's)"
              icon={User}
            >
              <div className="flex flex-col gap-4">
                <LabeledTextarea
                  id="opponentDescription"
                  label="Background"
                  placeholder="Who is this person? What's their role, history, or relevance to this debate?"
                  helperText="e.g., 'Conservative economist, former advisor to the Reagan administration, known for free-market advocacy'"
                  value={opponentDescription}
                  onChange={setOpponentDescription}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="opponentOrganization"
                      className="text-sm font-medium text-primary"
                    >
                      Organization / Affiliation
              </label>
                    <Input
                      id="opponentOrganization"
                      type="text"
                      placeholder="e.g., Cato Institute, Heritage Foundation"
                      value={opponentOrganization}
                      onChange={(e) => setOpponentOrganization(e.target.value)}
                    />
                  </div>

                  <LabeledSelect
                    id="opponentDebateStyle"
                    label="Their Debate Style"
                    value={opponentDebateStyle}
                    onChange={setOpponentDebateStyle}
                    options={[
                      { value: "", label: "— Select if known —" },
                      {
                        value: "gish galloper",
                        label: "Gish Galloper (rapid-fire claims)",
                      },
                      {
                        value: "academic",
                        label: "Academic (evidence-heavy)",
                      },
                      { value: "emotional", label: "Emotional (appeals to feelings)" },
                      {
                        value: "socratic",
                        label: "Socratic (trap questions)",
                      },
                      {
                        value: "aggressive",
                        label: "Aggressive (interrupts, bullies)",
                      },
                    ]}
                  />
            </div>

                <LabeledTextarea
                  id="opponentCredentials"
                  label="Their Credentials"
                  placeholder="What expertise do they claim? Degrees, positions, experience?"
                  helperText="Hasan Chapter 4: 'Challenge their credentials — but only AFTER they've invoked them'"
                  value={opponentCredentials}
                  onChange={setOpponentCredentials}
                  rows={2}
                />

                <LabeledTextarea
                  id="credentialWeaknesses"
                  label="Credential Weaknesses"
                  placeholder="Where do their credentials fall short? Areas outside their expertise?"
                  helperText="e.g., 'PhD is in unrelated field', 'Funded by industry groups', 'No field experience'"
                  value={credentialWeaknesses}
                  onChange={setCredentialWeaknesses}
                  rows={2}
                />

                <LabeledTextarea
                  id="opponentRhetoricalTendencies"
                  label="Rhetorical Tendencies"
                  placeholder="How do they typically argue? Any patterns, habits, or tells?"
                  value={opponentRhetoricalTendencies}
                  onChange={setOpponentRhetoricalTendencies}
                  rows={2}
                />

                <LabeledTextarea
                  id="opponentTriggers"
                  label="Emotional Triggers"
                  placeholder="What topics make them defensive or emotional? What sets them off?"
                  helperText="Strategic provocation can expose weaknesses — Hasan Chapter 12: 'Keep Calm'"
                  value={opponentTriggers}
                  onChange={setOpponentTriggers}
                  rows={2}
                />

                <LabeledTextarea
                  id="opponentCharacterIssues"
                  label="Character / Credibility Issues"
                  placeholder="Conflicts of interest? Bias? Funding sources? Past scandals?"
                  helperText="Hasan's First C: 'Challenge their CHARACTER' — but use judiciously"
                  value={opponentCharacterIssues}
                  onChange={setOpponentCharacterIssues}
                  rows={2}
                />
              </div>
            </CollapsibleSection>

            {/* ==========================================
                SECTION 3: Opponent's Record (for traps)
                ========================================== */}
            <CollapsibleSection
              title="Opponent's Record"
              description="Past statements and contradictions — for setting traps (Chapter 10: Booby Traps)"
              icon={AlertTriangle}
            >
              <div className="flex flex-col gap-4">
                <LabeledTextarea
                  id="opponentPastStatements"
                  label="Past Statements / Quotes"
                  placeholder="Notable quotes, positions they've taken on record, past claims..."
                  helperText="Hasan's favorite trap: Quote them without attribution, get them to disagree, then reveal the source"
                  value={opponentPastStatements}
                  onChange={setOpponentPastStatements}
                  rows={4}
                />

                <LabeledTextarea
                  id="opponentContradictions"
                  label="Known Contradictions"
                  placeholder="Times they've contradicted themselves, changed positions, or been inconsistent..."
                  helperText="'Earlier you said X, but now you're saying Y. Which is it?' — devastating if you have the receipts"
                  value={opponentContradictions}
                  onChange={setOpponentContradictions}
                  rows={3}
                />

                <LabeledTextarea
                  id="opponentTrackRecord"
                  label="Track Record"
                  placeholder="Wrong predictions, debunked claims, failed policies they advocated..."
                  helperText="Hasan's Third C: 'Challenge their CLAIMS' — especially their track record of being wrong"
                  value={opponentTrackRecord}
                  onChange={setOpponentTrackRecord}
                  rows={3}
                />
              </div>
            </CollapsibleSection>

            {/* ==========================================
                SECTION 4: Steelmanning Their Case
                ========================================== */}
            <CollapsibleSection
              title="Steelmanning Their Case"
              description="Their best arguments, strongest evidence — know thy enemy (Chapter 15: Do Your Homework)"
              icon={Lightbulb}
            >
              <div className="flex flex-col gap-4">
                <LabeledTextarea
                  id="opponentStrongestArguments"
                  label="Their Strongest Arguments"
                  placeholder="What's the best version of their case? Steelman it — don't strawman."
                  helperText="Hasan: 'Constructing the most compelling form of your opponent's argument' prepares you to counter it"
                  value={opponentStrongestArguments}
                  onChange={setOpponentStrongestArguments}
                  rows={4}
                />

                <LabeledTextarea
                  id="opponentBestEvidence"
                  label="Their Best Evidence"
                  placeholder="What's their strongest proof? Which stats, studies, or examples will they cite?"
                  value={opponentBestEvidence}
                  onChange={setOpponentBestEvidence}
                  rows={3}
                />

                <LabeledTextarea
                  id="opponentLikelyCritiques"
                  label="How They'll Attack You"
                  placeholder="What will they say against YOUR position? Anticipated critiques?"
                  helperText="Prepare counters for their most likely attacks — don't be caught off guard"
                  value={opponentLikelyCritiques}
                  onChange={setOpponentLikelyCritiques}
                  rows={3}
                />
              </div>
            </CollapsibleSection>

            {/* ==========================================
                SECTION 5: Your Audience
                ========================================== */}
            <CollapsibleSection
              title="Your Audience"
              description="Who you're trying to persuade — the real judges (Chapter 1: Winning Over an Audience)"
              icon={Users}
            >
              <div className="flex flex-col gap-4">
                <LabeledTextarea
                  id="audienceDescription"
                  label="Audience Description"
                  placeholder="Who will be watching? What are their concerns, values, knowledge level?"
                  helperText="Hasan: 'The audience is judge and jury — you're not convincing your opponent, you're convincing THEM'"
                  value={audienceDescription}
                  onChange={setAudienceDescription}
                  rows={3}
                />

                <div className="grid grid-cols-2 gap-4">
                  <LabeledSelect
                    id="audienceType"
                    label="Audience Type"
                    value={audienceType}
                    onChange={setAudienceType}
                    options={[
                      { value: "", label: "— Select type —" },
                      { value: "general", label: "General Public" },
                      { value: "academic", label: "Academic / Experts" },
                      { value: "professional", label: "Professional / Industry" },
                      { value: "political", label: "Political / Partisan" },
                      { value: "legal", label: "Legal / Judicial" },
                      { value: "media", label: "Media / Journalists" },
                    ]}
                  />

                  <LabeledSelect
                    id="audienceSize"
                    label="Audience Size"
                    value={audienceSize}
                    onChange={setAudienceSize}
                    options={[
                      { value: "", label: "— Select size —" },
                      { value: "one-on-one", label: "One-on-One" },
                      { value: "small group", label: "Small Group (5-20)" },
                      { value: "large", label: "Large (50+)" },
                      { value: "broadcast", label: "Broadcast / Recorded" },
                    ]}
                  />
            </div>

                <div className="grid grid-cols-2 gap-4">
                  <LabeledSelect
                    id="audienceDisposition"
                    label="Audience Disposition"
                    value={audienceDisposition}
                    onChange={setAudienceDisposition}
                    options={[
                      { value: "", label: "— Select disposition —" },
                      { value: "friendly", label: "Friendly (already on your side)" },
                      { value: "neutral", label: "Neutral (open to persuasion)" },
                      { value: "skeptical", label: "Skeptical (needs convincing)" },
                      { value: "hostile", label: "Hostile (against you)" },
                    ]}
                  />

                  <LabeledSelect
                    id="debateFormat"
                    label="Debate Format"
                    value={debateFormat}
                    onChange={setDebateFormat}
                    options={[
                      { value: "", label: "— Select format —" },
                      { value: "formal debate", label: "Formal Debate" },
                      { value: "panel", label: "Panel Discussion" },
                      { value: "interview", label: "Interview / Q&A" },
                      { value: "town hall", label: "Town Hall" },
                      { value: "podcast", label: "Podcast / Conversation" },
                      { value: "written", label: "Written Exchange" },
                    ]}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* ==========================================
                SECTION 6: Your Context & Directives
                ========================================== */}
            <CollapsibleSection
              title="Your Context & Directives"
              description="Your research, points to emphasize, things to avoid — guide the AI"
              icon={FileText}
            >
              <div className="flex flex-col gap-4">
                <LabeledTextarea
                  id="userResearch"
                  label="Your Research / Notes"
                  placeholder="Paste articles, notes, data, anything you've gathered that should inform the prep..."
                  helperText="This will be synthesized with AI research to create tailored debate materials"
                  value={userResearch}
                  onChange={setUserResearch}
                  rows={5}
                />

                <LabeledTextarea
                  id="keyPointsToMake"
                  label="Key Points to Emphasize"
                  placeholder="What arguments or themes do you definitely want to include?"
                  helperText="The AI will ensure these points are woven into your prep materials"
                  value={keyPointsToMake}
                  onChange={setKeyPointsToMake}
                  rows={3}
                />

                <LabeledTextarea
                  id="thingsToAvoid"
                  label="Things to Avoid"
                  placeholder="Topics, arguments, or approaches you want to steer clear of..."
                  helperText="e.g., 'Don't engage on inflation — I'm less prepared there', 'Avoid personal attacks'"
                  value={thingsToAvoid}
                  onChange={setThingsToAvoid}
                  rows={2}
                />

                <LabeledTextarea
                  id="toneDirectives"
                  label="Tone & Style Preferences"
                  placeholder="How do you want to come across? Aggressive, measured, humorous, academic...?"
                  helperText="This shapes the zingers, openings, and overall rhetorical approach"
                  value={toneDirectives}
                  onChange={setToneDirectives}
                  rows={2}
                />
              </div>
            </CollapsibleSection>

            {/* ==========================================
                Error and Actions
                ========================================== */}
            {error && (
              <div className="rounded-lg bg-red-500/20 p-4 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex gap-3 border-t border-border pt-6">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Creating..." : "Save & Continue to Prep"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
