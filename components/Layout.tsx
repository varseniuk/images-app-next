import { FC, ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;
