import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <nav className="hidden lg:flex items-center justify-center">
      <ul className="mx-16 flex items-center justify-center">
        <NavLink to="#" name="Home" />
        <NavLink to="#about" name="About" />
        <NavLink to="#services" name="Services" />
        <NavLink to="#FAQ" name="FAQ" />
      </ul>
    </nav>
  );
};

export default Navbar;
