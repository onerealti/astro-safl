// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightBasePath } from 'starlight-base-path';

// https://astro.build/config
export default defineConfig({
	site: 'https://onerealti.github.io',
	base: '/astro-safl',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'My Docs',
			plugins: [starlightBasePath()],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
