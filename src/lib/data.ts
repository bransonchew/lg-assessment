import axios from 'axios'


type Post = {
  id: string
  title: string
  summary: string
}

export async function getPosts() {
  return axios
    .get<{ posts: Post[] }>('/api/posts')
    .then(res => res.data.posts.slice(0, 10))
}