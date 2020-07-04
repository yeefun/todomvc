import 'todomvc-app-css/index.css'

import App from './App.svelte'

const app = new App({
  target: document.querySelector('.todoapp')
})

window.add = app

export default app
