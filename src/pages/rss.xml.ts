import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allPosts, devlogIndex } from '~/lib/content';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  const dl = await devlogIndex();

  return rss({
    title: 'Ben Blaker',
    description: 'Software, infrastructure, and the machines it runs on.',
    site: context.site!,
    items: posts.map((post) => {
      const meta = dl.get(post.id);
      return {
        title: meta ? `${meta.projectTitle} #${meta.n} — ${post.data.title}` : post.data.title,
        description: post.data.summary,
        pubDate: post.data.date,
        link: `/log/${post.id}/`,
        categories: post.data.tags,
      };
    }),
    customData: '<language>en-us</language>',
  });
}
