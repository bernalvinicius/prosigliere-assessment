import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'src/redux/store';
import { Character } from 'src/types';

const CharacterDetailsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const selectedCharacter = useSelector(
    (state: RootState) => state.character ?? null
  );

  const character: Character | null =
    selectedCharacter ||
    JSON.parse(localStorage.getItem('selectedCharacter') || 'null');

  if (!character) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        Character not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        mb: 4,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: `${theme.palette.custom.white}`,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: `${theme.palette.secondary.main}`,
                  },
                }}
              >
                <ArrowBack
                  sx={{
                    width: 35,
                    height: 35,
                  }}
                />
              </IconButton>

              <Typography
                variant="h1"
                textAlign="center"
                color={`${theme.palette.primary.main}`}
                sx={{ width: '100%' }}
              >
                {character.name}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={character.image || 'https://via.placeholder.com/300'}
                alt={character.name}
                sx={{ borderRadius: 2, width: '100%', height: 'auto' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Card
              elevation={3}
              sx={{ p: 3, borderRadius: 2, boxShadow: 'none' }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                >
                  <strong>
                    {character.gender === 'female' ? 'Actress' : 'Actor'}:
                  </strong>{' '}
                  {character.actor}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <strong>Alternate Names:</strong>{' '}
                  {character.alternate_names.join(', ')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Ancestry:</strong> {character.ancestry}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Birthday:</strong>{' '}
                  {character.dateOfBirth || 'Unknown'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Eye Color:</strong> {character.eyeColour || 'Unknown'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Hair Color:</strong>{' '}
                  {character.hairColour || 'Unknown'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>House:</strong> {character.house || 'Unknown'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Patronus:</strong> {character.patronus || 'None'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Species:</strong> {character.species}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'capitalize',
                    py: '10px',
                    fontSize: '1.25rem',
                  }}
                >
                  <strong>Wand:</strong>{' '}
                  {`${character.wand.wood || 'Unknown'}, ${
                    character.wand.core || 'Unknown'
                  }, ${character.wand.length || 'Unknown'}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CharacterDetailsPage;
