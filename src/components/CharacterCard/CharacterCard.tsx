import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { CharacterCardProps } from 'src/types';
import { addFavorite, removeFavorite } from 'src/redux/slices/favoritesSlice';

const CharacterCard: React.FC<CharacterCardProps> = ({
  char,
  isFavorite,
  handleViewDetails,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: `2px solid ${theme.palette.secondary.main}`,
        background: 'transparent',
        '&:hover img': {
          transform: 'scale(1.1)',
          transition: 'transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={char.image || 'https://placehold.co/150'}
        alt={char.name}
        sx={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          objectFit: 'contain',
          margin: '16px auto',
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', color: `${theme.palette.primary.main}` }}
        >
          {char.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleViewDetails(char)}
            sx={{
              backgroundColor: `${theme.palette.primary.main}`,
              '&:hover': {
                backgroundColor: `${theme.palette.secondary.main}`,
              },
            }}
          >
            View Details
          </Button>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              isFavorite
                ? dispatch(removeFavorite(char.id))
                : dispatch(addFavorite(char));
            }}
            sx={{ marginLeft: 1 }}
          >
            {isFavorite ? (
              <Favorite sx={{ color: `${theme.palette.custom.red}` }} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
