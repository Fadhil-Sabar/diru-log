// src/routes/api/views/[slug]/+server.ts
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
  const views = await platform?.env?.diru_log.get(`views:${params.slug}`);
  return Response.json({ views: Number(views ?? 0) });
};
