// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { visit } from 'unist-util-visit';
import rehypeRaw from 'rehype-raw';

// This project deploys as a GitHub Pages *project* site
// (https://davidevantosh.github.io/deltagreen/), which requires a `base`
// path. Astro/Starlight only auto-prefixes Starlight's own generated
// navigation with `base` — NOT hand-written links or <img> tags inside
// markdown content (this is a documented upstream limitation, see
// https://github.com/withastro/starlight/discussions/1763). Since this
// wiki has hundreds of root-relative links and character portrait images
// written directly in markdown, this rehype plugin rewrites them at build
// time so everything resolves correctly under the /deltagreen/ subpath.
const BASE = '/deltagreen';

/** Prefixes root-relative href/src attributes with BASE, leaving external
 * links, anchors, and already-prefixed paths untouched. */
function rehypeBasePrefix() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			const attr = node.tagName === 'a' ? 'href' : node.tagName === 'img' ? 'src' : null;
			if (!attr) return;
			const value = node.properties?.[attr];
			if (
				typeof value === 'string' &&
				value.startsWith('/') &&
				!value.startsWith(BASE + '/') &&
				value !== BASE
			) {
				node.properties[attr] = BASE + value;
			}
		});
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://davidevantosh.github.io',
	base: BASE,
	markdown: {
		// rehypeRaw MUST run first: Astro passes embedded raw HTML (like our
		// character portrait <img> tags) through as unparsed text by default,
		// invisible to other rehype plugins. rehypeRaw parses it into proper
		// traversable elements so rehypeBasePrefix can actually find and fix it.
		rehypePlugins: [rehypeRaw, rehypeBasePrefix],
	},
	integrations: [
		starlight({
			title: 'Delta Green',
			tagline: 'Delta Green campaign tracker',
			logo: {
				src: './src/assets/delta-green-logo.png',
				replacesTitle: true,
			},
			social: [],
			tableOfContents: false,
			// Site is dark-mode only — these two overrides remove the
			// light/dark/auto toggle and hard-set dark before first paint.
			// See src/components/ThemeProvider.astro and ThemeSelect.astro.
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			sidebar: [
				{
					label: 'Campaign Overview',
					items: [{ label: 'Overview', slug: 'index' }],
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
					label: 'Evidence Locker',
					items: [
						{
							label: 'Operation ALICE',
							items: [{ autogenerate: { directory: 'evidence/operation-alice' } }],
						},
						{
							label: 'The Baughman Sweep',
							items: [{ autogenerate: { directory: 'evidence/the-baughman-sweep' } }],
						},
						{
							label: 'Operation CONVERGENCE',
							items: [{ autogenerate: { directory: 'evidence/operation-convergence' } }],
						},
						{
							label: 'Operation INDIA MOON',
							items: [{ autogenerate: { directory: 'evidence/operation-india-moon' } }],
						},
					],
				},
				{
					label: 'Locations',
					items: [
						{
							label: 'Operation ALICE',
							items: [{ autogenerate: { directory: 'locations/operation-alice' } }],
						},
						{
							label: 'The Baughman Sweep',
							items: [{ autogenerate: { directory: 'locations/the-baughman-sweep' } }],
						},
						{
							label: 'Operation CONVERGENCE',
							items: [{ autogenerate: { directory: 'locations/operation-convergence' } }],
						},
						{
							label: 'Operation INDIA MOON',
							items: [{ autogenerate: { directory: 'locations/operation-india-moon' } }],
						},
					],
				},
				{
					label: 'Key Moments',
					items: [
						{
							label: 'Operation ALICE',
							items: [{ autogenerate: { directory: 'moments/operation-alice' } }],
						},
						{
							label: 'The Baughman Sweep',
							items: [{ autogenerate: { directory: 'moments/the-baughman-sweep' } }],
						},
						{
							label: 'Operation CONVERGENCE',
							items: [{ autogenerate: { directory: 'moments/operation-convergence' } }],
						},
						{
							label: 'Operation INDIA MOON',
							items: [{ autogenerate: { directory: 'moments/operation-india-moon' } }],
						},
					],
				},
				{
					label: 'Mysteries & Loose Threads',
					items: [{ autogenerate: { directory: 'mysteries' } }],
				},
				{
					label: 'Sessions',
					items: [{ autogenerate: { directory: 'sessions' } }],
				},
			],
		}),
	],
});
