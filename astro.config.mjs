// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { starlightBasePath } from 'starlight-base-path';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
    site: 'https://onerealti.github.io',
    base: '/astro-safl',
    trailingSlash: 'always',
    markdown: {
        processor: unified({
            gfm: true,
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }),
    },
    integrations: [starlight({
        title: 'S.A.F.L',
        customCss: ['./src/styles/custom.css'],
        head: [
            {
                tag: 'link',
                attrs: {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
                },
            },
            {
                tag: 'script',
                attrs: {
                    src: 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js',
                    defer: true,
                },
            },
            {
                tag: 'script',
                content: "window.addEventListener('DOMContentLoaded', () => { if (window.mermaid) { mermaid.initialize({ startOnLoad: true, theme: 'dark', securityLevel: 'loose' }); } });",
            },
        ],
        plugins: [starlightBasePath()],
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/onerealti/astro-safl' }],
        editLink: {
            baseUrl: 'https://github.com/onerealti/astro-safl/edit/main/',
        },
        sidebar: [
            {
                label: 'Project Overview',
                collapsed: false,
                items: [
                    { label: 'System Introduction', link: '/intro/' },
                    { label: 'Institutional Credentials', link: '/credentials/' },
                    { label: 'R&D Completion Report', link: '/project-report/' },
                ],
            },
            {
                label: 'Engineering Reports',
                collapsed: false,
                items: [
                    {
                        label: 'FEA Load Simulations',
                        link: '/structural-simulation/',
                        badge: { text: 'FEA', variant: 'success' },
                    },
                    {
                        label: 'Mechanical Fabrication & Assembly',
                        link: '/mechanical-assembly/',
                        badge: { text: 'Fabrication', variant: 'success' },
                    },
                    {
                        label: 'Edge ML Vision Pipeline',
                        link: '/ml-vision/',
                        badge: { text: 'ML', variant: 'note' },
                    },
                    {
                        label: 'Soil Probe Telemetry',
                        link: '/soil-telemetry/',
                        badge: { text: 'Telemetry', variant: 'note' },
                    },
                ],
            },
        ],
    }), mdx()],
});