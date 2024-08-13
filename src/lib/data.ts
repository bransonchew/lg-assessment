import { limit } from '@/lib/constants'
import { Category, Post } from '@/lib/types'
import axios from 'axios'


export async function getPosts({ pageParam, filter }: { pageParam: number, filter?: string }) {
  return axios
    .get('/api/posts', {
      params: {
        cursor: pageParam,
        limit,
        filter
      },
    })
    .then<{ data: Post[], nextCursor: number | null }>(res => res.data)
}

export async function getCategories() {
  return axios
    .get('/api/categories')
    .then<Category[]>(res => res.data)
}