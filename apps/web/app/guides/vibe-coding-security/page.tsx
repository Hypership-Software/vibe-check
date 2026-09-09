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
const PAGE_URL = `${BASE_URL}/guides/vibe-coding-security`;

const META_TITLE =
  'Vibe Coding Security: Is Vibe Coding Safe? Risks, Guardrails & Fixes (2026)';
const META_DESCRIPTION =
  'Is vibe coding safe? The 2026 research says most AI-built apps ship with vulnerabilities. The top vibe coding security risks, how to secure AI-generated code, and how to scan your app for free.';

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
        alt: 'Vibe Coding Security Guide — Vibe Check',
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

const SECURITY_STATS = [
  {
    stat: '91%',
    label: 'of audited vibe-coded apps contained at least one vulnerability',
    source: 'Understanding the (In)Security of Vibe-Coded Applications, 2026',
  },
  {
    stat: '11.8%',
    label: 'of agent-written solutions were secure, even when 57% were functionally correct',
    source: 'SUSVIBES benchmark, Carnegie Mellon, ICML 2026',
  },
  {
    stat: '45%',
    label: 'of AI code generation tasks introduced a known vulnerability',
    source: 'Veracode GenAI Code Security Report, Spring 2026',
  },
  {
    stat: '0 of 15',
    label: 'apps built by five leading coding agents had CSRF protection or security headers',
    source: 'Tenzai, Bad Vibes study',
  },
  {
    stat: '57%',
    label: 'of reachable Supabase-backed AI apps allowed unauthenticated table reads',
    source: 'Scan of 30,998 live AI-built apps, August 2026',
  },
  {
    stat: '2,000+',
    label: 'vulnerabilities and 400+ exposed secrets across 5,600 production vibe-coded apps',
    source: 'Escape, State of Security of Vibe Coded Apps',
  },
];

const SECURITY_ASSESSOR_ITEMS = [
  'Secrets management — no hardcoded keys, tokens, or connection strings in code or git history',
  'Authentication — hashed passwords, expiring sessions, protected routes',
  'Input validation — schema validation at every API boundary, parameterized queries',
  'Dependency security — no known CVEs, no unmaintained or hallucinated packages',
  'HTTPS — enforced on every route with HSTS',
  'Security headers — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy',
  'CORS configuration — explicit origin allowlist, never wildcard with credentials',
  'CSRF protection — SameSite cookies or anti-CSRF tokens on state-changing routes',
  'Rate limiting — on login, signup, password reset, and public API endpoints',
];

const CHECKLIST_ITEMS = [
  'Every endpoint checks authorization (does this user own this resource?), not just authentication',
  'Row-level security enabled on every database table, with no USING (true) policies',
  'Rate limiting on all authentication endpoints and public APIs',
  'Session tokens expire and rotate on privilege changes',
  'Passwords hashed with bcrypt or argon2 — never reversible encryption',
  'File uploads validated by MIME type, extension, and size, stored outside the web root',
  'API keys and secrets never present in client-side code or git history',
  'A secret scanner (gitleaks or trufflehog) runs in CI on every push',
  'All user input validated with a schema library before it reaches a query or a template',
  'HTTPS enforced on every route with proper HSTS headers',
  'Security headers set: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy',
  'CSRF protection via SameSite cookies or tokens on every state-changing route',
  'Outbound requests to user-supplied URLs blocked or allowlisted (no SSRF)',
  'Error messages return generic text — no stack traces or internal details',
  'Payment webhooks verified with provider signatures before processing',
  'CORS configured to allow only your own domains',
  'Every dependency the AI added verified to exist, be maintained, and be free of known CVEs',
  'A full security scan run before launch and after every major AI-generated feature',
];

const FAQS = [
  {
    question: 'Is vibe coding safe?',
    answer:
      'Vibe coding is safe only if you verify what the AI produced before real users touch it. In 2026 research, 91% of audited vibe-coded apps contained at least one vulnerability and the best coding agents produced secure code in under 12% of realistic tasks. The tools are not unsafe to use; shipping their output unreviewed is. A systematic security scan before launch closes most of the gap.',
  },
  {
    question: 'Can vibe-coded apps be hacked?',
    answer:
      'Yes, and they are. Passive scans of live AI-built apps in 2026 found that 57% of Supabase-backed apps allowed anyone to read database tables without logging in, 1 in 23 shipped hardcoded secrets in public bundles, and 16% allowed anonymous users to modify or delete data. None of these required sophisticated attackers, only someone who looked.',
  },
  {
    question: 'What are the biggest vibe coding security risks?',
    answer:
      'Broken access control (checking that a user is logged in but not that they own the resource), exposed API keys and secrets, misconfigured database access rules, missing input validation leading to injection and XSS, missing security headers and CSRF protection, server-side request forgery, insecure file uploads, and insecure payment handling. Hallucinated or vulnerable dependencies are a growing tenth category.',
  },
  {
    question: 'Which AI coding tool is the most secure?',
    answer:
      'No tool is meaningfully safer than the others on this dimension. Tenzai ran identical prompts through Claude Code, Cursor, Windsurf, Replit, and Devin and every one of them introduced server-side request forgery and none added CSRF protection or security headers. Veracode found security pass rates flat between 45% and 55% across more than 150 models regardless of release date. Pick the tool you are most productive in and add verification around it.',
  },
  {
    question: 'How do I make my vibe-coded app secure?',
    answer:
      'Three steps. First, tell the AI what secure looks like with a rules file in your repo that requires authorization checks, schema validation, and environment variables for secrets. Second, enforce guardrails your AI cannot skip: row-level security on the database, a secret scanner in CI, and security headers set in framework config. Third, scan the whole codebase before launch with a tool like Vibe Check, fix the critical findings, and re-scan after every major feature.',
  },
  {
    question: 'Do I need a security expert to ship a vibe-coded app?',
    answer:
      'Not for a typical SaaS, marketing site, or internal tool. The vulnerabilities AI introduces are overwhelmingly well-understood classes with known fixes, and the fix instructions can be handed straight back to your coding agent. You need an expert when you handle regulated data (health, financial, children), process card data yourself instead of through a provider, or face a customer security review.',
  },
  {
    question: 'How often should I scan a vibe-coded app for security issues?',
    answer:
      'Before the first real user, after every feature that touches auth, payments, file handling, or user data, and on a schedule of roughly once a month. AI coding tools make different decisions in every session, so a codebase that passed last month can regress after a week of prompting.',
  },
];

const SOURCES = [
  {
    name: 'Understanding the (In)Security of Vibe-Coded Applications',
    detail:
      'Deng, Fan, Meng. arXiv, June 2026 (revised September 2026). 9,041 open-source AI-built apps examined, 200 deployed apps audited.',
    url: 'https://arxiv.org/abs/2606.23130',
  },
  {
    name: 'Is Vibe Coding Safe? Benchmarking Vulnerability of Agent-Generated Code in Real-World Tasks',
    detail:
      'Zhao et al., Carnegie Mellon University. ICML 2026. The SUSVIBES benchmark: 186 repository-level tasks across 79 CWE categories.',
    url: 'https://arxiv.org/abs/2512.03262',
  },
  {
    name: 'Bad Vibes: Comparing the Secure Coding Capabilities of Popular Coding Agents',
    detail:
      'Tenzai Research. Identical prompts through Claude Code, Cursor, Windsurf, Replit, and Devin; 69 vulnerabilities across 15 apps.',
    url: 'https://blog.tenzai.com/bad-vibes-comparing-the-secure-coding-capabilities-of-popular-coding-agents',
  },
  {
    name: 'The State of Security of Vibe Coded Apps',
    detail:
      'Escape. Passive scan of 5,600+ production apps: 2,000+ vulnerabilities, 400+ exposed secrets, 175 PII leaks.',
    url: 'https://escape.tech/state-of-security-of-vibe-coded-apps',
  },
  {
    name: 'Spring 2026 GenAI Code Security Update',
    detail:
      'Veracode, March 2026. 150+ models, 80 tasks, four languages. 45% of tasks produced insecure code; XSS pass rate 15%.',
    url: 'https://www.veracode.com/blog/spring-2026-genai-code-security/',
  },
  {
    name: 'Vibe Coding Security Report, August 2026',
    detail:
      'VibeEval. Passive scan of 30,998 live AI-generated web apps, August 12–14, 2026.',
    url: 'https://vibe-eval.com/updates/vibe-coding-security-monthly-aug-2026/',
  },
  {
    name: 'Vibe Coding Security Debt: AI-Generated Vulnerabilities at Scale',
    detail:
      'Cloud Security Alliance research note, April 2026. 19.7% of 2.23 million AI-generated code samples referenced a package that does not exist.',
    url: 'https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-codegen-vulnerability-debt-20260406-csa/',
  },
  {
    name: 'CVE-2025-48757: Lovable row-level security bypass',
    detail:
      'Matt Palmer, May 2025. 303 endpoints across 170 Lovable projects readable or writable without authentication.',
    url: 'https://mattpalmer.io/posts/2025/05/CVE-2025-48757/',
  },
];

const linkClass = 'text-primary underline underline-offset-4 hover:text-primary/80';
const codeClass = 'rounded bg-muted px-1.5 py-0.5 text-sm font-mono';

export default function VibeCodingSecurityGuide() {
  const articleJsonLd = getGuideArticleJsonLd(
    'Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked',
    META_DESCRIPTION,
    PAGE_URL
  );

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Vibe Check', url: BASE_URL },
    { name: 'Guides', url: `${BASE_URL}/guides` },
    { name: 'Vibe Coding Security', url: PAGE_URL },
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
                Vibe Coding Security
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <Badge className="mb-4">Security Guide</Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Vibe Coding Security: How to Ship AI-Built Apps Without Getting Hacked
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              What the 2026 research says about AI-generated code, the ten security risks
              that show up in almost every vibe-coded app, how to fix each one, and how to
              scan your own codebase for free before an attacker does.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <p className="mb-4 text-muted-foreground">
                If you built an app with Cursor, Lovable, Bolt, v0, Replit, or Claude Code and
                you are about to put it in front of real users, this guide is for you. It is
                written for founders and developers who ship fast with AI, not for security
                teams. Every risk below comes with a plain-language explanation of what the
                AI got wrong, why it keeps getting it wrong, and the specific fix. The last
                third of the guide shows you how to check your own codebase in a few minutes
                using a free, open-source scanner that runs inside the coding tool you already
                use.
              </p>
              <p className="text-muted-foreground">
                The short version: vibe coding is not inherently unsafe, but the output is
                unsafe by default. The tools are optimised to make code work, and working
                code and secure code are different targets. Until you verify, assume the
                gaps are there.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Is Vibe Coding Safe?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Not out of the box. Every independent study published in 2025 and 2026 that
                looked at AI-generated applications reached the same conclusion: the code
                usually works, and it usually has at least one serious security hole. That
                is true across tools, across models, and across model generations. The
                functional quality of AI code has improved dramatically. The security
                quality has barely moved.
              </p>
              <p className="mb-6 text-muted-foreground">
                The numbers below are from peer-reviewed research, vendor-neutral security
                labs, and large passive scans of live production apps. Full citations are
                at the end of the guide.
              </p>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                {SECURITY_STATS.map((item) => (
                  <Card key={item.stat + item.label}>
                    <CardContent className="pt-6">
                      <p className="text-3xl font-bold tracking-tight text-primary">
                        {item.stat}
                      </p>
                      <p className="mt-2 text-sm text-foreground">{item.label}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{item.source}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mb-4 text-muted-foreground">
                Two of these deserve a closer look. The Carnegie Mellon team behind the
                SUSVIBES benchmark gave coding agents 186 real repository tasks where human
                developers had previously shipped a vulnerability, then checked whether the
                agent&apos;s solution was both correct and secure. The best combination they
                tested was functionally correct 57% of the time and secure 11.8% of the
                time. The agents were solving the problem. They were not solving it safely.
              </p>
              <p className="mb-4 text-muted-foreground">
                Veracode has run the same 80 tasks against every major model since 2023.
                Over that period the syntax pass rate climbed from roughly 50% to 95%. The
                security pass rate stayed between 45% and 55% the entire time, regardless
                of which model or when it was released. Cross-site scripting and log
                injection, the two flaws that require reasoning about how data flows across
                several files, passed only 15% and 13% of the time in the Spring 2026
                update. Newer models write better code. They do not write safer code.
              </p>
              <p className="text-muted-foreground">
                So the honest answer to &ldquo;is vibe coding safe?&rdquo; is: it is exactly
                as safe as your verification step. Teams that scan and fix before launch ship
                apps that hold up. Teams that trust the output become the statistics above.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                What Is Vibe Coding, and Why Is Security Its Blind Spot?
              </h2>
              <p className="mb-4 text-muted-foreground">
                Vibe coding is the practice of building software primarily through AI coding
                assistants. Instead of writing every line by hand, you describe what you
                want in natural language and let tools like Cursor, Lovable, Bolt, v0, and
                Claude Code generate the implementation. You set the direction; the AI writes
                the code. Andrej Karpathy coined the term in February 2025, and within about
                16 months it had moved from a hobbyist technique to something enterprise
                security teams were writing governance notes about.
              </p>
              <p className="mb-4 text-muted-foreground">
                This approach has dramatically lowered the barrier to shipping software.
                Solo founders launch SaaS products in a weekend. Designers build functional
                prototypes without backend experience. Teams that used to spend months on an
                MVP now ship in days. The productivity gains are real and they are not going
                away.
              </p>
              <p className="text-muted-foreground">
                But speed creates blind spots. When you move from idea to deployed app in
                hours, entire categories of requirements get skipped, not because you are
                careless but because AI tools don&apos;t surface what they don&apos;t build.
                Security is the most dangerous of these blind spots, because the
                consequences are invisible until someone exploits them. A missing feature is
                obvious. A missing authorization check looks identical to a working one
                until the wrong user requests the wrong record.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Why AI-Generated Code Has Security Gaps
              </h2>
              <p className="mb-4 text-muted-foreground">
                AI coding tools are optimized for a specific outcome: generating code that
                works. When you ask Cursor to build a login page, it produces a login page
                that accepts credentials and authenticates users. That is what you asked
                for, and it delivers. What it does not do, unless you specifically request
                it, is add rate limiting to prevent brute force attacks, set session
                expiration policies, implement account lockout after failed attempts, or
                log authentication events for monitoring.
              </p>
              <p className="mb-4 text-muted-foreground">
                This is not a flaw in any single tool. It is structural. These models are
                trained on vast quantities of open-source code, tutorials, and
                documentation, and most of that source material demonstrates functionality,
                not hardening. A Stack Overflow answer showing how to handle file uploads
                rarely includes MIME type validation, size limits, or storage isolation. The
                AI learns to replicate what it has seen most often, which is code that works
                in development.
              </p>
              <p className="mb-4 text-muted-foreground">
                The 2026 study of 9,041 AI-built applications traced the recurring
                failures back to three kinds of defect. Memory defects: the agent forgets a
                constraint it established earlier in the session, such as which routes need
                an admin check. Objective defects: the agent optimises for the stated goal
                (&ldquo;make the dashboard load&rdquo;) at the expense of an unstated one
                (&ldquo;only for this user&apos;s data&rdquo;). Knowledge defects: the agent
                does not know a framework&apos;s secure default has to be switched on, or
                reaches for a package that does not exist. Better prompting reduces all
                three. It does not eliminate them.
              </p>
              <p className="text-muted-foreground">
                Tenzai&apos;s comparison of five coding agents found the same split from a
                different angle. The agents were good at avoiding flaws with a generic fix,
                such as SQL injection, where &ldquo;always use parameterized queries&rdquo;
                is the whole answer. They were bad at flaws where safe and dangerous depend
                on context: whether this particular endpoint should require admin, whether
                a price can be negative, whether a user-supplied URL should be fetched at
                all. Those are exactly the decisions your app&apos;s security rests on, and
                they are the ones you have to check.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                The Top Vibe Coding Security Risks
              </h2>
              <p className="mb-8 text-muted-foreground">
                These ten categories account for the overwhelming majority of findings in
                every audit of AI-generated code published to date. They are ordered roughly
                by how often they appear and how much damage they do.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    1. Broken Access Control
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    This is the single most common vulnerability in vibe-coded apps, and the
                    one AI tools are structurally worst at. The pattern is consistent: the
                    AI checks whether a request comes from a logged-in user, and then trusts
                    whatever ID that user supplies. Change the number at the end of{' '}
                    <code className={codeClass}>/api/invoices/1042</code> to 1043 and you are
                    reading someone else&apos;s invoice. Security researchers call this an
                    insecure direct object reference, or IDOR. The 2026 audit of 200 deployed
                    AI-built apps found broken access control was the leading vulnerability
                    class, and Tenzai found every agent it tested skipped ownership checks
                    somewhere.
                  </p>
                  <p className="text-muted-foreground">
                    The fix is a discipline, not a library: every query that returns or
                    mutates a resource must be scoped to the current user or their
                    organisation, and every admin-only route must verify the admin role on
                    the server, not just hide the button in the UI. Tell your AI tool
                    explicitly, in a rules file, that authentication and authorization are
                    separate checks and both are required.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    2. Authentication Vulnerabilities
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Authentication is the front door to your application, and AI-generated
                    auth code consistently leaves it unlocked. The most common issue is
                    missing rate limiting: without it, an attacker can attempt thousands of
                    password combinations per second with no friction. AI tools also generate
                    sessions that never expire, meaning a stolen token grants permanent
                    access.
                  </p>
                  <p className="text-muted-foreground">
                    Other frequent gaps include predictable password reset tokens (sequential
                    IDs or short numeric codes that can be brute-forced), missing
                    multi-factor authentication, and session tokens that are not invalidated
                    on password change. If you built auth with an AI tool, these are the
                    first things to check. See the full{' '}
                    <Link href="/features/auth" className={linkClass}>
                      authentication checklist
                    </Link>{' '}
                    for a complete audit guide.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    3. Exposed API Keys and Secrets
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI coding assistants frequently place API keys directly in source code.
                    When you ask an AI to integrate with Stripe, Resend, or any third-party
                    service, it often hardcodes the key in the file where it is used rather
                    than referencing an environment variable. If that file is client-side
                    JavaScript, the key is visible to anyone who opens browser dev tools. The
                    August 2026 scan of nearly 31,000 live AI-built apps found one in 23
                    shipping secrets in public bundles or config files. Escape&apos;s scan of
                    5,600 apps found more than 400.
                  </p>
                  <p className="text-muted-foreground">
                    Even when keys land in server-side code, they end up committed to git
                    history where they persist after deletion. Without secret rotation and
                    proper environment variable management, a single exposed key can grant
                    attackers access to your payment processor, email service, or database.
                    Put a secret scanner in CI so this class of mistake cannot reach main. The{' '}
                    <Link href="/features/monitoring" className={linkClass}>
                      monitoring checklist
                    </Link>{' '}
                    covers how to detect and prevent secret exposure.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    4. Misconfigured Databases and Missing Row-Level Security
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Most vibe-coded apps use a hosted backend such as Supabase or Firebase,
                    where the browser talks to the database directly using a public key and
                    the database itself enforces who can read what. That model is secure only
                    if row-level security policies are enabled and written correctly. AI
                    tools routinely create tables without enabling RLS, or generate a policy
                    of <code className={codeClass}>USING (true)</code> to make the feature
                    work, which grants every visitor access to every row.
                  </p>
                  <p className="text-muted-foreground">
                    This was the mechanism behind CVE-2025-48757, where 303 endpoints across
                    170 Lovable-built projects were readable or writable without logging in.
                    Over a year later the problem has grown, not shrunk: the August 2026
                    scan found 57% of reachable Supabase-backed apps still permitted
                    unauthenticated table reads, and 16% of all apps scanned allowed
                    anonymous users to modify or delete data. If your app uses a hosted
                    backend, verifying every table&apos;s policies is the highest-value
                    hour you can spend.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    5. Missing Input Validation: Injection and XSS
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    When AI generates forms, API endpoints, or database queries, it typically
                    trusts user input implicitly. Form fields accept any value without length
                    limits or format validation. API endpoints pass request bodies directly
                    to database queries. User-submitted content renders in the browser
                    without sanitization.
                  </p>
                  <p className="text-muted-foreground">
                    These patterns enable the most common web vulnerabilities: SQL injection
                    (manipulating database queries through form fields), cross-site scripting
                    or XSS (injecting JavaScript that runs in other users&apos; browsers), and
                    command injection (executing system commands through unsanitized input).
                    Models have largely learned to avoid SQL injection, which Veracode now
                    measures at an 82% to 86% pass rate. XSS is a different story: only 15%
                    of generated code defended against it in the Spring 2026 tests, because
                    doing so requires tracking data across the request handler, the template,
                    and the client. A single unsanitized field can compromise every user who
                    visits your site.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    6. Insecure File Uploads
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    File upload is one of the most exploited attack vectors on the web, and
                    AI-generated upload handlers are almost always missing critical
                    safeguards. A typical implementation accepts any file, stores it in a
                    publicly accessible directory, and uses the original filename, which
                    opens the door to path traversal, executable uploads, and storage abuse.
                  </p>
                  <p className="text-muted-foreground">
                    Secure file upload requires validating both the MIME type and file
                    extension, enforcing size limits, generating random filenames, storing
                    files outside the web root, and scanning for malware. Most AI tools
                    implement none of these by default. Review the{' '}
                    <Link href="/features/file-uploads" className={linkClass}>
                      file uploads checklist
                    </Link>{' '}
                    to see what your implementation may be missing.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    7. Missing Security Headers and CSRF Protection
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Security headers are the cheapest defence on the web. A content security
                    policy blunts XSS. X-Frame-Options stops clickjacking. HSTS prevents
                    protocol downgrade attacks. Every one of them is a few lines in your
                    framework&apos;s config, and AI tools almost never add them because no
                    tutorial does. In Tenzai&apos;s study, none of the 15 apps built by five
                    different agents set a single security header, and none had CSRF
                    protection.
                  </p>
                  <p className="text-muted-foreground">
                    Cross-site request forgery matters whenever your app uses cookie-based
                    sessions: without a SameSite attribute or an anti-CSRF token, a malicious
                    page can make your logged-in user&apos;s browser submit requests they
                    never intended. If your app uses bearer tokens in an Authorization
                    header you are largely covered. If it uses cookies, check.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    8. Server-Side Request Forgery
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Any feature that fetches a URL the user supplies is an SSRF risk: link
                    previews, webhook registrations, &ldquo;import from URL&rdquo;, image
                    proxies, PDF generators. AI tools implement these by passing the URL
                    straight to a fetch call. An attacker supplies an internal address,
                    such as a cloud metadata endpoint or an admin service on localhost, and
                    your server dutifully retrieves it for them.
                  </p>
                  <p className="text-muted-foreground">
                    Tenzai found that every one of the five agents it tested introduced SSRF.
                    It is one of the clearest examples of a context-dependent vulnerability:
                    fetching a URL is fine, fetching an arbitrary user-controlled URL from a
                    privileged server is not, and the model cannot tell the difference
                    without being told. Resolve and validate the destination, block private
                    and link-local ranges, and allowlist where you can.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    9. Insecure Payment Handling
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    Payment integration is where security gaps become directly expensive.
                    AI-generated payment code often processes sensitive operations
                    client-side, where they can be manipulated. Price calculations happen in
                    the browser. Subscription status is checked by reading local state rather
                    than verifying with the payment provider. Webhook endpoints accept
                    payloads without verifying signatures. Tenzai&apos;s e-commerce test apps
                    accepted negative quantities and prices.
                  </p>
                  <p className="text-muted-foreground">
                    Without idempotency keys, network retries can charge customers multiple
                    times. Without webhook verification, attackers can forge payment
                    confirmations and access paid features for free. The{' '}
                    <Link href="/features/payments" className={linkClass}>
                      payments checklist
                    </Link>{' '}
                    walks through every critical check for AI-generated payment code.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-medium">
                    10. Hallucinated and Vulnerable Dependencies
                  </h3>
                  <p className="mb-3 text-muted-foreground">
                    AI tools add packages freely, and not all of them are real. The Cloud
                    Security Alliance analysed 2.23 million AI-generated code samples from
                    16 models and found 19.7% referenced at least one package that does not
                    exist. Attackers register those names on npm and PyPI and wait, a
                    technique now called slopsquatting. When the next developer&apos;s AI
                    suggests the same phantom package, it installs the attacker&apos;s code.
                  </p>
                  <p className="text-muted-foreground">
                    Even real packages carry risk. AI tools have no sense of whether a
                    library is maintained, how many downloads it has, or whether it has open
                    CVEs; they reach for whatever appeared most often in training data,
                    which skews old. Audit every dependency the AI added: confirm it exists,
                    check its maintenance status, and run a vulnerability scanner in CI.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How to Secure Vibe-Coded Apps
              </h2>
              <p className="mb-6 text-muted-foreground">
                You do not need to stop using AI tools or start reviewing every line by
                hand. You need three layers: instructions the AI follows, guardrails the AI
                cannot bypass, and verification before you ship. Here is what each looks
                like in practice.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    Tell the AI what secure looks like, once
                  </h3>
                  <p className="text-muted-foreground">
                    Every major coding tool reads a rules file from your repository: CLAUDE.md
                    for Claude Code, .cursor/rules for Cursor, AGENTS.md for Codex and
                    others. Put your security requirements there so they apply to every
                    session instead of every prompt. The requirements that pay off most:
                    every data access must be scoped to the current user; secrets come from
                    environment variables only; every API route validates its input with a
                    schema; new tables get row-level security enabled before any code uses
                    them; never disable a security feature to make a test pass. This
                    directly addresses the memory and objective defects the research
                    identifies, because the constraint is re-read on every turn.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    Validate at the boundary
                  </h3>
                  <p className="text-muted-foreground">
                    Define a schema for every request body, query string, and form
                    submission using Zod or an equivalent, and reject anything that does not
                    match before it reaches business logic. This one habit eliminates most
                    injection, type-confusion, and mass-assignment bugs, and it gives the AI
                    a concrete pattern to copy. Pair it with parameterized queries or an ORM
                    for database access and an auto-escaping template layer for output.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    Authorize every resource, not just every request
                  </h3>
                  <p className="text-muted-foreground">
                    Middleware that confirms a user is logged in is necessary and not
                    sufficient. Each handler must also confirm the user is allowed to touch
                    the specific record they asked for. The cleanest implementation is a
                    data-access layer where every query takes the current user and filters
                    by ownership, so it is impossible to forget. If you use Supabase or
                    Firebase, that layer is your row-level security or security rules, and
                    every table needs a real policy.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    Make the secure default the only default
                  </h3>
                  <p className="text-muted-foreground">
                    Some protections should not depend on the AI remembering them. Set
                    security headers in your framework config or hosting platform once.
                    Turn on rate limiting at the edge or in middleware for auth routes. Add a
                    secret scanner such as gitleaks to CI so a hardcoded key fails the build.
                    Enable dependency auditing in CI. These guardrails are invisible during
                    day-to-day vibe coding and catch the mistakes that matter most.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    Verify before you ship, and again after every big change
                  </h3>
                  <p className="text-muted-foreground">
                    Instructions and guardrails reduce the error rate. They do not take it to
                    zero, and AI tools make different decisions in every session. A
                    systematic scan of the whole codebase before launch, and after any
                    feature that touches auth, payments, uploads, or user data, is the step
                    that separates the teams that ship safely from the ones in the
                    statistics. The next section shows how to do it in a few minutes.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                How to Check Your Vibe-Coded App for Security Gaps
              </h2>
              <p className="mb-4 text-muted-foreground">
                Spot-checking individual files is not enough. Security gaps in AI-generated
                code are distributed across the entire codebase: a missing rate limiter here,
                an unvalidated input there, a hardcoded secret somewhere else. An effective
                audit requires a systematic scan across every domain: authentication, file
                handling, payment processing, API security, data storage, and infrastructure
                configuration.
              </p>
              <p className="mb-6 text-muted-foreground">
                Vibe Check automates this. It is a free, open-source production readiness
                scanner that installs as a skill inside the AI coding tool you already use,
                reads your actual code, and reports specific gaps with plain-language fix
                instructions you can hand straight back to the AI. It works in nine
                harnesses: Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro,
                OpenCode, Antigravity, and Pi.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Step 1: Install</h3>
                  <p className="mb-3 text-muted-foreground">
                    From the root of your project, run one command. It detects which coding
                    tool you use and installs the right skill files.
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
                    <code>npx skills add Hypership-Software/vibe-check</code>
                  </pre>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Step 2: Run the check</h3>
                  <p className="mb-3 text-muted-foreground">
                    In Claude Code, run the check skill. In Cursor the same skill is invoked
                    as <code className={codeClass}>@vibe-check check</code>, and in VS Code
                    Copilot as <code className={codeClass}>#vibe-check check</code>. To scan
                    only the security domain, pass it as the focus.
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
                    <code>{'/check\n/check security'}</code>
                  </pre>
                  <p className="mt-3 text-muted-foreground">
                    The check asks four short context questions (what you are building, who
                    it is for, what data it handles, what is at stake), maps your codebase,
                    then runs a specialised assessor for each production domain in parallel.
                    Domains that do not apply to your project are skipped. The security
                    assessor checks nine items against your real code:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {SECURITY_ASSESSOR_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Step 3: Read the score</h3>
                  <p className="text-muted-foreground">
                    You get a score out of 100 and a band: Production Ready (90+), Launch
                    Ready (75 to 89), Needs Work (60 to 74), or Early Stage (below 60).
                    Critical security failures gate the band: an app that scores 92 but has
                    a hardcoded API key is capped at Needs Work until the key is removed, so
                    a good overall score can never hide a dangerous finding. Every finding
                    comes with a priority, an explanation calibrated to your context, and a
                    fix instruction written for your AI tool.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Step 4: Fix and re-check</h3>
                  <p className="mb-3 text-muted-foreground">
                    Run the fix skill to walk through findings one at a time. It proposes
                    the change and applies it only after you approve. When you are done, or
                    a week later after more vibe coding, re-run to see what improved and
                    whether anything regressed.
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
                    <code>{'/fix\n/refresh'}</code>
                  </pre>
                </div>
              </div>

              <p className="mt-6 text-muted-foreground">
                Everything is written to a <code className={codeClass}>.vibe-check/</code>{' '}
                directory in your repo, so the report, the checklist, and the action plan
                travel with the code and give you a record of what was checked and when. If
                you would rather start without code access, the web app at{' '}
                <Link href="/#check-your-app" className={linkClass}>
                  vibe-check.cloud
                </Link>{' '}
                walks you through the same domains as guided questions and links to the
                detailed{' '}
                <Link href="/features" className={linkClass}>
                  feature checklists
                </Link>
                .
              </p>
              <p className="mt-4 text-muted-foreground">
                Sometimes the question is bigger than a scan. If you handle regulated data,
                are heading into a funding round or a customer security review, or a partner
                has asked for validation from someone independent, Hypership, the team
                behind Vibe Check, runs an{' '}
                <a
                  href="https://hypership.tech/ai-built-software-audits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  independent audit of AI-built software
                </a>
                : security and data access, build quality, product experience, and
                commercial readiness, with findings ranked by business cost and a report in
                about a week. Run the free scanner first. Call them when the stakes justify
                it.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Vibe Coding Security Checklist
              </h2>
              <p className="mb-6 text-muted-foreground">
                Print this, or paste it into your coding tool and ask it to audit the
                codebase against each line. Every item maps to one of the ten risks above.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Essential Security Items for AI-Built Apps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {CHECKLIST_ITEMS.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">
                Vibe Coding Security FAQ
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
                Scan Your App for Security Gaps
              </h2>
              <p className="mb-6 text-muted-foreground">
                Find out what your AI coding tool missed before an attacker does. Free,
                open source, runs inside the tool you already use.
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
                <Link href="/guides/vibe-coding-governance" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Vibe Coding Governance: Guardrails for Startups and Small Teams
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        How to put lightweight governance around AI-assisted development
                        without an enterprise security team: rules files, CI guardrails,
                        review boundaries, and a launch gate.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/guides/cursor-production-ready" className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
                  <Card className="transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Is Your Cursor App Production Ready?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The complete production readiness checklist for apps built with
                        Cursor and other AI coding tools.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>

          <RelatedGuides slug="vibe-coding-security" />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
