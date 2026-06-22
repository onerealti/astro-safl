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
					label: 'Project Overview',
					items: [
						{ label: 'System Introduction', link: '/intro/' },
					],
				},
				{
					label: 'Engineering & Validation',
					items: [
						{ label: 'Institutional Credentials', link: '/credentials/' },
						{ label: 'Structural Validation', link: '/structural-validation/' },
						{ label: 'ML Pipeline Benchmarks', link: '/ml-pipeline/' },
					],
				},
			],
		}),
	],
});
