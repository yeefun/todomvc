<template>
  <header class="header">
    <h1>todos</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class="new-todo"
      bind:value={text}
      on:keyup={(evt) => addTodo(evt, text)}
      type="text" placeholder="What needs to be done?" autofocus
    >
  </header>
</template>

<script>
import { isEnter } from '../util/index.js'

import { todos, totalTodos } from '../store/index.js'

let text = ''
let id = $totalTodos ? $todos[$totalTodos - 1].id : 0
function addTodo (evt, text) {
  if ((isEnter(evt))) {
    id += 1
    const todo = {
      id,
      text,
      status: 'active'
    }
    todos.add(todo)
    clearInput()
  }
}

function clearInput () {
  text = ''
}
</script>
