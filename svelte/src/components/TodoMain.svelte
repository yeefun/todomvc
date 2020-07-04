<template>
<section class="main">
  <input id="toggle-all" class="toggle-all" type="checkbox">
  <label for="toggle-all" on:click={toggleCompleteAll}>Mark all as complete</label>
  <ul class="todo-list">
    {#each $todos as todo, idx (todo.id)}
      {#if !filterStatus || todo.status === filterStatus}
        <TodoListItem
          {todo}
          todoIdx={idx}
          completed={allCompleted}
        />
      {/if}
    {/each}
  </ul>
</section>
</template>

<script>
import { location, replace } from 'svelte-spa-router'

import TodoListItem from './TodoListItem.svelte'

import { todos } from '../store/index.js'

let filterStatus = ''
$: {
  switch ($location) {
    case '/active':
      filterStatus = 'active'
      break
    case '/completed':
      filterStatus = 'completed'
      break
    default:
      replace('/')
      filterStatus = ''
      break
  }
}

let allCompleted = false
function toggleCompleteAll () {
  allCompleted = !allCompleted
  allCompleted ? todos.completeAll() : todos.activeAll()
}
</script>

<style lang="scss">
label {
  cursor: pointer;
}
</style>
