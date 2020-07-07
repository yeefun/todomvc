const { HashRouter, NavLink, withRouter } = ReactRouterDOM

class TodoHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          type="text" placeholder="What needs to be done?" autoFocus
          onKeyUp={this.props.addTodo}
        />
      </header>
    )
  }
}

class TodoMain extends React.Component {
  constructor(props) {
    super(props)

    this.checkboxCompletedAllRef = React.createRef()
  }

  get listItems() {
    const filteredTodos = this.filterTodos()

    return filteredTodos.map((todo, todoIdx) => {
      const { removeTodo, setTodoTitle, setTodoCompleted } = this.props
      return (
        <TodoListItem
          todo={todo}
          todoIdx={todoIdx}
          removeTodo={removeTodo}
          setTodoTitle={setTodoTitle}
          setTodoCompleted={setTodoCompleted}
          key={String(todo.id)}
        />
      )
    })
  }

  filterTodos() {
    const { pathname } = this.props.location

    if (pathname === '/') {
      return this.props.todos
    }

    const isCompletedPathname = (pathname === '/completed')
    return this.props.todos.filter((todo) => todo.completed === isCompletedPathname)
  }

  toggleCompletedAll = () => {
    const completedAll = this.checkboxCompletedAllRef.current.checked
    this.props.toggleCompletedAll(!completedAll)
  }

  render() {
    return (
      <div className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" ref={this.checkboxCompletedAllRef} />
        <label htmlFor="toggle-all" onClick={this.toggleCompletedAll}>Mark all as complete</label>
        <ul className="todo-list">
          { this.listItems }
        </ul>
      </div>
    )
  }
}

class TodoListItem extends React.Component {
  constructor(props) {
    super(props)

    this.inputEditedRef = React.createRef()

    this.state = {
      editing: false,
    }
  }

  get todo() {
    return this.props.todo
  }
  get todoTitle() {
    return this.todo.title
  }
  get todoCompleted() {
    return this.todo.completed
  }

  get todoStatus() {
    if (this.state.editing) {
      return 'editing'
    }

    if (this.todoCompleted) {
      return 'completed'
    }

    return ''
  }

  editTodo = () => {
    this.setState(
      {
        editing: true
      },
      () => {
        this.inputEditedRef.current.focus()
      }
    )
  }

  toggleCompleted = (evt) => {
    const completed = evt.currentTarget.checked
    this.props.setTodoCompleted(completed, this.props.todoIdx)
  }

  editDone = (evt) => {
    if (isEnter(evt) || evt.type === 'blur') {
      const newTitle = evt.currentTarget.value

      if (newTitle !== this.todoTitle) {
        this.props.setTodoTitle(newTitle, this.props.todoIdx)
      }

      this.setState({
        editing: false
      })
    }
  }

  render() {
    const { removeTodo, todoIdx } = this.props

    return (
      <li className={this.todoStatus}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.todoCompleted}
            onChange={this.toggleCompleted}
          />
          <label onDoubleClick={this.editTodo}>{this.todoTitle}</label>
          <button className="destroy" onClick={() => removeTodo(todoIdx)} />
        </div>
        <input
          className="edit"
          type="text"
          defaultValue={this.todoTitle}
          ref={this.inputEditedRef}
          onKeyUp={this.editDone}
          onBlur={this.editDone}
        />
      </li>
    )
  }
}

class TodoFooter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredItems: [
        { to: '/', name: 'All' },
        { to: '/active', name: 'Active' },
        { to: '/completed', name: 'Completed' },
      ]
    }
  }

  get filteredItems() {
    return this.state.filteredItems.map((item) => 
      <TodoFilteredItem to={item.to} name={item.name} key={item.name} />
    )
  }

  get hasCompletedTodo() {
    return this.props.todos.some((todo) => todo.completed)
  }

  render() {
    const { totalNotCompletedTodos, removeCompletedTodos } = this.props

    return (
      <footer className="footer">
        <span className="todo-count"><strong>{totalNotCompletedTodos}</strong> item left</span>
          <ul className="filters">
            { this.filteredItems }
          </ul>
          {
            this.hasCompletedTodo ?
              <button className="clear-completed" onClick={removeCompletedTodos}>Clear completed</button>
              : undefined
          }
      </footer>
    )
  }
}

class TodoFilteredItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { to, name } = this.props

    return (
      <li>
        <NavLink
          to={to}
          exact
          activeClassName="selected"
        >
          {name}
        </NavLink>
      </li>
    )
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props)

    this.TodoMainWithRouter = withRouter(TodoMain)

    const todos = this.savedTodos

    this.state = {
      todos,
    }

    this.id = this.theLastTodo.id || 0
  }

  componentDidUpdate() {
    this.saveTodos()
  }

  get savedTodos() {
    return JSON.parse(window.localStorage.getItem('todoMVCReact')) || []
  }
  saveTodos() {
    window.localStorage.setItem('todoMVCReact', JSON.stringify(this.todos))
  }

  addTodo = (evt) => {
    if (isEnter(evt)) {
      this.incrementId()
      const input = evt.currentTarget
      const todo = {
        id: this.id,
        title: input.value,
        completed: false
      }
      const todos = this.todos
      this.setState({
        todos: todos.concat([todo])
      })

      this.clearInputValue(input)
    }
  }

  removeTodo = (idx) => {
    this.setState({
      todos: [
        ...this.todos.slice(0, idx),
        ...this.todos.slice(idx + 1)
      ]
    })
  }
  removeCompletedTodos = () => {
    this.setState({
      todos: this.notCompletedTodos
    })
  }

  setTodoTitle = (title, idx) => {
    const todos = [...this.todos]
    todos[idx].title = title

    this.setState({
      todos
    })
  }
  setTodoCompleted = (completed, idx) => {
    const todos = [...this.todos]
    todos[idx].completed = completed

    this.setState({
      todos
    })
  }

  toggleCompletedAll = (completedAll) => {
    const todos = [...this.todos]
    todos.forEach((todo) => {
      todo.completed = completedAll
    })

    this.setState({
      todos,
    })
  }

  incrementId() {
    this.id += 1
  }

  clearInputValue(input) {
    input.value = ''
  }

  get todos() {
    return this.state.todos
  }

  get totalTodos() {
    return this.todos.length
  }
  get hasTodo() {
    return this.totalTodos > 0
  }
  get theLastTodo() {
    return this.todos[this.todos.length - 1] || {}
  }

  get notCompletedTodos() {
    return this.todos.filter((todo) => !todo.completed)
  }
  get totalNotCompletedTodos() {
    return this.notCompletedTodos.length
  }

  render() {
    return (
      <React.Fragment>
        <TodoHeader addTodo={this.addTodo} />
        {
          this.hasTodo ?
            <React.Fragment>
              <this.TodoMainWithRouter
                todos={this.todos}
                removeTodo={this.removeTodo}
                setTodoTitle={this.setTodoTitle}
                setTodoCompleted={this.setTodoCompleted}
                toggleCompletedAll={this.toggleCompletedAll}
              />
              <TodoFooter
                todos={this.todos}
                totalNotCompletedTodos={this.totalNotCompletedTodos}
                removeCompletedTodos={this.removeCompletedTodos}
              />
            </React.Fragment>
            : undefined
        }
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <HashRouter>
    <TodoApp />
  </HashRouter>,
  document.getElementById('root')
)

function isEnter(evt) {
  return evt.key === 'Enter' || evt.keyCode === 13
}
