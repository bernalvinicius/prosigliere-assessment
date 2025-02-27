import { Character } from './Character';

export type CharacterCardProps = {
  char: Character;
  isFavorite: boolean;
  handleViewDetails: (char: Character) => void;
};
