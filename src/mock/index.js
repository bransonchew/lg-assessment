import { createServer, hasMany, Model } from 'miragejs'
import data from './data.json'


export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,
    models: {
      post: Model.extend({
        category: hasMany(),
      }),
      category: Model.extend({
        post: hasMany(),
      }),
    },
    seeds(server) {
      // Insert posts & categories
      data.posts.forEach(post => {
        server.create('post', {
          ...post,

          // Insert along categories
          category: post.categories.map(
            cat => server.schema.categories.findOrCreateBy(
              { name: cat.name },
              { ...cat },
            ),
          ),
        })
      })
    },
    routes() {
      this.namespace = 'api'

      this.get('/posts', (schema, request) => {
        // Search params
        const cursor = Number(request.queryParams.cursor)
        const limit = Number(request.queryParams.limit)
        const filter = request.queryParams.filter

        // Filter by category
        const posts = filter
          ? schema.posts.where(
            post => post.categories.some(cat => cat.name === filter),
          )
          : schema.posts.all()

        // Pagination
        const nextCursor = cursor + limit
        return {
          data: posts.models.slice(cursor, nextCursor),
          nextCursor: nextCursor < posts.models.length ? nextCursor : null,
        }
      }, { timing: 1000 })

      this.get('/categories', schema => {
        return schema.categories.all().models
      })
    },
  })
}
