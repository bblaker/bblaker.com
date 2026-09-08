import { getCollection, type CollectionEntry } from 'astro:content';
import { DOMAINS, STATUSES, type Domain, type Status } from '~/content.config';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'posts'>;

const isPublished = (e: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !e.data.draft;

/** Live work sorts before planned work; within a band, weight then recency. */
const STATUS_ORDER: Record<Status, number> = {
  active: 0,
  shipped: 1,
  maintained: 2,
  archived: 3,
  planned: 4,
};

/** Software first. This is a deliberate editorial choice, not alphabetical accident. */
const DOMAIN_ORDER: Record<Domain, number> = { software: 0, infra: 1, hardware: 2 };

export async function allProjects(): Promise<Project[]> {
  const projects = (await getCollection('projects')).filter(isPublished);
  return projects.sort((a, b) => {
    const s = STATUS_ORDER[a.data.status] - STATUS_ORDER[b.data.status];
    if (s !== 0) return s;
    const d = DOMAIN_ORDER[a.data.domain] - DOMAIN_ORDER[b.data.domain];
    if (d !== 0) return d;
    const w = b.data.weight - a.data.weight;
    if (w !== 0) return w;
    return a.data.title.localeCompare(b.data.title);
  });
}

/** Things that exist. These get cards. */
export const isLive = (p: Project) => p.data.status !== 'planned';

/** Things that don't exist yet. These get rows — a tenth the visual weight. */
export const isBacklog = (p: Project) => p.data.status === 'planned';

export async function allPosts(): Promise<Post[]> {
  const posts = (await getCollection('posts')).filter(isPublished);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Every post belonging to a project, newest first, numbered by build order
 * (oldest = #1) so entry numbers are stable as new ones land on top.
 */
export async function devlog(projectId: string) {
  const posts = (await allPosts()).filter((p) => p.data.project?.id === projectId);
  const total = posts.length;
  return posts.map((post, i) => ({ post, n: total - i }));
}

/** Counts for the filter chips. Derived, so they can never go stale. */
export async function domainCounts(projects: Project[]) {
  return DOMAINS.map((domain) => ({
    domain,
    count: projects.filter((p) => p.data.domain === domain).length,
  }));
}

export { DOMAINS, STATUSES };

/**
 * Maps every devlog post to its entry number and parent project.
 * Numbers run oldest = #1 so they stay stable as new entries land on top.
 */
export async function devlogIndex() {
  const posts = await allPosts();
  const projects = await allProjects();
  const titles = new Map(projects.map((p) => [p.id, p.data.title]));

  const byProject = new Map<string, Post[]>();
  for (const post of posts) {
    const id = post.data.project?.id;
    if (!id) continue;
    const list = byProject.get(id);
    if (list) list.push(post);
    else byProject.set(id, [post]);
  }

  const index = new Map<string, { n: number; projectId: string; projectTitle: string }>();
  for (const [projectId, list] of byProject) {
    list.forEach((post, i) =>
      index.set(post.id, {
        n: list.length - i,
        projectId,
        projectTitle: titles.get(projectId) ?? projectId,
      }),
    );
  }
  return index;
}
