import React from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import './App.css';

import {useStateWithCallback, isEnter} from './utils/index';

const savedTodos =
  JSON.parse(window.localStorage.getItem('todoMVCReactHook')) || [];

function App() {
  const [todos, setTodos] = useStateWithCallback(
    savedTodos,
    function saveTodos() {
      window.localStorage.setItem('todoMVCReactHook', JSON.stringify(todos));
    }
  );

  const totalTodos = todos.length;
  const hasTodo = totalTodos > 0;

  const notCompletedTodos = cloneTodos().filter(todo => !todo.completed);
  function removeCompletedTodos() {
    setTodos(notCompletedTodos);
  }
  const totalNotCompletedTodos = notCompletedTodos.length;

  const TodoBody = hasTodo ? (
    <>
      <Main
        todos={todos}
        setTodoCompleted={setTodoCompleted}
        setTodoTitle={setTodoTitle}
        removeTodo={removeTodo}
        setAllTodosCompleted={setAllTodosCompleted}
      />
      <Footer
        todos={todos}
        totalNotCompletedTodos={totalNotCompletedTodos}
        removeCompletedTodos={removeCompletedTodos}
      />
    </>
  ) : null;

  return (
    <>
      <Header addTodo={addTodo} />
      {TodoBody}
    </>
  );

  function cloneTodos() {
    return [...todos].map(todo => ({...todo}));
  }

  function addTodo(evt) {
    if (isEnter(evt)) {
      const input = evt.currentTarget;
      const newTodo = {
        id: (theLastTodoId() || 0) + 1,
        title: input.value,
        completed: false,
      };

      const newTodos = cloneTodos();
      newTodos.push(newTodo);
      setTodos(newTodos);
      // setTodos([...todos, newTodo]);

      clearValue(input);
    }
  }
  function removeTodo(idx) {
    const newTodos = cloneTodos();
    newTodos.splice(idx, 1);
    setTodos(newTodos);
    // setTodos([...todos.slice(0, idx), ...todos.slice(idx + 1)]);
  }

  function setTodoCompleted(completed, idx) {
    const newTodos = cloneTodos();
    newTodos[idx].completed = completed;

    setTodos(newTodos);
  }

  function setTodoTitle(title, idx) {
    const newTodos = cloneTodos();
    newTodos[idx].title = title;

    setTodos(newTodos);
  }

  function setAllTodosCompleted(completedAll) {
    const newTodos = cloneTodos();
    newTodos.forEach(todo => {
      // eslint-disable-next-line no-param-reassign
      todo.completed = completedAll;
    });

    setTodos(newTodos);
  }

  function theLastTodoId() {
    const newTodos = cloneTodos();
    const theLastTodo = newTodos[totalTodos - 1];
    return theLastTodo?.id;
    // const [theLastTodo = {}] = todos.slice(-1);
    // return theLastTodo.id;
  }
}

function clearValue(input) {
  // eslint-disable-next-line no-param-reassign
  input.value = '';
}

export default App;
