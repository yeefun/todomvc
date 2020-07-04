<template>
  {#each filters as filter}
    <li>
      <a href={filter.path} use:link use:active={{ className: 'selected' }}>{filter.text}</a>
    </li>
  {/each}
</template>

<script>
import { link } from 'svelte-spa-router'
import active from 'svelte-spa-router/active'

const filters = [
  { path: '/', text: 'All' },
  { path: '/active', text: 'Active' },
  { path: '/completed', text: 'Completed' }
]
</script>
