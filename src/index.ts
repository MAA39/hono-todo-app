import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { todoRoutes } from './routes/todos'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

// Middleware
app.use('*', cors())
app.use('*', logger())

// Routes
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Hono Todo API!',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  })
})

app.route('/api/todos', todoRoutes)

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const port = Number(process.env.PORT) || 3000

console.log(`🚀 Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})