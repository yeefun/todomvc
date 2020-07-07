import React, {useRef} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

function Main({
  todos,
  setTodoCompleted,
  setTodoTitle,
  removeTodo,
  setAllTodosCompleted,
}) {
  const {pathname} = useLocation();

  function filterTodos() {
    if (pathname === '/') {
      return todos;
    }

    const isCompletedPathname = pathname === '/completed';
    return todos.filter(todo => todo.completed === isCompletedPathname);
  }

  const filteredTodos = filterTodos();
  const ListItems = filteredTodos.map((todo, todoIdx) => (
    <ListItem
      todo={todo}
      todoIdx={todoIdx}
      key={String(todo.id)}
      setTodoTitle={setTodoTitle}
      setTodoCompleted={setTodoCompleted}
      removeTodo={removeTodo}
    />
  ));

  const checkboxCompletedAllRef = useRef(undefined);

  return (
    <div className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        ref={checkboxCompletedAllRef}
      />
      <label htmlFor="toggle-all" onClick={toggleCompletedAll}>
        Mark all as complete
      </label>
      <ul className="todo-list">{ListItems}</ul>
    </div>
  );

  function toggleCompletedAll() {
    const completedAll = checkboxCompletedAllRef.current.checked;
    setAllTodosCompleted(!completedAll);
  }

  // do not use function to avoid re-render
  // function ListItems() {
  //   return todos.map((todo, todoIdx) => (
  //     <ListItem
  //       todo={todo}
  //       todoIdx={todoIdx}
  //       key={String(todo.id)}
  //       setTodoTitle={setTodoTitle}
  //       setTodoCompleted={setTodoCompleted}
  //       removeTodo={removeTodo}
  //     />
  //   ));
  // }
}

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodoCompleted: PropTypes.func.isRequired,
  setTodoTitle: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  setAllTodosCompleted: PropTypes.func.isRequired,
};

export default Main;
