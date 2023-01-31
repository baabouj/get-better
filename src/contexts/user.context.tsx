import { useState, createContext, SetStateAction, Dispatch } from "react";

const initialState = {
  name: "",
  isLoggedIn: false,
};

const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  {
    name: "",
    isLoggedIn: false,
  },
  () => {},
]);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<User>(initialState);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

type User = {
  name: string;
  isLoggedIn: boolean;
};

export { UserContext, UserProvider };
