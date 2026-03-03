import type { Snippet } from "svelte"

export type TMetaData = {
    title: string
    date: string
    description: string
    category: string
    tags: Tag[]
    writer: string
    lang: Lang,
    children: Snippet
}

enum Tag {
    webdev,
    personal
}

enum Lang {
    EN,
    ID
} 