import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
  'pizza/fetchItems',
  async ({ categoryUrl, sortBy, currentPage, search, itemsPerPage }) => {
    const response = await axios.get(
      `https://6537a5a9bb226bb85dd38bce.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}${search}${categoryUrl}${sortBy}`,
    );

    // const getTotalItems = await axios.get(
    //   `https://6537a5a9bb226bb85dd38bce.mockapi.io/items?${search}&${categoryUrl}`,
    // );
    return { items: response.data }; //, totalCountItems: getTotalItems.data.length };
  },
);

const initialState = {
  items: [],
  status: 'loading', // 'loading' | 'succeeded' | 'failed'
  //totalCountItems: 0,
};
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        //state.totalCountItems = action.payload.totalCountItems;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
        state.items = [];
        //state.totalCountItems = 0;
      });
  },
});

export const selectItems = (state) => state.pizza.items;
export const {} = pizzaSlice.actions;
export default pizzaSlice.reducer;
