import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('users/fetchPizzasStatus', async params => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', //loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload; //console.log(action)//{type: 'pizza/setItems', payload: Array(4)}
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading';
      state.items = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },

    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
