export type Category = {
  id: string
  name: string
}

type Author = {
  name: string
  avatar: string
}

export type Post = {
  id: string
  title: string
  summary: string
  publishDate: string
  author: Author
  categories: Category[]
}