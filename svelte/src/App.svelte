<template>
  <TodoHeader />
  {#if $totalTodos}
    <TodoMain />
    <TodoFooter />
  {/if}
</template>

<script>
import TodoHeader from './components/TodoHeader.svelte'
import TodoMain from './components/TodoMain.svelte'
import TodoFooter from './components/TodoFooter.svelte'

import { todos, totalTodos } from './store/index.js'

todos.set(JSON.parse(window.localStorage.getItem('todoMVC')) || [])

$: window.localStorage.setItem('todoMVC', JSON.stringify($todos))
</script>
