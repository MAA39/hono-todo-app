import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

// Todo型定義
const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  completed: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
})

const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required')
})

const UpdateTodoSchema = z.object({
  title: z.string().min(1).optional(),
  completed: z.boolean().optional()
})

type Todo = z.infer<typeof TodoSchema>
type CreateTodo = z.infer<typeof CreateTodoSchema>
type UpdateTodo = z.infer<typeof UpdateTodoSchema>

// インメモリストレージ（本来はDBを使う）
let todos: Todo[] = []

export const todoRoutes = new Hono()

// GET /api/todos - 全てのTodoを取得
todoRoutes.get('/', (c) => {
  return c.json({
    todos,
    count: todos.length
  })
})

// GET /api/todos/:id - 特定のTodoを取得
todoRoutes.get('/:id', (c) => {
  const id = c.req.param('id')
  const todo = todos.find(t => t.id === id)
  
  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  return c.json(todo)
})

// POST /api/todos - 新しいTodoを作成
todoRoutes.post('/', zValidator('json', CreateTodoSchema), (c) => {
  const { title } = c.req.valid('json')
  
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  todos.push(newTodo)
  
  return c.json(newTodo, 201)
})

// PUT /api/todos/:id - Todoを更新
todoRoutes.put('/:id', zValidator('json', UpdateTodoSchema), (c) => {
  const id = c.req.param('id')
  const updates = c.req.valid('json')
  
  const todoIndex = todos.findIndex(t => t.id === id)
  
  if (todoIndex === -1) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...updates,
    updatedAt: new Date()
  }
  
  return c.json(todos[todoIndex])
})

// DELETE /api/todos/:id - Todoを削除
todoRoutes.delete('/:id', (c) => {
  const id = c.req.param('id')
  const todoIndex = todos.findIndex(t => t.id === id)
  
  if (todoIndex === -1) {
    return c.json({ error: 'Todo not found' }, 404)
  }
  
  const deletedTodo = todos[todoIndex]
  todos.splice(todoIndex, 1)
  
  return c.json({ 
    message: 'Todo deleted successfully',
    deleted: deletedTodo
  })
})

// DELETE /api/todos - 全てのTodoを削除
todoRoutes.delete('/', (c) => {
  const count = todos.length
  todos = []
  
  return c.json({
    message: `Deleted ${count} todos successfully`,
    deletedCount: count
  })
})