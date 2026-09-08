import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg } from '~/lib/og';
import { allProjects, allPosts, devlogIndex } from '~/lib/content';
import { site } from '~/site';
import { isoDate } from '~/lib/format';
import type { OgInput } from '~/lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const [projects, posts, dl] = await Promise.all([allProjects(), allPosts(), devlogIndex()]);

  const projectCards = projects.map((p) => ({
    params: { path: `projects/${p.id}` },
    props: {
      og: {
        eyebrow: `${p.data.domain} · ${p.data.status}`,
        title: p.data.title,
        subtitle: p.data.tagline,
        accent: p.data.domain,
      } satisfies OgInput,
    },
  }));

  const postCards = posts.map((post) => {
    const meta = dl.get(post.id);
    const eyebrow = [post.data.kind, isoDate(post.data.date), meta && `${meta.projectTitle} #${meta.n}`]
      .filter(Boolean)
      .join(' · ');
    return {
      params: { path: `log/${post.id}` },
      props: {
        og: {
          eyebrow,
          title: post.data.title,
          subtitle: post.data.summary,
        } satisfies OgInput,
      },
    };
  });

  const fallback = {
    params: { path: 'default' },
    props: {
      og: {
        eyebrow: 'SRE & Platform · Software · Homelab',
        title: site.tagline,
        subtitle: site.description,
      } satisfies OgInput,
    },
  };

  return [fallback, ...projectCards, ...postCards];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg((props as { og: OgInput }).og);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
