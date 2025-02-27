import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HouseState = {
  selectedHouse: string;
};

const initialState: HouseState = {
  selectedHouse: 'gryffindor',
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setHouse: (state, action: PayloadAction<string>) => {
      state.selectedHouse = action.payload;
    },
  },
});

export const { setHouse } = houseSlice.actions;
export default houseSlice.reducer;
