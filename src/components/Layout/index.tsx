import Head from "next/head";

import Header from "$components/Header";

import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen py-8 px-10 md:px-20">
      <Head>
        <title>GetBetter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
