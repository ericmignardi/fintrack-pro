import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Menu, Search, X } from "lucide-react";

function Header() {
  const [mobileHeaderToggle, setMobileHeaderToggle] = useState(false);

  const navItems = [
    { to: "/", label: "Transactions" },
    { to: "/budgets", label: "Budgets" },
    { to: "/goals", label: "Goals" },
  ];

  return (
    <header className="flex justify-between items-center p-6 relative">
      {/* Logo */}
      <Link to="/">
        <img
          className="h-4 sm:h-6 md:h-8 lg:h-10 w-auto"
          src={logo}
          alt="fintrack-pro logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "underline underline-offset-8 decoration-[var(--neutral-gray)]/50"
                : "hover:underline hover:underline-offset-8 hover:decoration-[var(--neutral-gray)]/50"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Desktop Other */}
      <div className="hidden lg:flex gap-4 items-center">
        <label
          htmlFor="transactions"
          className="flex items-center bg-white rounded-full border border-[var(--neutral-gray)]/50 px-4 py-2"
        >
          <input
            className="focus:outline-none text-xs"
            type="text"
            name="transactions"
            id="transactions"
            placeholder="Search..."
          />
          <Search size={18} />
        </label>
      </div>

      {/* Mobile Navigation Toggle */}
      <button
        className="lg:hidden bg-white border border-[var(--neutral-gray)]/50 rounded-full p-2 cursor-pointer z-50"
        onClick={() => setMobileHeaderToggle(!mobileHeaderToggle)}
        aria-expanded={mobileHeaderToggle}
        aria-controls="mobile-menu"
      >
        {mobileHeaderToggle ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {mobileHeaderToggle && (
        <nav
          id="mobile-menu"
          className="absolute top-0 right-0 bg-white shadow-lg flex flex-col gap-6 p-6 w-48 z-40"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileHeaderToggle(false)}
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 decoration-[var(--neutral-gray)]/50 text-sm"
                  : "hover:underline hover:underline-offset-8 hover:decoration-[var(--neutral-gray)]/50 text-sm"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
