import "../styles/globals.css";
import type { AppProps } from "next/app";
import configureStore from "../store/store";
import { Provider as ReduxProvider } from "react-redux";
import intitialState from "../store/intitialState";

const store = configureStore(intitialState);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
