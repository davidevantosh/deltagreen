import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// what kind of wiki entry this page is
				entryType: z
					.enum([
						'overview',
						'character',
						'npc',
						'case',
						'session',
						'evidence',
						'location',
						'moment',
						'mystery',
					])
					.optional(),
				// alive / missing / deceased / unknown / open / resolved / etc — meaning depends on entryType
				status: z.string().optional(),
				// short tag chips shown on the page (e.g. "unnatural", "investigation", "combat")
				tags: z.array(z.string()).optional(),
				// which case this belongs to, e.g. "Operation ALICE"
				case: z.string().optional(),
				// session number(s) this entry is tied to / first appeared in
				sessions: z.array(z.number()).optional(),
				// in-game date string, e.g. "Thu 10 Aug 1995"
				inGameDate: z.string().optional(),
				// for NPCs: true if known/strongly presumed dead — drives the skull marker in the sidebar
				deceased: z.boolean().optional(),
			}),
		}),
	}),
};
