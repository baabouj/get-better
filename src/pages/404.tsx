import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <main className="flex flex-row justify-center items-center m-auto py-8">
      <h1 className="font-body text-4xl text-center md:text-left font-semibold capitalize text-primary my-2 px-4 border-r-2 border-dark/10 leading-tight">
        404
      </h1>
      <h1 className="font-body text-4xl text-center md:text-left font-semibold capitalize text-dark my-2 px-4 leading-tight">
        Page Not Found
      </h1>
    </main>
  );
};

export default NotFound;
