// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// TODO: replace YOUR-USERNAME with your actual GitHub username.
	// This assumes a GitHub "user site" (repo named YOUR-USERNAME.github.io),
	// which serves at the domain root — see README.md for why, and for the
	// alternative if you'd rather use a differently-named repo.
	site: 'https://YOUR-USERNAME.github.io',
	integrations: [
		starlight({
			title: 'M-Cell Archive',
			tagline: 'Delta Green campaign tracker',
			social: [],
			tableOfContents: false,
			sidebar: [
				{
					label: 'Campaign Overview',
					items: [{ label: 'Start Here', slug: 'index' }],
				},
				{
					label: 'Main Characters',
					items: [{ autogenerate: { directory: 'characters' } }],
				},
				{
					label: 'NPCs',
					items: [
						{
							label: 'Delta Green',
							items: [{ autogenerate: { directory: 'npcs/delta-green' } }],
						},
						{
							label: 'Bonds',
							items: [{ autogenerate: { directory: 'npcs/bonds' } }],
						},
						{
							label: 'Suspects & Witnesses',
							items: [{ autogenerate: { directory: 'npcs/suspects-witnesses' } }],
						},
					],
				},
				{
					label: 'Cases',
					items: [{ autogenerate: { directory: 'cases' } }],
				},
				{
					label: 'Timeline',
					items: [{ label: 'Case Timeline', slug: 'timeline' }],
				},
				{
					label: 'Sessions',
					items: [{ autogenerate: { directory: 'sessions' } }],
				},
				{
					label: 'Evidence Locker',
					items: [{ autogenerate: { directory: 'evidence' } }],
				},
				{
					label: 'Locations',
					items: [{ autogenerate: { directory: 'locations' } }],
				},
				{
					label: 'Key Moments',
					items: [{ autogenerate: { directory: 'moments' } }],
				},
				{
					label: 'Mysteries & Loose Threads',
					items: [{ autogenerate: { directory: 'mysteries' } }],
				},
			],
		}),
	],
});
