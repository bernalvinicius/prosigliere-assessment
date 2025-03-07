import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Grid,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { Character } from 'src/types';
import { RootState } from 'src/redux/store';
import { CharacterGrid } from 'src/components';
import { handleViewDetails } from 'src/utils';
import { fetchCharacters } from 'src/services';
import { setHouse } from 'src/redux/slices/houseSlice';

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  // useSearchParams to configure the 'page' and 'filter' parameters in the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const favorites = useSelector((state: RootState) => state.favorites);
  const selectedHouse = useSelector(
    (state: RootState) => state.house.selectedHouse
  );

  // Reading URL parameters
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const filterFromUrl = searchParams.get('filter') || 'All';
  // URL-based internal states
  const [page, setPage] = useState(pageFromUrl);
  const [filter, setFilter] = useState(filterFromUrl);
  const itemsPerPage = 16;

  /**
   * useCallback is being used to memorize the getCharacters function and
   * prevent it from being recreated on each render of the component
   */
  const getCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCharacters(filter);
      setCharacters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  /**
   * useEffect for setSearchParams is needed to keep the URL in sync with the
   * component's internal states (page and filter)
   */
  useEffect(() => {
    setSearchParams({ page: String(page), filter });
  }, [page, filter, setSearchParams]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  /**
   * useMemo memorizes the result of the operation to avoid unnecessary calculations
   * It only recalculates charactersToShow if characters, startIndex or endIndex change
   */
  const charactersToShow = useMemo(
    () => characters.slice(startIndex, endIndex),
    [characters, startIndex, endIndex]
  );

  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 30px',
          flexWrap: 'wrap',
        }}
      >
        <Grid item xs={12} sm="auto">
          <FormControl
            sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}
          >
            <Select
              role="combobox"
              data-testid="filter-select"
              labelId="filter-select"
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              value={filter}
              aria-label="Filter characters"
            >
              <MenuItem role="option" value="All">
                All
              </MenuItem>
              <MenuItem role="option" value="Students">
                Students
              </MenuItem>
              <MenuItem role="option" value="Staff">
                Staff
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm="auto">
          <FormControl
            sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }}
          >
            <Select
              role="combobox"
              data-testid="house-select"
              labelId="house-select"
              value={selectedHouse}
              onChange={(e) => {
                const selectedHouse = e.target.value;
                dispatch(setHouse(selectedHouse));
              }}
              aria-label="Select house"
            >
              <MenuItem role="option" value="gryffindor">
                Gryffindor
              </MenuItem>
              <MenuItem role="option" value="slytherin">
                Slytherin
              </MenuItem>
              <MenuItem role="option" value="hufflepuff">
                Hufflepuff
              </MenuItem>
              <MenuItem role="option" value="ravenclaw">
                Ravenclaw
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <CharacterGrid
            characters={charactersToShow}
            favorites={favorites}
            handleViewDetails={handleViewDetails}
          />

          <Grid container justifyContent="center" sx={{ mt: 4, mb: 4 }}>
            <Pagination
              // Math.ceil: Round up
              count={Math.ceil(characters.length / itemsPerPage)}
              page={page}
              onChange={(_, value) => {
                setPage(value);
                setSearchParams({ page: String(value) });
                window.scrollTo(0, 0);
              }}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: `${theme.palette.secondary.main}`,
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: `${theme.palette.secondary.main} !important`,
                  color: 'white',
                },
              }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default HomePage;
