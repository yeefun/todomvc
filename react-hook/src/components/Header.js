import React from 'react';
import PropTypes from 'prop-types';

function Header({addTodo}) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        onKeyUp={addTodo}
      />
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Header;
