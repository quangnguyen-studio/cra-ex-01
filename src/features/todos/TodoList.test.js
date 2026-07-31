import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import TodoList from './TodoList';
import todosReducer, {
  todoAdded,
  todoToggled,
  todoRemoved,
  filterChanged,
  selectFilteredTodos,
  selectActiveCount,
} from './todosSlice';

function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState,
  });
}

function renderTodoList(store = createTestStore()) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    ),
  };
}

describe('todosSlice', () => {
  test('adds, toggles, and removes todos', () => {
    const store = createTestStore({
      todos: { items: [], filter: 'all' },
    });

    store.dispatch(todoAdded('Write tests'));
    let [todo] = selectFilteredTodos(store.getState());
    expect(todo.text).toBe('Write tests');
    expect(todo.completed).toBe(false);

    store.dispatch(todoToggled(todo.id));
    todo = selectFilteredTodos(store.getState())[0];
    expect(todo.completed).toBe(true);
    expect(selectActiveCount(store.getState())).toBe(0);

    store.dispatch(todoRemoved(todo.id));
    expect(selectFilteredTodos(store.getState())).toHaveLength(0);
  });

  test('filters active and completed todos', () => {
    const store = createTestStore({
      todos: {
        items: [
          { id: 'a', text: 'Active', completed: false },
          { id: 'b', text: 'Done', completed: true },
        ],
        filter: 'all',
      },
    });

    store.dispatch(filterChanged('active'));
    expect(selectFilteredTodos(store.getState())).toEqual([
      { id: 'a', text: 'Active', completed: false },
    ]);

    store.dispatch(filterChanged('completed'));
    expect(selectFilteredTodos(store.getState())).toEqual([
      { id: 'b', text: 'Done', completed: true },
    ]);
  });
});

describe('TodoList', () => {
  test('adds a todo from the form', async () => {
    renderTodoList(
      createTestStore({
        todos: { items: [], filter: 'all' },
      })
    );

    await userEvent.type(screen.getByLabelText(/new todo/i), 'Ship the feature');
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }));

    expect(screen.getByText(/ship the feature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new todo/i)).toHaveValue('');
  });
});
