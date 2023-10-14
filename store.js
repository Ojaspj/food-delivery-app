import { configureStore } from '@reduxjs/toolkit';
import sampleReducer from './reducers/sampleReducer';
import cartSlice from './slices/cartSlice';
import restaurantSlice from './slices/restaurantSlice';

const store = configureStore({
  reducer: {
    sample: sampleReducer,
    cart: cartSlice,
    restaurant: restaurantSlice
    // You can add more reducers here if needed
  },
});

export default store;
