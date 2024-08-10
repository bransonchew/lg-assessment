import axios from 'axios'


export type Post = {
  id: string
  title: string
  summary: string
  publishDate: string
}

export async function getPosts() {
  return axios
    .get('/api/posts')
    .then<Post[]>(res => res.data)
}

export async function getCategories() {
  return axios
    .get('/api/categories')
    .then(res => res.data)
}