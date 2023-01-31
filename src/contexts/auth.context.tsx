import { createContext, useCallback, useState } from "react";

import { AuthModal } from "$components";
import { useUser } from "$hooks";
import axios from "$lib/axios";
import { Login, Signup } from "$utils/validation";

const AuthContext = createContext({
  login: async (_credentials: Login) => {},
  signup: async (_credentials: Signup) => {},
  logout: async () => {},
  open: (_modal: "login" | "signup") => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setUser] = useUser();

  const [openedModal, setOpenedModal] = useState<"login" | "signup" | null>(
    null
  );

  const login = useCallback(
    async (credentials: Login) => {
      const {
        data: { name },
      } = await axios.post("/api/auth/login", credentials);
      sessionStorage.setItem("user_name", name);
      setUser({
        name,
        isLoggedIn: true,
      });
    },
    [setUser]
  );

  const signup = useCallback(
    async (credentials: Signup) => {
      const {
        data: { name },
      } = await axios.post("/api/auth/signup", credentials);
      sessionStorage.setItem("user_name", name);
      setUser({
        name,
        isLoggedIn: true,
      });
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    await axios.post("/api/auth/logout");
    setUser({
      name: "",
      isLoggedIn: false,
    });
    sessionStorage.removeItem("user_name");
  }, [setUser]);

  const open = useCallback((modal: "login" | "signup") => {
    setOpenedModal(modal);
  }, []);

  const close = useCallback(() => setOpenedModal(null), []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        open,
      }}
    >
      <AuthModal openedModal={openedModal} open={open} close={close} />
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
