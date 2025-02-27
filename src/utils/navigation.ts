import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

import { Character } from 'src/types';
import { setSelectedUser } from 'src/redux/slices/characterSlice';

export const handleViewDetails = (
  character: Character,
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  dispatch(setSelectedUser(character));
  navigate(`/character/${character.id}`);
};
