# Hono Todo App

Simple Todo API built with Hono framework, TypeScript, and Zod validation.

## 🚀 Features

- ✅ CRUD operations for todos
- 🔍 Input validation with Zod
- 🛡️ Type-safe with TypeScript
- 🌐 CORS enabled
- 📝 Request logging
- 🏥 Health check endpoint

## 📋 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message & API info |
| GET | `/health` | Health check |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get specific todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete specific todo |
| DELETE | `/api/todos` | Delete all todos |

### Request/Response Examples

#### Create Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

#### Update Todo
```bash
curl -X PUT http://localhost:3000/api/todos/[id] \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and cook dinner", "completed": true}'
```

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MAA39/hono-todo-app.git
   cd hono-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📚 Tech Stack

- **Framework**: [Hono](https://hono.dev/)
- **Runtime**: Node.js
- **Language**: TypeScript
- **Validation**: Zod
- **Dev Tools**: tsx, ESLint

## 🔧 Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 📝 Todo Schema

```typescript
{
  id: string (UUID)
  title: string (required)
  completed: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

## 🔄 Current Storage

Currently using in-memory storage. For production, consider integrating with:
- PostgreSQL with Drizzle ORM
- MongoDB
- SQLite
- Supabase

## 📖 License

MIT