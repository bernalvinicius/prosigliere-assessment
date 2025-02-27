import { Character } from 'src/types';

const API_BASE_URL = 'https://hp-api.onrender.com/api/characters';

export const fetchCharacters = async (filter: string): Promise<Character[]> => {
  let url = API_BASE_URL;
  if (filter === 'Students') url += '/students';
  if (filter === 'Staff') url += '/staff';

  const response = await fetch(url);
  if (!response.ok) throw new Error('Error searching for characters');

  const data: Character[] = await response.json();
  return data;
};
