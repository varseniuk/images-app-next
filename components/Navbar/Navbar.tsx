import { FC } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar: FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ mb: 5 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ mr: 10 }}>
            <Link href="/">
              <a>Home page</a>
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/favourites">
              <a>Favourites</a>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
