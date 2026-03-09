# vibe-check.com

A living, AI-aggregated field guide for vibe coders — helping developers understand the hidden complexity in common features and make informed build-vs-buy decisions.

## Tech Stack

### Core

- [Next.js](https://nextjs.org/docs) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/docs/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/docs) - UI components
- [Zod](https://zod.dev/) - Schema validation
- [Zustand](https://zustand.docs.pmnd.rs/) - Client state management
- [Luxon](https://moment.github.io/luxon/) - Date/time manipulation

### AI

- [Vercel AI SDK](https://sdk.vercel.ai/docs) - AI integration

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

### Directory Structure

```
├── app/                    # Next.js App Router pages and API routes
├── components/             # React components (including shadcn/ui)
├── services/               # Business logic services
│   └── *.service.ts
├── lib/
│   ├── config.ts           # Centralized environment variables
│   ├── stores/             # Zustand stores for client state
│   │   └── *.store.ts
└── public/                 # Static assets
```

## Client State Management (Zustand)

For complex multi-step forms or flows, use Zustand stores.

**Store location**: `lib/stores/*.store.ts`

### Store Pattern

```typescript
import { createStore, useStore } from "zustand";

interface FormState {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  description: "",
};

export const formStore = createStore<FormState>()((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  reset: () => set(initialState),
}));

export const useFormStore = <T>(selector: (state: FormState) => T): T => {
  return useStore(formStore, selector);
};
```

### Usage in Components

```tsx
"use client";
function MyForm() {
  const title = useFormStore((state) => state.title);
  const setTitle = useFormStore((state) => state.setTitle);

  return <input value={title} onChange={(e) => setTitle(e.target.value)} />;
}
```

## Code Style

### No Comments

Do not add comments to the codebase. Code should be self-documenting through:

- Clear, descriptive variable and function names
- Proper TypeScript types
- Logical code structure
- Small, focused functions

### Closure Variable Naming

Always use verbose singular names in closures (`.map()`, `.filter()`, etc.):

```typescript
// ✅ Correct
users.map((user) => user.email);
items.filter((item) => item.isActive);

// ❌ Wrong
users.map((u) => u.email);
items.filter((i) => i.isActive);
```

## Utility Functions

Import from `@/lib/utils`:

```typescript
import { cn, formatDate, formatRelative, debounce } from "@/lib/utils";

// Class name merging (shadcn/ui)
cn("text-sm", isActive && "text-blue-500");

// Date formatting with Luxon
formatDate(new Date()); // "Jan 15, 2024"
formatDate("2024-01-15", "yyyy-MM-dd"); // "2024-01-15"
formatRelative(new Date()); // "2 hours ago"

// Debounce function calls
const debouncedSearch = debounce((query: string) => {
  // search logic
}, 300);
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys.

**Important:** Import environment variables from `@/lib/config`:

```typescript
// ✅ Good
import { STRIPE_SECRET_KEY } from "@/lib/config";

// ❌ Avoid
const key = process.env.STRIPE_SECRET_KEY;
```

