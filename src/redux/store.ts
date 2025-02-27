import { configureStore } from '@reduxjs/toolkit';
import { characterReducer, favoritesReducer, houseReducer } from './slices';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    favorites: favoritesReducer,
    house: houseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
