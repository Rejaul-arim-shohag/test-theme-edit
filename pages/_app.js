import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import cartReducer, { getTotals } from "../redux/stateSlices/CartSlice";

// Common Css
import "../styles/common.css";
import "../styles/main_page/main_page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';


//landing css
import '../styles/landing-pages-css/landing-9.css';
import '../styles/landing-pages-css/landing-12.css';


// Theme Css
import "../styles/theme_1/style.css";
import '../styles/theme_two/theme_two.css';
import '../styles/theme_two/theme_two_media.css';

import '../styles/landing_three/landing_three.css';






function MyApp({ Component, pageProps }) {
  store.dispatch(getTotals());
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
