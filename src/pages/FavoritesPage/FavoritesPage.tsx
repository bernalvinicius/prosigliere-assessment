import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, useTheme } from '@mui/material';
import { CharacterGrid } from 'src/components';
import { RootState } from 'src/redux/store';
import { handleViewDetails } from 'src/utils';

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites);

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 4,
        mb: 4,
      }}
    >
      {favorites.length > 0 ? (
        <CharacterGrid
          characters={favorites}
          favorites={favorites}
          handleViewDetails={handleViewDetails}
        />
      ) : (
        <Typography
          variant="h1"
          textAlign="center"
          color={theme.palette.primary.main}
          sx={{ width: '100%', textTransform: 'capitalize', py: '30px' }}
        >
          no favorites found
        </Typography>
      )}
    </Box>
  );
};

export default FavoritesPage;
