import { writable, derived } from 'svelte/store'

function createTodos () {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    set: (todos) => set(todos),
    add: (todo) => update((todos) => [ ...todos, todo ]),
    remove: (idToRemove) => update((todos) => todos.filter((todo) => todo.id !== idToRemove)),
    setText: (idx, text) => update(function (todos) {
      todos[idx].text = text
      return todos
    }),
    setStatus: (idx, status) => update(function (todos) {
      todos[idx].status = status
      return todos
    }),
    completeAll: () => update((todos) => todos.map(function (todo) {
      todo.status = 'completed'
      return todo
    })),
    activeAll: () => update((todos) => todos.map(function (todo) {
      todo.status = 'active'
      return todo
    })),
    removeCompleted: () => update((todos) => todos.filter((todo) => todo.status !== 'completed')),
  }
}

export const todos = createTodos()

export const totalTodos = derived(
  todos,
  ($todos) => $todos.length
)

export const totalActiveTodos = derived(
  todos,
  ($todos) => $todos.filter((todo) => todo.status === 'active').length
)

export const totalCompletedTodos = derived(
  [totalTodos, totalActiveTodos],
  ([$totalTodos, $totalActiveTodos]) => $totalTodos - $totalActiveTodos
)
