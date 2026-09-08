// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Baked into canonical URLs, every RSS <link>, and sitemap-index.xml.
  // No `base` needed: a custom domain serves from the root on both CF and GH Pages.
  site: 'https://bblaker.com',
  integrations: [mdx(), react(), sitemap()],
  markdown: {
    // Off, deliberately. Smart punctuation rewrites "--flag" to an em dash
    // inside <Term> and other component slots, which silently corrupts every
    // shell command on the site. Type real — and " characters when you want them.
    smartypants: false,
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: false,
    },
  },
  build: { format: 'directory' },
});
