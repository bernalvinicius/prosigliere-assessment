import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'src/types';

/**
 * (): -> Doesn't receive parameter
 */
const loadUserFromLocalStorage = (): Character | null => {
  const savedUser = localStorage.getItem('selectedUser');
  return savedUser ? JSON.parse(savedUser) : null;
};

const initialState: Character | null = loadUserFromLocalStorage();

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<Character>) => {
      localStorage.setItem('selectedUser', JSON.stringify(action.payload));
      return action.payload;
    },
    clearSelectedUser: () => {
      localStorage.removeItem('selectedUser');
      return null;
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
