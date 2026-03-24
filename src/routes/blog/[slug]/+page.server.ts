import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, platform }) => {
  const kv = platform?.env?.log;
  const key = `views:${url.pathname}`;

  const current = Number((await kv?.get(key)) ?? 0);
  await kv?.put(key, String(current + 1));

  return {
    views: current + 1
  };
};
