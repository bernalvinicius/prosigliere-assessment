import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Button, useTheme, Box } from '@mui/material';
import { RootState } from 'src/redux/store';

const Navbar = () => {
  const theme = useTheme();
  const selectedHouse = useSelector(
    (state: RootState) => state.house.selectedHouse
  );

  const backgroundColor =
    // I used 'as keyof typeof theme.palette.custom' to tell TypeScript that selectedHouse
    // is a valid key of the theme.palette.custom
    theme.palette.custom[selectedHouse as keyof typeof theme.palette.custom] ||
    theme.palette.primary.main;

  /**
   * I should use useLocation from 'react-router-dom' to get active URL
   * const location = useLocation() -> location.pathname
   *
   */
  return (
    <AppBar position="static" sx={{ backgroundColor }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img
            src="/harry-potter.png"
            alt="Harry Potter Logo"
            style={{ height: 60 }}
          />
        </Box>
        <Button
          sx={{ textTransform: 'capitalize' }}
          color="inherit"
          component={Link}
          to="/"
        >
          Characters
        </Button>
        <Button
          sx={{ textTransform: 'capitalize' }}
          color="inherit"
          component={Link}
          to="/favorites"
        >
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
