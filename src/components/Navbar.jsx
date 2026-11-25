import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoSearch,
  IoPersonOutline,
  IoLanguage,
  IoClose,
  IoMenu,
  IoCart,
} from "react-icons/io5";
import { useCart } from "../context/CartContext";
import logoImg from "../assets/logo-transparent.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ar"); // 'ar' or 'en'
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "الصيدليات", nameEn: "Pharmacies", path: "/pharmacies" },
    { name: "العروض", nameEn: "Offers", path: "/offers" },
    { name: "التصنيفات", nameEn: "Categories", path: "/categories" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-neutral-100"
          : "bg-transparent border-b border-white/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 gap-6">
          {/* Left: Navigation Links - Desktop only */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold text-sm lg:text-base transition-all duration-300 relative group cursor-pointer tracking-wide ${
                  scrolled ? "text-neutral-600 hover:text-primary-600" : "text-white/80 hover:text-white"
                }`}
              >
                {language === "ar" ? link.name : link.nameEn}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full ${
                  scrolled ? "bg-primary-500" : "bg-white"
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={logoImg}
                alt="الفرمشيته"
                className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Right: Search, Login, Language - Desktop only */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-1 justify-end">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xs lg:max-w-sm">
              <input
                type="text"
                placeholder={
                  language === "ar" ? "ابحث عن دواء..." : "Search medicine..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 pr-11 text-sm bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-300 transition-all duration-300 placeholder:text-neutral-400"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors duration-300 cursor-pointer">
                <IoSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              className={`group relative p-2.5 rounded-xl transition-all duration-300 cursor-pointer border ${
                scrolled
                  ? "bg-neutral-50 hover:bg-primary-50 text-neutral-600 hover:text-primary-600 border-transparent hover:border-primary-200"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20"
              }`}
            >
              <IoCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Login Icon */}
            <button className={`group relative p-2.5 rounded-xl transition-all duration-300 cursor-pointer border ${
              scrolled
                ? "bg-neutral-50 hover:bg-primary-50 text-neutral-600 hover:text-primary-600 border-transparent hover:border-primary-200"
                : "bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20"
            }`}>
              <IoPersonOutline className="w-6 h-6" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`group relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                scrolled
                  ? "bg-neutral-50 hover:bg-primary-50 text-neutral-600 hover:text-primary-600 border-transparent hover:border-primary-200"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20"
              }`}
            >
              <IoLanguage className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider">
                {language.toUpperCase()}
              </span>
            </button>
          </div>

          {/* Mobile: Menu Button - Premium Style */}
          <button
            onClick={toggleMenu}
            className="md:hidden group relative p-3 rounded-xl bg-white hover:bg-primary-50 text-neutral-600 hover:text-primary-600 transition-all duration-300 z-60 cursor-pointer border border-transparent hover:border-primary-200 shadow-md"
          >
            {isMenuOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
            <div className="absolute inset-0 bg-primary-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide from right */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-full bg-white/98 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out z-45 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="flex flex-col h-full pt-32 px-8"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder={
                language === "ar" ? "ابحث عن دواء..." : "Search medicine..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pr-12 text-sm bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-300 transition-all duration-300 placeholder:text-neutral-400"
              dir={language === "ar" ? "rtl" : "ltr"}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors duration-300 cursor-pointer">
              <IoSearch className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMenu}
                className="group px-6 py-4 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-2xl font-semibold transition-all text-lg cursor-pointer border border-transparent hover:border-primary-200"
              >
                {language === "ar" ? link.name : link.nameEn}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-200 my-6"></div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            {/* Login Button */}
            <button className="group flex items-center gap-4 px-6 py-4 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-2xl font-semibold transition-all text-lg cursor-pointer border border-transparent hover:border-primary-200">
              <div className="p-2 bg-neutral-100 group-hover:bg-primary-100 rounded-xl transition-all">
                <IoPersonOutline className="w-6 h-6" />
              </div>
              <span>{language === "ar" ? "تسجيل الدخول" : "Login"}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="group flex items-center gap-4 px-6 py-4 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 rounded-2xl font-semibold transition-all text-lg cursor-pointer border border-transparent hover:border-primary-200"
            >
              <div className="p-2 bg-neutral-100 group-hover:bg-primary-100 rounded-xl transition-all">
                <IoLanguage className="w-6 h-6" />
              </div>
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-35 cursor-pointer"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
