import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TMetaData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null }


export async function listFiles() {
  const allPostFiles = import.meta.glob('/src/posts/**/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const post = await resolver() as { metadata: TMetaData }

      // Mengambil slug dari nama file (misal: /src/posts/blog/halo.md -> halo)
      const slug = path.split('/').pop()?.replace('.md', '')

      return {
        meta: post.metadata,
        slug: slug,
        path: path
      }
    })
  )

  // Opsional: Urutkan berdasarkan tanggal jika ada di metadata
  return allPosts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  })
}
