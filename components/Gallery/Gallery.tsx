import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { imagesType } from '../../typedefs';
import styles from './Gallery.module.scss';

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
