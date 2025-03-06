import houseReducer, { setHouse } from '../houseSlice';

describe('houseSlice', () => {
  it('should return the initial state', () => {
    const initialState = houseReducer(undefined, { type: '@@INIT' });
    expect(initialState).toEqual({ selectedHouse: 'gryffindor' });
  });

  it('should set the house correctly', () => {
    const newState = houseReducer(
      { selectedHouse: 'gryffindor' },
      setHouse('hufflepuff')
    );
    expect(newState.selectedHouse).toEqual('hufflepuff');
  });
});
