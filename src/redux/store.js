import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import filterSlice from './filterSlice';
import pizzaSlice from './pizzaSlice';

export const store = configureStore({
  reducer: { cart: cartSlice, filter: filterSlice, pizza: pizzaSlice },
});
