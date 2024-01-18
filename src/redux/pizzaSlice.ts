import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface FetchItemsResponse {
  items: TPizza[];
  totalCountItems: number;
}
export const fetchItems = createAsyncThunk<FetchItemsResponse, Record<string, string>>(
  'pizza/fetchItems',
  async ({ categoryUrl, sortBy, currentPage, search, itemsPerPage }) => {
    const response = await axios.get(
      `https://6537a5a9bb226bb85dd38bce.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}${search}${categoryUrl}${sortBy}`,
    );

    const getTotalItems = await axios.get(
      `https://6537a5a9bb226bb85dd38bce.mockapi.io/items?${search}&${categoryUrl}`,
    );
    return { items: response.data, totalCountItems: getTotalItems.data.length };
  },
);

export type TPizza = {
  id: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  price: number;
};

interface IPizzaSliceState {
  items: TPizza[];
  status: 'loading' | 'succeeded' | 'failed';
}

const initialState: IPizzaSliceState = {
  items: [],
  status: 'loading',
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
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
        state.items = [];
      });
  },
});

export const selectItems = (state: RootState) => state.pizza.items;
export default pizzaSlice.reducer;
