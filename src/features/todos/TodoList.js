import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  todoAdded,
  todoToggled,
  todoRemoved,
  todosClearedCompleted,
  filterChanged,
  selectFilteredTodos,
  selectFilter,
  selectActiveCount,
} from './todosSlice';
import './TodoList.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function TodoList() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectFilter);
  const activeCount = useSelector(selectActiveCount);

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = text.trim();
    if (!next) {
      return;
    }
    dispatch(todoAdded(next));
    setText('');
  };

  return (
    <section className="todo">
      <header className="todo__header">
        <h1 className="todo__title">Todos</h1>
        <p className="todo__subtitle">Redux Toolkit + React-Redux example</p>
      </header>

      <form className="todo__form" onSubmit={handleSubmit}>
        <input
          className="todo__input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What needs to be done?"
          aria-label="New todo"
        />
        <button className="todo__add" type="submit">
          Add
        </button>
      </form>

      <ul className="todo__list">
        {todos.length === 0 ? (
          <li className="todo__empty">No todos here.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="todo__item">
              <label className="todo__label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(todoToggled(todo.id))}
                />
                <span
                  className={
                    todo.completed
                      ? 'todo__text todo__text--done'
                      : 'todo__text'
                  }
                >
                  {todo.text}
                </span>
              </label>
              <button
                className="todo__remove"
                type="button"
                onClick={() => dispatch(todoRemoved(todo.id))}
                aria-label={`Remove ${todo.text}`}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>

      <footer className="todo__footer">
        <span className="todo__count">
          {activeCount} item{activeCount === 1 ? '' : 's'} left
        </span>

        <div className="todo__filters" role="group" aria-label="Filter todos">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                filter === option.value
                  ? 'todo__filter todo__filter--active'
                  : 'todo__filter'
              }
              onClick={() => dispatch(filterChanged(option.value))}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          className="todo__clear"
          type="button"
          onClick={() => dispatch(todosClearedCompleted())}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default TodoList;
