import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import logo from "../../assets/logo.jpg";
import { useCartStore } from "../../stores/useCartStore";
import TopBarNavbar from "./TopBarNavbar";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCartStore();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/course" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🚀 Redirect based on Clerk role
  useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role) {
      const role = user.publicMetadata.role;
      if (location.pathname === "/") {
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "user") {
          navigate("/user");
        }
      }
    }
  }, [isSignedIn, user, navigate, location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Promo Banner */}
      <div className="w-full text-center font-medium py-2 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 text-white">
        <p className="text-sm md:text-base tracking-wide">
          🎉 Exclusive Price Drop!{" "}
          <span className="font-semibold underline underline-offset-2">
            Offer Ends Soon!
          </span>
        </p>
      </div>

      {/* Navbar */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md py-0" : "shadow-sm py-2"}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <a href="/" className="flex items-center space-x-2">
                <img src={logo} alt="Elimu" className="h-10 w-10 rounded-full" />
                <span className="text-xl font-bold text-emerald-600 tracking-tight">Elimu</span>
              </a>
            </div>

            {/* Nav Items */}
            <div className="hidden md:flex justify-center flex-1 space-x-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-emerald-100 text-emerald-700 font-semibold"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Cart + Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() =>
                  isSignedIn
                    ? navigate("/cart")
                    : (window.location.href = "/sign-in?redirect_url=/cart")
                }
                className="text-gray-700 hover:text-emerald-600 p-2 relative"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-sm text-gray-700 hover:text-emerald-600 flex items-center px-2">
                    <FiUser className="mr-1" /> Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition">
                    Get Started
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-700 hover:text-emerald-600">
                <FiSearch />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 hover:text-emerald-600">
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600">
                <FiSearch />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 bg-white shadow-lg space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 text-base py-2 rounded hover:bg-gray-50 hover:text-emerald-600"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                isSignedIn
                  ? navigate("/cart")
                  : (window.location.href = "/sign-in?redirect_url=/cart");
                setMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
            >
              <FiShoppingCart className="mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="ml-auto bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <div className="pt-3 border-t border-gray-200">
              <SignedOut>
                <div className="space-y-2">
                  <SignInButton mode="modal">
                    <button className="w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full px-4 py-2 text-base text-white bg-emerald-600 rounded hover:bg-emerald-700">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </header>
      <TopBarNavbar/>
    </>
  );
};

export default Navbar;
