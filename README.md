## About application

The app is suposed to fetch latest images from [https://unsplash.com/](Unsplash) - source of freely-usable images.

Home page show the latest 12 images, loaded on service.
There's also possibility to search images by keywords and see the result.
By clicking on any image it will open in the new window full-sized and having additional info about author, description, etc and link to the original Unsplash site with this image.
Every image may be stored in 'Favourite' Section when you can clear all favourites or open them to see more details. Each favourited image have possibility to be removed separately.
Switching between 'Home page' and 'Favourites' page is made through the navbar at th top of any page.

## Technologies used

- Next.js
- Typescript
- Redux
- Scss
- Material UI
- Free Unsplash API (50 requests per hour)

## App was deployed to the Vercel server and can be visited by

[https://images-app-six.vercel.app/](https://images-app-six.vercel.app/)


## How to run locally

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
