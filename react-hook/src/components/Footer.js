import React from 'react';
import PropTypes from 'prop-types';

import FilterableItem from './FilterableItem';

function Footer({todos, totalNotCompletedTodos, removeCompletedTodos}) {
  const filteredItems = [
    {to: '/', name: 'All'},
    {to: '/active', name: 'Active'},
    {to: '/completed', name: 'Completed'},
  ];

  const FilterableItems = filteredItems.map(item => (
    <FilterableItem to={item.to} name={item.name} key={item.name} />
  ));

  const hasCompletedTodo = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{totalNotCompletedTodos}</strong> item left
      </span>
      <ul className="filters">{FilterableItems}</ul>
      {hasCompletedTodo ? (
        <button className="clear-completed" onClick={removeCompletedTodos}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalNotCompletedTodos: PropTypes.number.isRequired,
  removeCompletedTodos: PropTypes.func.isRequired,
};

export default Footer;
