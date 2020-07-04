<template>
  <li class={ status }>
    <div class="view">
      <input class="toggle" type="checkbox" checked={completed} on:click={toggleCompleted}>
      <label on:dblclick={editTodo}>{text}</label>
      <button class="destroy" on:click={removeTodo(todo.id)} />
    </div>
    <input
      class="edit" type="text"
      bind:value={text}
      bind:this={editInput}
      on:keyup={doneEdit}
      on:blur={doneEdit}
    >
  </li>
</template>

<script>
import { tick } from 'svelte'

import { isEnter } from '../util/index.js'

import { todos } from '../store/index.js'

export let todo
export let todoIdx
export let completed

completed = todo.status === 'completed'

let status = ''
let text = todo.text
let editInput = null

$: status = completed ? 'completed' : ''
$: todos.setText(todoIdx, text)

function toggleCompleted () {
  completed = !completed
  todos.setStatus(todoIdx, completed ? 'completed' : 'active')
} 

function removeTodo (id) {
  todos.remove(id)
}

async function editTodo () {
  status = 'editing'

  await tick()
  editInput.focus()
}

function doneEdit (evt) {
  if (isEnter(evt) || evt.type === 'blur') {
    status = completed ? 'completed' : ''
  }
}
</script>

<style lang="scss">
.toggle, label, .destroy {
  cursor: pointer;
}
</style>
