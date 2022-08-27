import { FC, Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchResultsActions } from '../../store/reducers/searchResultsReducer';
import { imageType } from '../../typedefs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
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

  const handleInput = (value) => {
    setSearchError(false);
    setQuery(value);
  };

  const handleSearch = async () => {
    const SEARCH_URL = `${process.env.NEXT_PUBLIC_API_PATH}/search/photos?page=1&per_page=12&query=${query}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

    const response = await fetch(SEARCH_URL);
    const data = await response.json();

    if (!data.results.length) {
      setSearchError(true);
      return;
    }
    setPictures(data.results);
    dispatch(searchResultsActions.saveResults(query, data.results));
  };

  const handleClearSearch = () => {
    setQuery('');
    dispatch(searchResultsActions.clearResults());
    setInitialPictures();
  };

  return (
    <div className={styles.searchBlock}>
      <TextField
        label="Search some image"
        variant="standard"
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
        sx={{
          mr: {
            sm: 2,
            xs: 1,
          },
        }}
      />
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Button onClick={handleSearch} variant="contained" color="success">
          Search
        </Button>

        {withSearchResults && (
          <Button variant="outlined" color="error" onClick={handleClearSearch}>
            Clear search results
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default SearchBar;
