import { Dispatch } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { Character } from './Character';

export type CharacterGridProps = {
  characters: Character[];
  favorites: Character[];
  handleViewDetails: (
    char: Character,
    dispatch: Dispatch,
    navigate: NavigateFunction
  ) => void;
};
