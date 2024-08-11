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