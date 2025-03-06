import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, NavigateFunction } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dispatch } from '@reduxjs/toolkit';
import CharacterGrid from '../CharacterGrid';
import { CharacterGridProps, Character } from 'src/types';

jest.mock(
  '../../CharacterCard',
  () =>
    ({
      char,
      isFavorite,
      handleViewDetails,
    }: {
      char: Character;
      isFavorite: boolean;
      handleViewDetails: () => void;
    }) =>
      (
        <div data-testid="character-card">
          <span>{char.name}</span>
          <button onClick={() => handleViewDetails()}>View</button>
        </div>
      )
);

const mockStore = configureStore([]);

describe('CharacterGrid', () => {
  it('renders the characters correctly', () => {
    const mockCharacters: Character[] = [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
    ];
    const store = mockStore({});
    const mockProps: CharacterGridProps = {
      characters: mockCharacters,
      favorites: [],
      handleViewDetails: jest.fn(),
    };

    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <CharacterGrid {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  it('calls handleViewDetails when the button is clicked', () => {
    const mockCharacters: Character[] = [{ id: 1, name: 'Character 1' }];
    const store = mockStore({});
    const handleViewDetailsMock = jest.fn(
      (char: Character, dispatch: Dispatch, navigate: NavigateFunction) => {}
    );
    const mockProps: CharacterGridProps = {
      characters: mockCharacters,
      favorites: [],
      handleViewDetails: handleViewDetailsMock,
    };

    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <CharacterGrid {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('View'));
    expect(handleViewDetailsMock).toHaveBeenCalled();
  });
});
