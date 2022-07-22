import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Picture from '../../components/Picture/Picture';
import { imageType } from '../../typedefs';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const ACCESS_KEY = process.env.ACCESS_KEY;
  const API_PATH = process.env.API_PATH;
  const url = `${API_PATH}/photos/${id}?client_id=${ACCESS_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      image: data,
    },
  };
};
interface Props {
  image: imageType;
}

const ImagePage: FC<Props> = ({ image }) => {
  const imageSize = {
    width: image.width / 8,
    height: image.height / 8,
  };

  return (
    <>
      <Head>
        <title>Image by {image.user.name}</title>
      </Head>
      <Picture image={image} />
    </>
  );
};

export default ImagePage;
