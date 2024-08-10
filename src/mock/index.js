import { belongsTo, createServer, hasMany, Model } from 'miragejs'
import data from './data.json'


export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,
    models: {
      post: Model.extend({
        category: hasMany(),
        author: belongsTo(),
      }),
      category: Model.extend({
        post: hasMany(),
      }),
      author: Model.extend({
        post: hasMany(),
      }),
    },
    seeds(server) {
      // Insert posts & categories & authors
      data.posts.forEach(post => {
        server.create('post', {
          ...post,

          // Insert along author
          author: server.schema.authors.findOrCreateBy({ ...post.author }),

          // Insert along categories
          category: post.categories.map(
            cat => server.schema.categories.findOrCreateBy({ ...cat }),
          ),
        })
      })
    },
    routes() {
      this.namespace = 'api'

      this.get('/posts', schema => {
        const posts = schema.posts.all()
        return posts.models.slice(0, 5)
      })

      this.get('/categories', schema => {
        return schema.categories.all()
      })
    },
  })
}
