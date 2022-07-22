import { FC } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.scss';
import Link from 'next/link';
import { imagesType } from '../../typedefs';

const Gallery: FC<imagesType> = ({ images }) => {
  return (
    <>
      <div className={styles.imagesContainer}>
        {images &&
          images.map((image) => {
            const imageUrl = image.urls.thumb;
            const imageAlt = image.alt_description;

            return (
              <div key={image.id} className={styles.thumbContainer}>
                <Link href={`/image/${image.id}`}>
                  <Image
                    src={imageUrl}
                    layout="fill"
                    alt={imageAlt}
                    objectFit="contain"
                    className={styles.thumb}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Gallery;
