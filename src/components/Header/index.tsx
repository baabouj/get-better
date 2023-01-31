import { useEffect } from "react";
import Link from "next/link";

import Navbar from "./Navbar";

import { IoExitOutline } from "react-icons/io5";
import { useUser, useAuth } from "$hooks";

const Header = () => {
  const { open, logout } = useAuth();

  const [user, setUser] = useUser();

  useEffect(() => {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("user_name")
    ) {
      setUser({
        name: sessionStorage.getItem("user_name") as string,
        isLoggedIn: true,
      });
    }
  }, [setUser]);

  const onLogout = async () => {
    await logout();
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center">
      <h1 className="font-body text-2xl font-medium text-primary">
        <Link href="/">
          <a>GetBetter</a>
        </Link>
      </h1>
      <Navbar />
      <div className="flex my-3">
        {user.isLoggedIn ? (
          <div className="flex item-center">
            <p className="mx-4 p-1 font-body font-medium text-gray-800 border-b-2 border-transparent  hover:border-b-2 hover:border-primary transition-all">
              <Link href="/appointments">My Appointments</Link>
            </p>
            <button
              className="flex items-center mx-4 p-1 font-body font-medium text-gray-800 border-b-2 border-transparent  hover:border-b-2 hover:border-primary transition-all"
              onClick={onLogout}
            >
              <p className="px-2">{user.name}</p>
              <IoExitOutline className="text-2xl" />
            </button>
          </div>
        ) : (
          <>
            <button
              className="w-28 mx-2 rounded-full font-body font-medium text-primary border-2 border-primary shadow py-2 px-4"
              onClick={() => open("login")}
            >
              Log in
            </button>

            <button
              className="w-28 mx-2 rounded-full font-body font-medium bg-primary text-gray-100 shadow py-2 px-4"
              onClick={() => open("signup")}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
