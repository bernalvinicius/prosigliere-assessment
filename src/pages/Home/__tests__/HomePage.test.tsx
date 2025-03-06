import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { EnhancedStore } from '@reduxjs/toolkit';
import UserEvent from '@testing-library/user-event';
import { fetchCharacters } from 'src/services';
import HomePage from '../HomePage';

jest.mock('src/services', () => ({
  fetchCharacters: jest.fn(),
}));

const mockStore = configureStore([]);

const renderComponent = (store: EnhancedStore) => {
  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={['/?page=1&filter=All']}
        /**
         * v7_startTransition to remove warning about React.startTransition (to optimize state updates)
         * v7_relativeSplatPath to remove warning about route resolution inside routes with * (splat routes)
         * will change in React Router v7
         */
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
};

describe('HomePage Component', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = mockStore({
      favorites: [],
      house: { selectedHouse: 'gryffindor' },
    });
    (fetchCharacters as jest.Mock).mockResolvedValue([]);
  });

  it('renders loading indicator when fetching data', async () => {
    (fetchCharacters as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent(store);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('fetches and displays characters', async () => {
    const mockCharacters = [
      { id: '1', name: 'Harry Potter' },
      { id: '2', name: 'Hermione Granger' },
    ];

    (fetchCharacters as jest.Mock).mockResolvedValue(mockCharacters);
    renderComponent(store);

    expect(await screen.findByText('Harry Potter')).toBeInTheDocument();

    expect(await screen.findByText('Hermione Granger')).toBeInTheDocument();
  });

  it('updates filter when selecting a different staff option', async () => {
    renderComponent(store);

    await UserEvent.click(screen.getByTestId('filter-select'));

    const allOptions = await screen.findAllByText('All');

    await UserEvent.click(allOptions[allOptions.length - 1]);

    expect(screen.getByRole('listbox')).toHaveTextContent('All');
  });

  it('updates filter when selecting a different house option', async () => {
    renderComponent(store);

    await UserEvent.click(screen.getByTestId('house-select'));

    const allOptions = await screen.findAllByText('Gryffindor');

    await UserEvent.click(allOptions[allOptions.length - 1]);

    expect(screen.getByRole('listbox')).toHaveTextContent('Gryffindor');
  });

  it('renders CharacterGrid with fetched characters', async () => {
    const mockCharacters = [
      { id: '1', name: 'Harry Potter' },
      { id: '2', name: 'Hermione Granger' },
    ];

    (fetchCharacters as jest.Mock).mockResolvedValue(mockCharacters);
    renderComponent(store);

    expect(await screen.findByText('Harry Potter')).toBeInTheDocument();
    expect(await screen.findByText('Hermione Granger')).toBeInTheDocument();

    expect(screen.getByTestId('character-grid')).toBeInTheDocument();
  });

  it('displays loading indicator when data is being fetched', async () => {
    (fetchCharacters as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent(store);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
