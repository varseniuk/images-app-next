export type urlsType = {
  thumb: string;
  regular: string;
};

export type userType = {
  name: string;
};

export type imageType = {
  id: string;
  urls: urlsType;
  alt_description: string;
  description: string;
  user: userType;
  views?: number;
  width: number;
  height: number;
};

export type imagesType = {
  images: imageType[];
};
