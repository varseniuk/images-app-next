import { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Gallery from '../../components/Gallery/Gallery';
import { favouritesActions } from '../../store/reducers/favouritesReducer';
import { RootState } from '../../store/store';
import { imageType } from '../../typedefs';
import Button from '@mui/material/Button';

const FavouritesPage: FC = () => {
  const favourites = useSelector<RootState, imageType[]>(
    (state) => state.favourites
  );

  const dispatch = useDispatch();

  const clearFavourites = useCallback(() => {
    dispatch(favouritesActions.clearAll());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Favourites</title>
      </Head>

      <div className="container">
        {!!favourites.length ? (
          <Button
            onClick={clearFavourites}
            variant="contained"
            color="error"
            sx={{ width: '25%', alignSelf: 'center', mb: 5 }}
          >
            Clear all
          </Button>
        ) : (
          <h2 className="favouritesTitle">You have no favourited images yet</h2>
        )}

        <Gallery images={favourites} />
      </div>
    </>
  );
};

export default FavouritesPage;
