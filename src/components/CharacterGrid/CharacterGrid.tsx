import React from 'react';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CharacterGridProps } from 'src/types';
import CharacterCard from '../CharacterCard';

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  favorites,
  handleViewDetails,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: 2, px: { xs: 2, sm: 4 } }}
    >
      {characters.map((char) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={char.id}>
          <CharacterCard
            char={char}
            isFavorite={favorites.some((fav) => fav.id === char.id)}
            handleViewDetails={() =>
              handleViewDetails(char, dispatch, navigate)
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default CharacterGrid;
