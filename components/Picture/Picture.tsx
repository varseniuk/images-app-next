import { FC } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { favouritesActions } from '../../store/reducers/favouritesReducer';
import { useMemo } from 'react';
import { imageType } from '../../typedefs';
import { RootState } from '../../store/store';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Picture.module.scss';

interface Props {
  image: imageType;
}

const Picture: FC<Props> = ({ image }) => {
  const { id, alt_description, description, user, views, width, height } =
    image;

  const imageSize = {
    width: width / 8,
    height: height / 8,
  };

  const router = useRouter();

  const dispatch = useDispatch();
  const unsplashLink = `https://unsplash.com/photos/${id}`;

  const addToFav = () => {
    dispatch(favouritesActions.addImage(image));
  };

  const favourites = useSelector<RootState, imageType[]>(
    (state) => state.favourites
  );

  const isFavourited = useMemo(() => {
    return favourites.some((favImg) => favImg.id === image.id);
  }, [favourites, image.id]);

  const removeFromFav = () => {
    dispatch(favouritesActions.removeImg(image.id));
  };

  return (
    <div className={styles.pictureContainer}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
      >
        Go back
      </Button>

      <h1>Photo is made by {user.name}</h1>

      <Image
        src={image.urls.regular}
        width={imageSize.width}
        height={imageSize.height}
        alt={alt_description}
      />

      <p>{description || "Unfortunatelly, there's no description :("}</p>

      <p>
        Total views: <strong>{views.toLocaleString('en-US')}</strong>
      </p>

      <p>
        For more details about this picture visit{' '}
        <strong>
          <a href={unsplashLink} target="_blank" rel="noreferrer">
            Unsplash
          </a>
        </strong>
      </p>

      <Stack spacing={2} direction="row">
        {isFavourited ? (
          <Button onClick={removeFromFav} variant="outlined" color="error">
            Remove from favourites
          </Button>
        ) : (
          <Button onClick={addToFav} variant="contained">
            Add to favourites
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default Picture;
