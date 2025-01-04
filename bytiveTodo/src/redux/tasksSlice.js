import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
});


export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  return response.json();
});


export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
  return response.json();
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; // Load all tasks
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.data.unshift(action.payload); // Add task to the beginning
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.data.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      });
  },
});


export default tasksSlice.reducer;
