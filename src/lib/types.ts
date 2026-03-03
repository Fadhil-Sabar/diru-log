export type TMetaData = {
    title: string
    date: string
    description: string
    category: string
    tags: Tag[]
    writer: string
    lang: Lang
}

enum Tag {
    webdev,
    personal
}

enum Lang {
    EN,
    ID
} 