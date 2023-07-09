import '@/styles/globals.css';
import React from 'react';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
