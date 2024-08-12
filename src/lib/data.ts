import { limit } from '@/lib/constants.ts'
import axios from 'axios'


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
}

export async function getPosts({ pageParam }: { pageParam: number }) {
  return axios
    .get('/api/posts', {
      params: {
        cursor: pageParam,
        limit
      },
    })
    .then<{ data: Post[], nextCursor: number | null }>(res => res.data)
}

export async function getCategories() {
  return axios
    .get('/api/categories')
    .then(res => res.data)
}