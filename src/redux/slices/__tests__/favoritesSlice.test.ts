import favoritesReducer, {
  addFavorite,
  removeFavorite,
  clearFavorites,
} from '../favoritesSlice';
import { Character } from 'src/types';

const mockCharacter = {
  id: '1',
  name: 'Test Character',
  image: 'test.jpg',
} as Character;

describe('favoritesSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a favorite character', () => {
    const newState = favoritesReducer([], addFavorite(mockCharacter));
    expect(newState).toEqual([mockCharacter]);
    expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([
      mockCharacter,
    ]);
  });

  it('should not add duplicate favorites', () => {
    const initialState = [mockCharacter];
    const newState = favoritesReducer(initialState, addFavorite(mockCharacter));
    expect(newState).toEqual(initialState);
  });

  it('should remove a favorite character', () => {
    const initialState = [mockCharacter];
    const newState = favoritesReducer(
      initialState,
      removeFavorite(mockCharacter.id)
    );
    expect(newState).toEqual([]);
    expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([]);
  });

  it('should clear all favorites', () => {
    const initialState = [mockCharacter];
    const newState = favoritesReducer(initialState, clearFavorites());
    expect(newState).toEqual([]);
    expect(localStorage.getItem('favorites')).toBeNull();
  });
});
