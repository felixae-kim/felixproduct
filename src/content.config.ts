import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(['product', 'think']),
			// Posts sharing a series get prev/next navigation, ordered by filename.
			series: z.string().optional(),
			// Surfaced on the home page as an entry point, newest first.
			featured: z.boolean().default(false),
		}),
});

export const collections = { posts };
