import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavoritesPage from '../FavoritesPage';

jest.mock('src/components', () => ({
  CharacterGrid: () => <div data-testid="character-grid">Mocked Grid</div>,
}));

const mockStore = configureStore([]);
const theme = createTheme();

describe('FavoritesPage', () => {
  it('renders the message when there are no favorites', () => {
    const store = mockStore({ favorites: [] });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <FavoritesPage />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/no favorites found/i)).toBeInTheDocument();
  });

  it('renders the CharacterGrid when there are favorites', async () => {
    const mockFavorites = [{ id: 1, name: 'Character 1' }];

    const store = mockStore({ favorites: mockFavorites });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <FavoritesPage />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('Mocked Grid')).toBeInTheDocument();
  });
});
