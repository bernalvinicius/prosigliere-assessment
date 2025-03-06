import selectedUserReducer, {
  setSelectedUser,
  clearSelectedUser,
} from '../characterSlice';
import { Character } from 'src/types';

const mockCharacter = {
  id: '1',
  name: 'Test Character',
  image: 'test.jpg',
} as Character;

describe('selectedUserSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set a selected user and save it to localStorage', () => {
    const newState = selectedUserReducer(null, setSelectedUser(mockCharacter));

    expect(newState).toEqual(mockCharacter);

    expect(JSON.parse(localStorage.getItem('selectedUser')!)).toEqual(
      mockCharacter
    );
  });

  it('should clear the selected user and remove it from localStorage', () => {
    localStorage.setItem('selectedUser', JSON.stringify(mockCharacter));

    const newState = selectedUserReducer(mockCharacter, clearSelectedUser());

    expect(newState).toBeNull();

    expect(localStorage.getItem('selectedUser')).toBeNull();
  });
});
