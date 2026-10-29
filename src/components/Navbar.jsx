
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Crown,
  Menu,
  X,
  UserRound,
  LogIn,
  UserPlus,
  LogOut,
  CalendarDays,
} from "lucide-react";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("current_user") || "null");
    } catch {
      return null;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Listen for login and logout changes
  useEffect(() => {
    const updateUser = () => {
      try {
        setCurrentUser(
          JSON.parse(localStorage.getItem("current_user") || "null")
        );
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener("authChanged", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-[#b78539]"
        : "text-stone-600 hover:text-[#b78539]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffdf8]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123d32] text-[#e7bd75]">
            <Crown size={25} />
          </div>

          <div>
            <h1 className="font-serif text-xl font-bold text-[#173d35]">
              RoyalStay
            </h1>
            <p className="text-[9px] tracking-[3px] text-stone-500">
              HOTEL & RESORT
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={navLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-semibold text-[#173d35] transition hover:border-[#a97831] hover:text-[#a97831]"
              >
                <CalendarDays size={17} />
                My Bookings
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg bg-[#173d35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245447]"
              >
                <UserRound size={17} />
                {currentUser.fullName?.split(" ")[0] || "Profile"}
              </Link>

              <Link
                to="/logout"
                className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#173d35] transition hover:text-[#a97831]"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-[#e7bd75] px-5 py-3 text-sm font-semibold text-[#173d35] transition hover:bg-[#d8aa5d]"
              >
                <UserPlus size={17} />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-stone-200 p-2 text-[#173d35] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-stone-200 bg-[#fffdf8] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}

            <div className="border-t border-stone-200 pt-5">
              {currentUser ? (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-[#173d35]">
                    Welcome, {currentUser.fullName || "Guest"}
                  </p>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-3 text-sm font-semibold text-[#173d35]"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg bg-[#e7bd75] px-4 py-3 text-sm font-semibold text-[#173d35]"
                  >
                    <CalendarDays size={18} />
                    My Bookings
                  </Link>

                  <Link
                    to="/logout"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-lg border border-[#173d35] px-4 py-3 text-sm font-semibold text-[#173d35]"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#e7bd75] px-4 py-3 text-sm font-semibold text-[#173d35]"
                  >
                    <UserPlus size={18} />
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
