import * as elements from 'typed-html'
import { Todo } from '../types/todo'

export function TodoItem({ content, completed, id }: Todo) {
  return (
    <div class='flex flex-row space-x-3'>
      <p>{content}</p>
      <input
        type='checkbox'
        checked={completed}
        hx-post={`/todo/toggle/${id}`}
        hx-swap='outerHTML'
        hx-target='closest div'
      />
      <button
        class='text-red-500'
        hx-delete={`/todo/${id}`}
        hx-swap='outerHTML'
        hx-target='closest div'
      >
        X
      </button>
    </div>
  )
}

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  )
}

export function TodoForm() {
  return (
    <form
      class='flex flex-row space-x-3 mt-3'
      hx-post='/todo'
      hx-swap='beforebegin'
      x-data="{input: ''}"
      x-on:submit="setTimeout(()=>input='',1)"
    >
      <input
        type='text'
        name='content'
        class='border border-black rounded-lg p-2 bg-gray-200 font-medium'
        x-model='input'
      />
      <button
        class='px-5 py-2 rounded-full bg-slate-600 text-white font-medium'
        type='submit'
      >
        Add
      </button>
    </form>
  )
}
