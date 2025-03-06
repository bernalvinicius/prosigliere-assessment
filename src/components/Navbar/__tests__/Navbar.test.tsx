import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { EnhancedStore } from '@reduxjs/toolkit';
import theme from 'src/theme';
import Navbar from '../Navbar';

const mockStore = configureStore([]);

describe('Navbar Component', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = mockStore({
      house: { selectedHouse: 'gryffindor' },
    });
  });

  it('renders logo image', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Navbar />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByAltText('Harry Potter Logo')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Navbar />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });
});
