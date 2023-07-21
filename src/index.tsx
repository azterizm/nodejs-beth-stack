import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import * as elements from 'typed-html'
import { BaseHtml } from './components/containers/root'
import { TodoItem, TodoList } from './components/todo'
import { Todo } from './types/todo'
dotenv.config()
const app = express()
const port = process.env.PORT || 5000
let todos: Todo[] = []
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('public'), { maxAge: 3e5 }))
app.get('/', (_req, res) => {
  res.send(
    <BaseHtml>
      <body
        class='flex w-full h-screen justify-center items-center'
        hx-get='/todos'
        hx-swap='innerHTML'
        hx-trigger='load'
      />
    </BaseHtml>,
  )
})
app.get('/todos', async (_req, res) => {
  return res.send(<TodoList todos={todos} />)
})
app.post('/todo', async (req, res) => {
  const content = req.body.content
  if (!content) return <p class='text-red-600'>Please insert content.</p>
  const todo = { content, id: randomUUID(), completed: false }
  todos.push(todo)
  return res.send(<TodoItem {...todo} />)
})
app.post('/todo/toggle/:id', async (req, res) => {
  const id = req.params.id
  let todo = todos.find((r) => r.id === id)
  if (!todo) return res.end()
  todo.completed = !todo.completed
  todos = todos.filter((r) => r.id !== id).concat(todo)
  return <TodoItem {...todo} />
})
app.delete('/todo/:id', async (req, res) => {
  const id = req.params.id
  let todo = todos.find((r) => r.id === id)
  if (!todo) return res.end()
  todos = todos.filter((r) => r.id !== id)
  return res.end()
})

app.listen(port, () => console.log('running on', port))
