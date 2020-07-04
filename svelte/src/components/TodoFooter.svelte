<template>
  <footer class="footer">
    <span class="todo-count"><strong>{$totalActiveTodos}</strong> item left</span>
    <ul class="filters">
      <TodoListFiltersItem />
    </ul>
    {#if $totalCompletedTodos}
      <button class="clear-completed" on:click={todos.removeCompleted}>Clear completed</button>
    {/if}
  </footer>
</template>

<script>
import TodoListFiltersItem from './TodoFiltersItem.svelte'

import { todos, totalActiveTodos, totalCompletedTodos } from '../store/index.js'
</script>
