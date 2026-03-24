import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { TMetaData } from '$lib/types';

export const load: PageLoad = async ({ params, url, data }) => {
  try {
    const post = await import(`../../../posts/blog/${params.slug}.md`);
    const meta: TMetaData = post.metadata;

    return {
      content: post.default,
      meta,
      url,
      views: data?.views ?? 0
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
};
