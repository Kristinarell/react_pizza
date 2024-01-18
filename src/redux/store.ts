import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './cartSlice';
import filterSlice from './filterSlice';
import pizzaSlice from './pizzaSlice';

export const store = configureStore({
  reducer: { cart: cartSlice, filter: filterSlice, pizza: pizzaSlice },
});

export type RootState = ReturnType<typeof store.getState>;

// для того чтобы использовать ассинхронные actions (createAsyncThunk)
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
