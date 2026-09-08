import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Two entities, one relationship.
 *
 *   Project = a long-lived noun (ferry, pi-tower, printers)
 *   Post    = a dated event, optionally pointing at a project
 *
 * A post with `project: ferry` threads onto ferry's devlog automatically
 * *and* appears in the global stream. That join is the whole content model.
 */

export const DOMAINS = ['software', 'infra', 'hardware'] as const;
export const STATUSES = ['active', 'shipped', 'maintained', 'archived', 'planned'] as const;
export const EFFORTS = ['S', 'M', 'L', 'XL'] as const;

export type Domain = (typeof DOMAINS)[number];
export type Status = (typeof STATUSES)[number];
export type Effort = (typeof EFFORTS)[number];

const projects = defineCollection({
  loader: glob({ base: './content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** One line. Used on cards, the project header, and OG descriptions. */
    tagline: z.string(),
    domain: z.enum(DOMAINS),
    status: z.enum(STATUSES),
    /** Rough size, so a public backlog sets expectations instead of over-promising. */
    effort: z.enum(EFFORTS),
    started: z.coerce.date().optional(),
    ended: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    /** Sort weight within a status band. Higher floats up. */
    weight: z.number().default(0),

    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), href: z.string().url() }))
      .default([]),

    /** Ordered key/value spec sheet. Rendered with dot leaders in the rail. */
    spec: z.array(z.object({ k: z.string(), v: z.string() })).default([]),

    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ base: './content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** log = devlog entry · essay = long-form · note = short thought */
    kind: z.enum(['log', 'essay', 'note']),
    /** Validated against the projects collection: a bad slug fails the build. */
    project: reference('projects').optional(),
    tags: z.array(z.string()).default([]),
    /** Required, not optional. It's the list copy, the RSS body and the OG text. */
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
