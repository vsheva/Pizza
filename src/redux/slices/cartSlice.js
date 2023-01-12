import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
        /** console.log(action)
          {type: 'cart/addItem', payload: {
        id: 6
        imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg"
        price: 675
        size: 26
        title: "Пепперони"
        type: "тонкое"}}*/
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        findItem.count+=1;
      } else {
        state.items.push({...action.payload, count: 1,});
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
      }, 0);

      // state.totalPrice += action.payload.price
    },

    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload);

      if (findItem.count) {
        findItem.count--;

      }
      state.totalPrice -= action.payload.price
    },

    removeItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart =(state)=>state.cart; //селектор
export const selectCartItemById =(id)=>(state) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
