import Image from 'next/image';
import { cn } from '@/lib/utils';

const HARNESSES: Array<{ name: string; logo: string; needsDarkBg?: boolean }> = [
  { name: 'Claude Code', logo: '/claude-logo.png' },
  { name: 'Cursor', logo: '/cursor-logo.png' },
  { name: 'Gemini CLI', logo: '/gemini-logo.png' },
  { name: 'Codex CLI', logo: '/codex-logo.png' },
  { name: 'VS Code Copilot', logo: '/copilot-logo.png' },
  { name: 'Kiro', logo: '/kiro-logo.png' },
  { name: 'OpenCode', logo: '/opencode-logo.png' },
  { name: 'Antigravity', logo: '/antigravity-logo.png' },
  { name: 'Pi', logo: '/pi-logo.svg', needsDarkBg: true },
];

export function HarnessLogos() {
  return (
    <section
      className="mx-auto max-w-4xl px-6 py-10"
      aria-label="Compatible AI coding tools"
    >
      <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Works wherever you vibe
      </p>
      <ul
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        aria-label="Supported AI coding harnesses"
      >
        {HARNESSES.map((harness) => (
          <li key={harness.name}>
            <div
              className="group flex flex-col items-center gap-2"
              aria-label={harness.name}
            >
              <div className={cn(
                "relative h-10 w-10 grayscale opacity-60 transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:opacity-100 sm:h-12 sm:w-12",
                harness.needsDarkBg && "rounded-lg bg-neutral-800 p-1.5"
              )}>
                <Image
                  src={harness.logo}
                  alt={harness.name}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                {harness.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
