import { FC, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Gallery from '../components/Gallery/Gallery';
import { imageType } from '../typedefs';
import SearchBar from '../components/SearchBar/SearchBar';

export const getServerSideProps: GetServerSideProps = async () => {
  const ACCESS_KEY = process.env.ACCESS_KEY;
  const API_PATH = process.env.API_PATH;
  const url = `${API_PATH}/photos?page=1&per_page=12&client_id=${ACCESS_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      images: data,
    },
  };
};

interface Props {
  images: imageType[];
}

const HomePage: FC<Props> = ({ images }) => {
  const [pictures, setPictures] = useState<imageType[]>(images);

  const setInitialPictures = useCallback(() => {
    setPictures(images);
  }, [images]);

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>

      <div className="container">
        <SearchBar
          setPictures={setPictures}
          setInitialPictures={setInitialPictures}
        />

        <Gallery images={pictures} />
      </div>
    </>
  );
};

export default HomePage;
