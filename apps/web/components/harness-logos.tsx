const HARNESSES = [
  { name: 'Claude Code', short: 'Claude Code' },
  { name: 'Cursor', short: 'Cursor' },
  { name: 'Gemini CLI', short: 'Gemini CLI' },
  { name: 'Codex CLI', short: 'Codex CLI' },
  { name: 'VS Code Copilot', short: 'Copilot' },
  { name: 'Kiro', short: 'Kiro' },
  { name: 'OpenCode', short: 'OpenCode' },
  { name: 'Antigravity', short: 'Antigravity' },
  { name: 'Pi', short: 'Pi' },
];

export function HarnessLogos() {
  return (
    <section
      className="mx-auto max-w-4xl px-6 py-10"
      aria-label="Compatible AI coding tools"
    >
      <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Works with your favorite AI coding tool
      </p>
      <ul
        className="flex flex-wrap items-center justify-center gap-3"
        aria-label="Supported AI coding harnesses"
      >
        {HARNESSES.map((harness) => (
          <li key={harness.name}>
            <span
              className="inline-flex items-center rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground"
              aria-label={harness.name}
            >
              {harness.short}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
