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

  const limit = 5  // 5 posts per page

  return axios
    .get('/api/posts', {
      params: {
        cursor: pageParam,
        limit
      },
    })
    .then<{ data: Post[], nextCursor: number }>(res => ({
      data: res.data,
      nextCursor: pageParam + limit,
    }))
}

export async function getCategories() {
  return axios
    .get('/api/categories')
    .then(res => res.data)
}