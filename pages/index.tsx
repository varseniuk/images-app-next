import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { imageType } from '../typedefs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const getStaticProps: GetStaticProps = async () => {
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
  const [query, setQuery] = useState<string>('');
  const [pictures, setPictures] = useState<imageType[]>(images);

  const SEARCH_URL = `${process.env.NEXT_PUBLIC_API_PATH}/search/photos?page=1&per_page=12&query=${query}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

  const handleInput = useCallback(async (value) => {
    setQuery(value);
  }, []);

  const handleSearch = useCallback(async () => {
    const response = await fetch(SEARCH_URL);
    const data = await response.json();
    setPictures(data.results);
    console.log(data.results);
  }, [SEARCH_URL]);

  return (
    <>
      <Head>
        <title>Gallery</title>
      </Head>
      <div className="container">
        <div className="searchBlock">
          <TextField
            id="standard-basic"
            label="Search some image"
            variant="standard"
            onChange={(e) => handleInput(e.target.value)}
            value={query}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            color="success"
            sx={{ ml: 5 }}
          >
            Search
          </Button>
        </div>
        <Gallery images={pictures} />
      </div>
    </>
  );
};

export default HomePage;
