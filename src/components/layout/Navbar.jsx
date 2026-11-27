import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBox from "../common/SearchBox";
import { useTranslation } from "react-i18next";
import {
  Globe,
  User,
  Search,
  Menu,
  X,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { getStoredUser, clearAuth } from "../../services/api/auth";
import Avatar from "../common/Avatar";
import ConfirmModal from "../common/ConfirmModal";
import logoImg from "../../assets/logo-transparent.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check for logged-in user on mount
  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);
  }, []);

  // Handle logout
  const handleLogout = () => {
    clearAuth();
    setCurrentUser(null);
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.offers"), path: "/offers" },
    { name: t("nav.products"), path: "/products" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Floating Island Glass Capsule Navbar — Perfectly Aligned to Logo */}
      <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500">
        <nav
          className={`relative rounded-full transition-all duration-500 px-5 sm:px-7 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between border ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-gray-200/80 shadow-gray-900/15 text-gray-800"
              : "bg-white/90 backdrop-blur-2xl border-white/90 shadow-black/10 text-gray-800"
          }`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {/* Left Section: Language, User, Search — Aligned to Logo height */}
          <div className="hidden lg:flex items-center gap-2.5 flex-1 h-11">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3.5 h-10 rounded-full bg-gray-100/80 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-95 text-xs font-bold border border-gray-200/50"
            >
              <Globe size={16} strokeWidth={2} />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Login / User Avatar */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 h-10">
                <Avatar user={currentUser} size="sm" />
                <button
                  onClick={handleLogoutClick}
                  className="p-2 h-10 w-10 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 cursor-pointer active:scale-90"
                  title={t("nav.logout")}
                >
                  <LogOut size={16} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100/80 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-90 border border-gray-200/50"
                title={t("nav.login")}
              >
                <User size={16} strokeWidth={2} />
              </Link>
            )}

            {/* Search with live suggestions */}
            <SearchBox language={language} className="flex-1 max-w-[230px] xl:max-w-[270px]" inputClassName="!h-10 !text-xs" />
          </div>

          {/* Center Logo — Clean Proportions */}
          <Link to="/" className="flex items-center justify-center shrink-0 mx-2 sm:mx-4 group">
            <img
              src={logoImg}
              alt="AlFarmashia"
              className="h-10 sm:h-12 md:h-13 w-auto max-w-[140px] sm:max-w-[165px] md:max-w-[185px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Section: Nav Links + Cart Button — Aligned to Logo height */}
          <div className="hidden lg:flex items-center gap-2.5 flex-1 justify-end h-11">
            {/* Nav Links Container */}
            <div className="flex items-center gap-1 bg-gray-100/80 p-1 h-10 rounded-full border border-gray-200/50">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-white text-teal-700 shadow-xs shadow-gray-900/10"
                        : "text-gray-700 hover:text-teal-700 hover:bg-white/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Cart Button — Aligned height */}
            <Link
              to="/cart"
              className="relative h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50/90 hover:bg-emerald-100 text-teal-700 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-105 border border-emerald-200/60 shadow-xs"
            >
              <ShoppingCart size={17} strokeWidth={2.2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              {searchOpen ? <X size={18} strokeWidth={2} /> : <Search size={18} strokeWidth={2} />}
            </button>
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full bg-emerald-50 text-teal-700 border border-emerald-200/50"
            >
              <ShoppingCart size={18} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </nav>
        {searchOpen && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-200/80 shadow-2xl p-3" dir={language === "ar" ? "rtl" : "ltr"}>
            <SearchBox language={language} autoFocus inline onDone={() => setSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white/95 backdrop-blur-2xl transform transition-transform duration-300 ease-out z-50 lg:hidden ${
          isMenuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none"
        }`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={toggleMenu}>
              <img src={logoImg} alt="Logo" className="h-12 w-auto object-contain" />
            </Link>
            <button onClick={toggleMenu} className="p-2 rounded-full bg-gray-100 text-gray-700">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBox language={language} inline onDone={() => setIsMenuOpen(false)} />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-2 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className="px-4 py-3 rounded-2xl text-base font-semibold text-gray-800 hover:bg-teal-50 hover:text-teal-700 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User & Language Actions */}
          <div className="border-t border-gray-100 pt-6 flex flex-col gap-3">
            {currentUser ? (
              <div className="flex items-center justify-between px-4 py-3 bg-teal-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Avatar user={currentUser} size="sm" />
                  <span className="text-sm font-semibold text-teal-800">
                    {currentUser.name || currentUser.email?.split("@")[0]}
                  </span>
                </div>
                <button onClick={handleLogoutClick} className="text-red-600">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-teal-50 rounded-2xl font-semibold text-gray-700"
              >
                <User size={20} />
                <span>{t("nav.login")}</span>
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-teal-50 rounded-2xl font-semibold text-gray-700"
            >
              <Globe size={20} />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title={t("logout.title")}
        message={t("logout.message")}
        confirmText={t("logout.confirm")}
        cancelText={t("logout.cancel")}
        confirmVariant="danger"
      />
    </>
  );
};

export default Navbar;
