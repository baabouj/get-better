import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-col md:h-screen">{children}</div>;
};
export default Container;
