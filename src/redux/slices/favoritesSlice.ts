import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'src/types';

const loadFavoritesFromLocalStorage = (): Character[] => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const initialState: Character[] = loadFavoritesFromLocalStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Character>) => {
      if (!state.find((fav) => fav.id === action.payload.id)) {
        const updatedFavorites = [...state, action.payload];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
      return state;
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const updatedFavorites = state.filter((fav) => fav.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    },
    clearFavorites: () => {
      localStorage.removeItem('favorites');
      return [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
