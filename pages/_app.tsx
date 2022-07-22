import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default MyApp;
