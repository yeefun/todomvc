import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import {useStateWithCallback, isEnter} from '../utils/index';

function ListItem({todo, todoIdx, setTodoTitle, setTodoCompleted, removeTodo}) {
  const inputEditedRef = useRef(undefined);

  const [editing, setEditing] = useStateWithCallback(
    false,
    function focusEditedInput() {
      inputEditedRef.current.focus();
    }
  );

  const todoTitle = todo.title;
  const todoCompleted = todo.completed;

  return (
    <li className={todoStatus()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todoCompleted}
          onChange={toggleCompleted}
        />
        <label onDoubleClick={editTodo}>{todoTitle}</label>
        <button className="destroy" onClick={() => removeTodo(todoIdx)} />
      </div>
      <input
        className="edit"
        type="text"
        defaultValue={todoTitle}
        ref={inputEditedRef}
        onKeyUp={editDone}
        onBlur={editDone}
      />
    </li>
  );

  function todoStatus() {
    if (editing) {
      return 'editing';
    }

    if (todoCompleted) {
      return 'completed';
    }

    return '';
  }

  function editTodo() {
    setEditing(true);
  }

  function editDone(evt) {
    if (isEnter(evt) || evt.type === 'blur') {
      const newTitle = evt.currentTarget.value;

      if (newTitle !== todoTitle) {
        setTodoTitle(newTitle, todoIdx);
      }

      setEditing(false);
    }
  }

  function toggleCompleted(evt) {
    const completed = evt.currentTarget.checked;
    setTodoCompleted(completed, todoIdx);
  }
}

ListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  todoIdx: PropTypes.number.isRequired,
  setTodoTitle: PropTypes.func.isRequired,
  setTodoCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default ListItem;
