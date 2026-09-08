/**
 * Single source of truth for identity. Everything that needs a name, a handle
 * or a URL reads it from here, so changing one is a one-line edit.
 */
export const site = {
  name: 'Ben Blaker',
  /** Wordmark in the nav. Deliberately the handle, not the full name. */
  wordmark: 'bblaker',
  url: 'https://bblaker.com',
  tagline: 'I build software, and the infrastructure and machines it runs on.',
  description:
    'Systems engineer working in Go and TypeScript. Software projects, homelab infrastructure, and 3D printing.',

  github: 'https://github.com/bblaker',

  // TODO(ben): verify — the handle is a guess, unlike the GitHub one which
  // was confirmed via SSH auth. Fix before anyone clicks it.
  linkedin: 'https://www.linkedin.com/in/bblaker/',

  // A forwarding alias, not the primary address. Set up via Cloudflare Email
  // Routing so it can be deleted and replaced if it ever gets harvested —
  // which is the only spam defence that actually works. Obfuscating a real
  // address just makes it slightly slower to scrape.
  email: 'hello@bblaker.com',
} as const;

export interface Social {
  label: string;
  href: string;
  rel?: string;
}

export const socials: Social[] = [
  { label: 'LinkedIn', href: site.linkedin, rel: 'me' },
  { label: 'GitHub', href: site.github, rel: 'me' },
  { label: 'Email', href: `mailto:${site.email}` },
];
