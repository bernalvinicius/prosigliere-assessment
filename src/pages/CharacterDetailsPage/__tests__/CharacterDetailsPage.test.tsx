import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { EnhancedStore } from '@reduxjs/toolkit';
import CharacterDetailsPage from '../CharacterDetailsPage';
import theme from 'src/theme';

const mockStore = configureStore([]);

describe('CharacterDetailsPage', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = mockStore({
      character: {
        name: 'Harry Potter',
        actor: 'Daniel Radcliffe',
        gender: 'male',
        alternate_names: ['The Boy Who Lived'],
        ancestry: 'Half-blood',
        dateOfBirth: '31-07-1980',
        eyeColour: 'Green',
        hairColour: 'Black',
        house: 'Gryffindor',
        patronus: 'Stag',
        species: 'Human',
        wand: { wood: 'Holly', core: 'Phoenix feather', length: '11 inches' },
        image: 'https://via.placeholder.com/300',
      },
    });
  });

  test('renders character details correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          /**
           * v7_startTransition to remove warning about React.startTransition (to optimize state updates)
           * v7_relativeSplatPath to remove warning about route resolution inside routes with * (splat routes)
           * will change in React Router v7
           */
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ThemeProvider theme={theme}>
            <CharacterDetailsPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();
    expect(screen.getByText('The Boy Who Lived')).toBeInTheDocument();
    expect(screen.getByText('Half-blood')).toBeInTheDocument();
    expect(screen.getByText('31-07-1980')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('Gryffindor')).toBeInTheDocument();
    expect(screen.getByText('Stag')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(
      screen.getByText('Holly, Phoenix feather, 11 inches')
    ).toBeInTheDocument();
  });

  test('displays fallback message when no character is found', () => {
    store = mockStore({ character: null });
    render(
      <Provider store={store}>
        <MemoryRouter
          /**
           * v7_startTransition to remove warning about React.startTransition (to optimize state updates)
           * v7_relativeSplatPath to remove warning about route resolution inside routes with * (splat routes)
           * will change in React Router v7
           */
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ThemeProvider theme={theme}>
            <CharacterDetailsPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Character not found.')).toBeInTheDocument();
  });
});
