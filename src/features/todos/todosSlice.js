import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: '1', text: 'Learn Redux Toolkit', completed: true },
    { id: '2', text: 'Build a todo list', completed: false },
  ],
  filter: 'all', // 'all' | 'active' | 'completed'
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text: text.trim(),
            completed: false,
          },
        };
      },
    },
    todoToggled(state, action) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todoRemoved(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    todosClearedCompleted(state) {
      state.items = state.items.filter((item) => !item.completed);
    },
    filterChanged(state, action) {
      state.filter = action.payload;
    },
  },
});
console.log('todosSlice.reducer: ', todosSlice.reducer);

export const {
  todoAdded,
  todoToggled,
  todoRemoved,
  todosClearedCompleted,
  filterChanged,
} = todosSlice.actions;

// export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;

export const selectFilteredTodos = (state) => {
  const { items, filter } = state.todos;
  if (filter === 'active') {
    return items.filter((todo) => !todo.completed);
  }
  if (filter === 'completed') {
    return items.filter((todo) => todo.completed);
  }
  return items;
};

export const selectActiveCount = (state) =>
  state.todos.items.filter((todo) => !todo.completed).length;

export default todosSlice.reducer;
