import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  sort: { id: 1, name: 'популярности', sortProperty: 'rating', order: 'asc' },
  currentPage: 1,
  itemsPerPage: 8,
  totalPages: 0,
  searchQuery: '',
  urlHasSearchParams: false,
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setActiveSort: (state, action) => {
      state.sort = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setTotalPages: (state, action) => {
      const totalCountItems = action.payload;
      state.totalPages = Math.ceil(totalCountItems / state.itemsPerPage);
    },
    setFiltersFromURL: (state, action) => {
      state.category = action.payload.category;
      state.urlHasSearchParams = true;
    },
    setUrl: (state, action) => {
      state.urlHasSearchParams = true;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const {
  setActiveCategory,
  setActiveSort,
  setCurrentPage,
  setSearchQuery,
  setTotalPages,
  setFiltersFromURL,
  setUrl,
} = filterSlice.actions;
export default filterSlice.reducer;
