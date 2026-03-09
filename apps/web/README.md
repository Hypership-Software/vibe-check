# complexity-game

A Next.js application scaffolded with [create-loadout](https://github.com/KylerD/create-loadout).

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and configure your API keys:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zod](https://zod.dev/) - Schema validation

### Integrations

- Vercel AI SDK

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Project Structure

```
├── app/           # Next.js App Router
├── components/    # React components
├── lib/           # Utilities and clients
├── services/      # Business logic
└── public/        # Static assets
```

## Environment Variables

See `.env.example` for all required environment variables.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [CLAUDE.md](./CLAUDE.md) - AI assistant context file
