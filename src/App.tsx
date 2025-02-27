import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from '@mui/material/styles';

import { Navbar } from 'src/components';
import AppRoutes from 'src/routes';
import theme from 'src/theme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Container>
            <AppRoutes />
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
