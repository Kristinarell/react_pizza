import { createSlice } from '@reduxjs/toolkit';

const findMatchingItem = (cartItems, payload) => {
  return cartItems.find(
    (item) =>
      item.id === payload.id &&
      item.selectedSize === payload.selectedSize &&
      item.selectedType === payload.selectedType,
  );
};

const initialState = {
  cartItems: [],
  totalPrice: 0,
  totalCount: 0,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = { ...action.payload, quantity: 1 };
      const equalItem = findMatchingItem(state.cartItems, newItem); // Проверяем, есть ли в корзине уже товар с такими же характеристиками
      if (equalItem) {
        equalItem.quantity++; // Если такой товар уже есть, увеличиваем его количество
      } else {
        state.cartItems.push(newItem); // Если такого товара нет в корзине, добавляем его в массив корзины
      }
      state.totalPrice += newItem.price;
      state.totalCount++;
    },
    reduceQuantity: (state, action) => {
      const reduceItem = findMatchingItem(state.cartItems, action.payload); // Находим товар, который нужно уменьшит
      if (reduceItem.quantity > 1) {
        reduceItem.quantity--;
        state.totalPrice -= reduceItem.price;
        state.totalCount--;
      }
    },

    // (item) => !findCartItem([item], action.payload) фильтрует массив так,
    //  что он оставляет элементы, для которых findCartItem возвращает false.
    //  Таким образом, элементы, которые соответствуют action.payload
    //  (и для которых findCartItem возвращает true), будут удалены из массива,
    //  и в результате останутся только те элементы, которые не соответствуют action.payload

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => !findMatchingItem([item], action.payload));
      state.totalPrice -= action.payload.price * action.payload.quantity;
      state.totalCount -= action.payload.quantity;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addToCart, reduceQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
