// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightBasePath } from 'starlight-base-path';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://onerealti.github.io',
    base: '/astro-safl',
    trailingSlash: 'always',
    markdown: {
        gfm: true,
    },
    integrations: [starlight({
        title: 'My Docs',
        plugins: [starlightBasePath()],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/onerealti/astro-safl' }],
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
		}), mdx()],
});