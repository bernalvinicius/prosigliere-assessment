import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'src/theme';
import { Character, CharacterCardProps } from 'src/types';
import { addFavorite } from 'src/redux/slices/favoritesSlice';
import CharacterCard from '../CharacterCard';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('src/redux/slices/favoritesSlice', () => ({
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

const mockStore = configureStore([]);

describe('CharacterCard', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it('renders character details correctly', () => {
    const mockCharacter = { id: 1, name: 'Character 1', image: '' };
    const store = mockStore({});
    const mockProps: CharacterCardProps = {
      char: mockCharacter,
      isFavorite: false,
      handleViewDetails: jest.fn(),
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CharacterCard {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Character 1')).toBeInTheDocument();
  });

  it('calls handleViewDetails when the button is clicked', () => {
    const mockCharacter = { id: 1, name: 'Character 1', image: '' };
    const store = mockStore({});
    const handleViewDetailsMock = jest.fn();
    const mockProps: CharacterCardProps = {
      char: mockCharacter,
      isFavorite: false,
      handleViewDetails: handleViewDetailsMock,
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CharacterCard {...mockProps} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('View Details'));
    expect(handleViewDetailsMock).toHaveBeenCalledWith(mockCharacter);
  });

  it('dispatches addFavorite when favorite button is clicked', () => {
    const mockCharacter = {
      id: '1',
      name: 'Harry Potter',
      image: 'https://some-image-url.com',
    } as Character;

    const mockProps: CharacterCardProps = {
      char: mockCharacter,
      isFavorite: false,
      handleViewDetails: jest.fn(),
    };

    render(
      <ThemeProvider theme={theme}>
        <CharacterCard {...mockProps} />
      </ThemeProvider>
    );

    const favoriteButton = screen.getByRole('button', {
      name: /Add to favorites/i,
    });

    fireEvent.click(favoriteButton);

    expect(mockDispatch).toHaveBeenCalledWith(addFavorite(mockCharacter));
  });
});
