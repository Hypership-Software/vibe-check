export async function GET() {
  const content = `# Vibe Check

> AI code review for vibe coders. Catches what AI-generated code misses — security holes, performance traps, and production blind spots.

Built by [Hypership](https://hypership.tech), a Belfast-based AI-native software consultancy.

## What It Does
Vibe Check is a code review tool designed specifically for the vibe coding workflow — where developers use AI tools like Cursor, Bolt, Lovable, and v0 to generate code rapidly. It catches the gaps that AI code generators leave behind.

## Guides
- [Vibe Coding Security Guide](https://vibe-check.cloud/guides/vibe-coding-security): Security risks in AI-generated code and how to mitigate them
- [Vibe Coding Risks](https://vibe-check.cloud/guides/vibe-coding-risks): Common failure modes when building with AI code generators
- [Vibe Coding Failures](https://vibe-check.cloud/guides/vibe-coding-failures): Real-world case studies of vibe coding gone wrong
- [What Is Vibe Testing](https://vibe-check.cloud/guides/what-is-vibe-testing): Testing strategies for AI-generated codebases
- [AI Code Review Tools](https://vibe-check.cloud/guides/ai-code-review-tools): Comparison of AI code review tools in 2026
- [Is Cursor Production Ready?](https://vibe-check.cloud/guides/cursor-production-ready): Assessment of Cursor for production use
- [Is Lovable Production Ready?](https://vibe-check.cloud/guides/lovable-production-ready): Assessment of Lovable for production use
- [Is Bolt Production Ready?](https://vibe-check.cloud/guides/bolt-production-ready): Assessment of Bolt for production use
- [Is v0 Production Ready?](https://vibe-check.cloud/guides/v0-production-ready): Assessment of v0 for production use

## Features
- [Features Overview](https://vibe-check.cloud/features): All Vibe Check features

## Resources
- [Learn](https://vibe-check.cloud/learn): Educational content on vibe coding best practices
- [Download](https://vibe-check.cloud/download): Get Vibe Check

## Contact
- Website: https://vibe-check.cloud
- Parent company: https://hypership.tech
- Email: human@hypership.tech
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
