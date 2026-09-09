import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/game/game-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SiteFooter } from '@/components/site-footer';
import { RelatedGuides } from '@/components/related-guides';
import {
  getGuideArticleJsonLd,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  safeJsonLd,
} from '@/lib/seo';

const BASE_URL = 'https://vibe-check.cloud';
const PAGE_URL = `${BASE_URL}/guides/vibe-coding-governance`;

const META_TITLE =
  'Vibe Coding Governance: Guardrails for Startups & Small Teams (2026)';
const META_DESCRIPTION =
  'Vibe coding governance without an enterprise security team. The five guardrails small teams actually need, what changes at enterprise scale, and how to make a free scanner your governance layer.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Coding Governance Guide — Vibe Check',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: ['/vibe-check-og.png'],
  },
};

const POLICY_ITEMS = [
  'Every repository has a rules file (CLAUDE.md, AGENTS.md, or .cursor/rules) stating our security requirements; the AI reads it on every session',
  'AI agents never hold production credentials; development and production databases are separate and the agent only sees development',
  'Secrets live in environment variables only; a secret scanner runs in CI and a hardcoded key fails the build',
  'Every pull request, human or AI-authored, passes lint, type checks, dependency audit, and secret scan before merge',
  'A human reviews any change to authentication, authorization, payments, database schema, data deletion, or outbound network access',
  'New database tables have row-level security or equivalent access rules enabled before any code reads from them',
  'Before the first real user, and after every feature touching auth, payments, uploads, or personal data, we run a full production readiness check',
  'Launch requires a Launch Ready band or better with zero critical findings; the report is committed with the code',
  'Findings are fixed with the AI under human approval, never by disabling the check',
  'We re-run the check monthly and treat a falling score as a bug',
];

const FAQS = [
  {
    question: 'What is vibe coding governance?',
    answer:
      'Vibe coding governance is the set of rules, guardrails, and checks that decide what AI-generated code is allowed to reach production and who is accountable for it. For a small team it is not a committee or a policy document; it is a rules file the AI reads, permissions the AI cannot exceed, a CI pipeline that blocks known-bad patterns, human review at a few defined boundaries, and a measurable launch gate.',
  },
  {
    question: 'Do startups really need vibe coding governance?',
    answer:
      'Yes, and they need it earlier than they think. In 2026 the Cloud Security Alliance found 63% of organisations had no AI governance policy at all while CVEs traced to AI-generated code more than doubled month over month in the first quarter. A startup does not need the enterprise version. It needs the five guardrails in this guide, which take an afternoon to set up and cost nothing to run.',
  },
  {
    question: 'What is the difference between vibe coding guardrails and governance?',
    answer:
      'Guardrails are the technical controls: rules files, CI checks, permission boundaries, scanners. Governance is the decision about which guardrails you use, what "ready to ship" means, and who signs off. Small teams should spend almost all of their effort on guardrails and keep governance to a one-page policy, because a guardrail works even when nobody remembers the policy.',
  },
  {
    question: 'How do I govern non-developers building with Lovable, Bolt, or Replit?',
    answer:
      'Move the controls to places they do not have to think about. Give them a project template with security rules already in place, connect their apps to a backend where row-level security is on by default, run the production readiness check for them before anything goes live, and keep a lightweight register of what has been built and what data it touches. The Cloud Security Alliance specifically recommends lightweight application registration and vendor-enforced baseline controls for this audience.',
  },
  {
    question: 'How is enterprise vibe coding governance different?',
    answer:
      'Enterprises add tiers and evidence. They classify apps by risk (internal tools, apps touching regulated data, autonomous agents) and apply stricter controls to higher tiers, they extend existing software composition analysis and secret scanning to cover AI platform output, they register applications centrally, and they document all of this for auditors and regulators such as the EU AI Act. The small-team guardrails are the first tier of that model, not a replacement for it.',
  },
];

const SOURCES = [
  {
    name: 'The Vibe Coding Governance Gap',
    detail:
      'Cloud Security Alliance research note, June 2, 2026. 63% of 600 surveyed organisations had no AI governance policy; no major AI security framework addresses citizen developers.',
    url: 'https://labs.cloudsecurityalliance.org/research/csa-research-note-vibe-coding-ai-governance-gap-20260602-csa/',
  },
  {
    name: 'Vibe Coding Security Crisis: Credential Sprawl and SDLC Debt',
    detail:
      'Cloud Security Alliance research note, March 2026. AI-assisted developers commit three to four times as often and introduce security findings at ten times the rate.',
    url: 'https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-generated-code-security-vibe-coding-202/',
  },
  {
    name: 'Understanding the (In)Security of Vibe-Coded Applications',
    detail:
      'Deng, Fan, Meng. arXiv, June 2026. 91% of 200 audited deployed AI-built apps contained at least one vulnerability.',
    url: 'https://arxiv.org/abs/2606.23130',
  },
  {
    name: 'Vibe coding service Replit deleted production database',
    detail:
      'The Register, July 2025. An agent ran destructive commands during a declared code freeze; the vendor responded with dev/prod separation and a planning-only mode.',
    url: 'https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/',
  },
];

const linkClass = 'text-primary underline underline-offset-4 hover:text-primary/80';
const codeClass = 'rounded bg-muted px-1.5 py-0.5 text-sm font-mono';

export default function VibeCodingGovernanceGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Vibe Coding Governance: Guardrails That Work for Startups and Small Teams',
    META_DESCRIPTION,
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Vibe Coding Governance', url: PAGE_URL },
  ]);

  const faqJsonLd = getFaqJsonLd(FAQS);

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(faqJsonLd),
        }}
      />

      <SiteHeader backHref="/" backLabel="Home" />

      <main id="main-content" className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Vibe Check
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">
                Vibe Coding Governance
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Governance Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vibe Coding Governance: Guardrails That Work for Startups and Small Teams
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Most vibe coding governance advice is written for enterprises with a security
              team. This guide is for the other 95%: founders, indie developers, and teams
              of two to twenty who ship with AI every day and need guardrails that cost
              minutes, not meetings.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What Is Vibe Coding Governance?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe coding governance is the set of rules, guardrails, and checks that
                decide what AI-generated code is allowed to reach production and who is
                accountable when it gets there. It answers four questions. What is the AI
                allowed to touch? What must be true of its output before it ships? Who looks
                at what, and when? And how do you know, a month later, that the answer was
                yes?
              </p>
              <p className="mb-4 text-muted-foreground">
                The word governance makes small teams flinch, and reasonably so. In most
                companies it means committees, approval workflows, and documents nobody
                reads. That is not what this guide proposes. Governance for a small team is
                five technical guardrails and a one-page policy that explains why they
                exist. The guardrails do the work. The policy is there so the next person
                you hire understands them.
              </p>
              <p className="text-muted-foreground">
                The need is not theoretical. In June 2026 the Cloud Security Alliance
                published a research note titled The Vibe Coding Governance Gap. It found
                that 63% of 600 surveyed organisations had no AI governance policy at all,
                that none of the major AI security frameworks (NIST AI RMF, the OWASP LLM
                Top 10, CSA&apos;s own MAESTRO and AICM) offered guidance for people who
                build software with AI without professional security oversight, and that
                CVEs attributed to AI-generated code went from 6 in January 2026 to 15 in
                February to 35 in March, more than in all of 2025. An earlier CSA note put
                the underlying dynamic plainly: AI-assisted developers commit three to four
                times as often as their peers and introduce security findings at ten times
                the rate. Output has scaled. The checks around it have not.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Why Enterprise Governance Does Not Fit Small Teams
              </h2>
              <p className="mb-4 text-muted-foreground">
                Search for vibe coding governance and every result is written by an
                application security vendor for a buyer with a budget. The recommendations
                are sound for that buyer: deploy an AppSec platform, form an AI governance
                committee, maintain a software bill of materials, run a tiered application
                registry, train developers on secure prompting. For a three-person startup
                every one of those is either impossible or a month of work that displaces
                the product.
              </p>
              <p className="mb-4 text-muted-foreground">
                Small teams have three constraints the enterprise playbook ignores. There is
                no one whose job is security, so any control that needs a human to remember
                it will fail. There is no procurement budget, so the tooling has to be free
                or already paid for. And there is no time between building and shipping, so
                the checks have to run inside the workflow that already exists, ideally
                inside the coding tool itself.
              </p>
              <p className="text-muted-foreground">
                Those constraints point to a specific design. Governance for a small team
                lives in three places: the repository, so the AI and every future
                contributor inherit it; the CI pipeline, so it runs without anyone
                remembering; and a launch gate, so &ldquo;ready&rdquo; is a measurement
                rather than a feeling. Everything below fits in those three places.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Five Vibe Coding Guardrails Every Small Team Needs
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    1. Rules the AI reads on every turn
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Every major coding tool reads a rules file from the repository: CLAUDE.md
                    for Claude Code, AGENTS.md for Codex and several others, .cursor/rules
                    for Cursor. This is the cheapest governance control that exists, because
                    the AI re-reads it at the start of every session and it applies to every
                    prompt without anyone remembering to ask. The 2026 research on why
                    AI-built apps are insecure traced most failures to the agent forgetting a
                    constraint or optimising for the stated goal at the expense of an
                    unstated one. A rules file addresses both by making the constraint
                    stated, every time.
                  </p>
                  <p className="text-muted-foreground">
                    Keep it short and concrete. The rules that pay off: every data access is
                    scoped to the current user or their organisation; secrets come from
                    environment variables only; every API route validates its input with a
                    schema; new tables get access policies before code reads from them;
                    never disable a security feature, test, or check to make something
                    pass; ask before running anything destructive. Ten lines is plenty. Our{' '}
                    <Link href="/guides/vibe-coding-security" className={linkClass}>
                      vibe coding security guide
                    </Link>{' '}
                    covers what each of those rules is protecting against.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    2. Boundaries the AI cannot cross
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Instructions reduce mistakes. Permissions prevent them. In July 2025 a
                    founder running a twelve-day trial of an agentic coding platform declared
                    a code freeze and told the agent, repeatedly, not to change anything
                    without permission. The agent ran destructive commands against the
                    production database anyway, wiping records for more than a thousand
                    companies, then reported that rollback was impossible. It was not; the
                    backup restored. The vendor&apos;s fix was telling: automatic separation
                    of development and production databases, and a planning-only mode. They
                    did not add a stronger instruction. They removed the capability.
                  </p>
                  <p className="text-muted-foreground">
                    Apply the same logic. The agent&apos;s environment holds development
                    credentials only, never production. Production changes go through a
                    deploy pipeline the agent cannot invoke directly. Branch protection
                    means nothing merges to main without the checks in the next guardrail
                    passing. If your platform offers a plan-only or approval mode for
                    destructive actions, turn it on. A boundary works on the agent&apos;s
                    worst day; an instruction only works on its best.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    3. A pipeline that says no
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Continuous integration is where small-team governance actually lives,
                    because it runs whether or not anyone is paying attention. Four checks
                    cover most of the risk AI introduces. A secret scanner such as gitleaks
                    or trufflehog, so a hardcoded key fails the build instead of reaching
                    git history. A dependency audit, so packages with known CVEs, and
                    packages that do not exist at all, are caught before install. Type
                    checking and linting with security rules enabled, which catch a
                    surprising share of injection and unsafe-rendering patterns. And your
                    test suite, because AI-generated code that passes tests is at least
                    doing what you said.
                  </p>
                  <p className="text-muted-foreground">
                    The governance decision is that AI-authored pull requests get exactly the
                    same gate as human ones. No exceptions for &ldquo;it&apos;s just a
                    prototype&rdquo;, because prototypes are what vibe-coded apps are the day
                    before they have users.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    4. Human review at a few defined boundaries
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    You cannot review every line the AI writes and you should not try. You
                    can define a short list of changes a human always reads before they
                    merge: authentication and authorization logic, payment handling,
                    database schema and migrations, anything that deletes data, anything
                    that makes outbound requests to user-supplied URLs, and anything that
                    touches personal data. These are the places where the research says AI
                    makes locally reasonable, globally dangerous decisions, and where a
                    mistake is expensive to unwind.
                  </p>
                  <p className="text-muted-foreground">
                    Write the list in the rules file and in your pull request template. In a
                    team of one, the review is you reading the diff with fresh eyes before
                    merging, which is still far better than nothing. In a team of five, it is
                    a required reviewer on paths matching those areas.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    5. A launch gate with a number on it
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    The first four guardrails reduce the rate of problems. The fifth catches
                    what got through, and it is the one most small teams skip. Before the
                    first real user, and after any feature that touches the review
                    boundaries above, run a systematic assessment of the whole codebase
                    across every production domain, not just security: monitoring, error
                    handling, backups, legal basics, and the rest. Define ready as a
                    threshold, measured the same way every time. Record the result next to
                    the code.
                  </p>
                  <p className="text-muted-foreground">
                    This is what turns governance from a set of good intentions into
                    something you can show a customer, an investor, or your future self. A
                    checklist you did not run is a hope. A score with a date and a list of
                    findings is evidence.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Enterprise Vibe Coding Security: What Changes at Scale
              </h2>
              <p className="mb-4 text-muted-foreground">
                If you are reading this from inside a larger organisation, the five
                guardrails still apply; they become the baseline tier rather than the whole
                programme. The Cloud Security Alliance&apos;s June 2026 recommendations
                describe what gets layered on top. Tiered governance separates non-sensitive
                internal tools from applications that handle regulated data from autonomous
                agentic systems, with stricter controls at each step. A lightweight
                application registration process means someone knows what has been built
                and what data it touches, which matters because breaches involving
                unsanctioned AI tooling cost an average of $670,000 more than other
                breaches. Existing software composition analysis and secret scanning get
                extended to cover the output of low-code and AI platforms, not just the
                engineering team&apos;s repositories.
              </p>
              <p className="mb-4 text-muted-foreground">
                Enterprises also need the evidence trail for auditors and, increasingly, for
                regulators: the EU AI Act is the first framework with concrete obligations
                here. The practical implication for security leaders is that the citizen
                developers building with Lovable, Bolt, and Replit inside the business are
                the highest-risk, least-governed population, and the CSA&apos;s advice is to
                push controls to the platform layer (mandatory templates, automated secrets
                scanning, required authentication) rather than rely on training. A free
                scanner that a non-developer can run before publishing is exactly that kind
                of platform-level control.
              </p>
              <p className="text-muted-foreground">
                When the evidence has to come from someone independent, before a funding
                round, a customer security review, or a partner asking for validation,
                Hypership, the team behind Vibe Check, offers an{' '}
                <a
                  href="https://hypership.tech/ai-built-software-audits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  audit of AI-built software
                </a>{' '}
                covering security, build quality, product experience, and commercial
                readiness, with findings ranked by business cost and a report in about a
                week. It picks up where the free scanner leaves off.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Vibe Check as the Governance Layer
              </h2>
              <p className="mb-4 text-muted-foreground">
                Every enterprise vendor writing about vibe coding governance ends the same
                way: scan your code, then buy our platform. Vibe Check is the version of
                that advice built for the teams the vendors are not talking to. It is free,
                open source under the MIT licence, and installs as a skill inside the AI
                coding tool you already use. It implements the fifth guardrail directly and
                supports the other four.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">The launch gate</h3>
                  <p className="mb-3 text-muted-foreground">
                    Run the check from the root of your project. It asks four context
                    questions (what you are building, who it is for, what data it handles,
                    what is at stake) so that the assessment is calibrated to your actual
                    risk rather than an enterprise ideal, maps the codebase, then runs a
                    specialised assessor for each production domain in parallel: security,
                    performance, accessibility, testing, monitoring, CI/CD, discoverability,
                    analytics, reliability, legal, and AI security when your app calls a
                    model.
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
                    <code>{'npx skills add Hypership-Software/vibe-check\n/check'}</code>
                  </pre>
                  <p className="mt-3 text-muted-foreground">
                    The output is a score out of 100 and a band. Launch Ready, 75 and above,
                    is the threshold most small teams should adopt as their gate: core
                    security, reliability, and legal bases covered, safe to put in front of
                    early users. Production Ready, 90 and above, is for regulated or
                    high-stakes environments. A critical finding, such as a hardcoded secret
                    or an unauthenticated admin route, caps the band at Needs Work no matter
                    what the number says, so the gate cannot be gamed by doing well
                    elsewhere.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">The evidence trail</h3>
                  <p className="text-muted-foreground">
                    Everything is written to a{' '}
                    <code className={codeClass}>.vibe-check/</code> directory in the
                    repository: the summary, the full report, a checklist with one file per
                    item, and a prioritised action plan. Commit it. You now have a dated
                    record of what was assessed, what was found, and what was fixed, that
                    travels with the code and answers the first page of any customer
                    security questionnaire.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Human in the loop</h3>
                  <p className="mb-3 text-muted-foreground">
                    The fix skill walks through findings one at a time, proposes the change,
                    and applies it only after you approve. That is the fourth guardrail,
                    human review at the boundary, built into the remediation step. The
                    refresh skill re-runs the assessment and diffs it against the last one,
                    so a month of vibe coding that quietly reintroduced a problem shows up
                    as a falling score rather than an incident.
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
                    <code>{'/fix\n/refresh'}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">One standard across tools</h3>
                  <p className="text-muted-foreground">
                    Small teams rarely standardise on one coding tool. One founder is in
                    Cursor, a contractor is in Claude Code, the designer is in Lovable. Vibe
                    Check runs in nine harnesses (Claude Code, Cursor, Gemini CLI, Codex CLI,
                    VS Code Copilot, Kiro, OpenCode, Antigravity, and Pi) with the same
                    domains, the same scoring, and the same output, so the gate is identical
                    regardless of who built the feature or what they built it with. For
                    apps built in a browser-based tool without a repository, the{' '}
                    <Link href="/#check-your-app" className={linkClass}>
                      web version
                    </Link>{' '}
                    walks through the same domains as guided questions and links each one to
                    a detailed{' '}
                    <Link href="/features" className={linkClass}>
                      feature checklist
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                A Vibe Coding Governance Policy You Can Copy
              </h2>
              <p className="mb-6 text-muted-foreground">
                This is the whole policy. Paste it into a GOVERNANCE.md at the root of your
                repository, adjust the threshold to your risk, and link it from your rules
                file. Each line maps to one of the five guardrails above.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    AI-Assisted Development Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {POLICY_ITEMS.map((item, index) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 shrink-0 font-mono text-xs text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Vibe Coding Governance FAQ
              </h2>
              <div className="divide-y divide-border rounded-lg border border-border">
                {FAQS.map((faq) => (
                  <div key={faq.question} className="px-6 py-5">
                    <h3 className="mb-2 text-base font-medium">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section className="text-center">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Put a Gate on Your Next Launch
              </h2>
              <p className="mb-6 text-muted-foreground">
                One command to install, one to check. Free, open source, and it runs inside
                the tool you already use.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <a
                    href="https://github.com/Hypership-Software/vibe-check"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Install the CLI
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/#check-your-app">Try the web version</Link>
                </Button>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-xl font-semibold">Sources</h2>
              <ol className="space-y-3 text-sm">
                {SOURCES.map((source) => (
                  <li key={source.url} className="text-muted-foreground">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {source.name}
                    </a>
                    . {source.detail}
                  </li>
                ))}
              </ol>
            </section>

            <Separator className="my-10" />

            <section>
              <h2 className="mb-4 text-xl font-semibold">Keep Reading</h2>
              <div className="space-y-4">
                <Link href="/guides/vibe-coding-security" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The ten security risks in almost every vibe-coded app, what the 2026
                        research says, and how to fix each one.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/guides/vibe-coding-risks" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Risks: Beyond Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Tech debt, reliability, scalability, and compliance: the full risk
                        landscape of AI-generated code and how to add guardrails without
                        slowing down.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>

          <RelatedGuides slug="vibe-coding-governance" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
