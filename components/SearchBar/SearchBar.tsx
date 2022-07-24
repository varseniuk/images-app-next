import { FC, Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchResultsActions } from '../../store/reducers/searchResultsReducer';
import { imageType } from '../../typedefs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './SearchBar.module.scss';

interface Props {
  setPictures: Dispatch<SetStateAction<imageType[]>>;
  setInitialPictures: () => void;
  withSearchResults: boolean;
  initialQuery: string;
}

const SearchBar: FC<Props> = ({
  setPictures,
  setInitialPictures,
  withSearchResults,
  initialQuery,
}) => {
  const [query, setQuery] = useState<string>(initialQuery || '');
  const [searchError, setSearchError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleInput = useCallback(async (value) => {
    setSearchError(false);
    setQuery(value);
  }, []);

  const handleSearch = useCallback(async () => {
    const SEARCH_URL = `${process.env.NEXT_PUBLIC_API_PATH}/search/photos?page=1&per_page=12&query=${query}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

    const response = await fetch(SEARCH_URL);
    const data = await response.json();

    if (!data.results.length) {
      setSearchError(true);
      return;
    }
    setPictures(data.results);
    dispatch(searchResultsActions.saveResults(query, data.results));
  }, [query, setPictures, dispatch]);

  const handleClearSearch = useCallback(() => {
    setQuery('');
    dispatch(searchResultsActions.clearResults());
    setInitialPictures();
  }, [setInitialPictures, dispatch]);

  return (
    <div className={styles.searchBlock}>
      <TextField
        label="Search some image"
        variant="standard"
        className={styles.searchInput}
        onChange={(e) => handleInput(e.target.value)}
        value={query}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        error={searchError}
        onBlur={() => setSearchError(false)}
        helperText={searchError ? 'Nothing found' : ' '}
      />

      <Button
        onClick={handleSearch}
        className={styles.searchButton}
        variant="contained"
        color="success"
        sx={{ margin: '0 2rem' }}
      >
        Search
      </Button>

      {withSearchResults && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearSearch}
          className={styles.searchButton}
        >
          Clear search results
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
