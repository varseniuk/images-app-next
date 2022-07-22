import { FC } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { favouritesActions } from '../../store/reducers/favouritesReducer';
import { useMemo } from 'react';
import { imageType } from '../../typedefs';
import { RootState } from '../../store/store';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
      <h1>Photo is made by {user.name} </h1>

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
          <a href={unsplashLink}>Unsplash</a>
        </strong>
      </p>
      <Stack spacing={2} direction="row">
        <Button onClick={addToFav} variant="contained">
          Add to favourites
        </Button>
        {isFavourited && (
          <Button onClick={removeFromFav} variant="outlined" color="error">
            Remove from favourites
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default Picture;
