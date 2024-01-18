import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TSort = {
  id: number;
  name: 'популярности' | 'цене' | 'алфавиту';
  sortProperty: 'rating' | 'price' | 'title';
  order: 'asc' | 'desc';
};

interface IFilterState {
  category: number;
  sort: TSort;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  searchQuery: string;
  urlHasSearchParams: boolean;
}

const initialState: IFilterState = {
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
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setActiveSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      const totalCountItems = action.payload;
      state.totalPages = Math.ceil(totalCountItems / state.itemsPerPage);
    },
    setFiltersFromURL: (
      state,
      action: PayloadAction<{
        category: number;
        currentPage: number;
        sort: TSort;
      }>,
    ) => {
      state.category = action.payload.category;
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
      state.urlHasSearchParams = true;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const {
  setActiveCategory,
  setActiveSort,
  setCurrentPage,
  setSearchQuery,
  setTotalPages,
  setFiltersFromURL,
} = filterSlice.actions;
export default filterSlice.reducer;
