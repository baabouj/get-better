import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";

import { AuthProvider, UserProvider } from "$contexts";

import { Layout } from "$components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </UserProvider>
  );
}

export default MyApp;
