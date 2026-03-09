import { z } from 'zod';

const MAX_DESCRIPTION_LENGTH = 1000;

const ToolSchema = z.enum(['lovable', 'cursor', 'bolt', 'v0', 'chatgpt', 'claude-code']);

export const CheckAppSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, 'Please describe what you are building')
    .max(MAX_DESCRIPTION_LENGTH, `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`),
  tools: z.array(ToolSchema).default([]),
});

export type CheckAppInput = z.infer<typeof CheckAppSchema>;
