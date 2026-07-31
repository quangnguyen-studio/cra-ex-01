import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import todosReducer from './features/todos/todosSlice';

function renderWithStore(ui) {
  const store = configureStore({
    reducer: {
      todos: todosReducer,
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

test('renders todo list heading', () => {
  renderWithStore(<App />);
  expect(screen.getByRole('heading', { name: /todos/i })).toBeInTheDocument();
});

test('renders seed todos from the store', () => {
  renderWithStore(<App />);
  expect(screen.getByText(/learn redux toolkit/i)).toBeInTheDocument();
  expect(screen.getByText(/build a todo list/i)).toBeInTheDocument();
});
