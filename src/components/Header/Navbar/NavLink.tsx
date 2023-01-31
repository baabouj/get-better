import { FC } from "react";
import Link from "next/link";

const NavLink: FC<{ to: string; name: string }> = ({ to, name }) => {
  return (
    <li className="mx-4 p-1 font-body font-medium text-gray-800 border-b-2 border-transparent  hover:border-b-2 hover:border-primary transition-all">
      <Link href={to}>{name}</Link>
    </li>
  );
};

export default NavLink;
