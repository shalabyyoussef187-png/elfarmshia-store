import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import logoImg from "../../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { totalItems } = useCart();

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

  // Open logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle body scroll when menu opens/closes
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
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-2xl shadow-black/8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Left Section: Language, Login, Search */}
          <div className="hidden lg:flex items-center gap-3 flex-1">
            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Globe size={18} strokeWidth={2} />
              <span className="text-sm font-medium">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Login/User */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Avatar user={currentUser} size="md" />
                <button
                  onClick={handleLogoutClick}
                  className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-110"
                  title={t("nav.logout")}
                >
                  <LogOut size={19} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2.5 rounded-full bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-110"
              >
                <User size={19} strokeWidth={2} />
              </Link>
            )}

            {/* Search Bar */}
            <div className="relative flex-1 max-w-xs">
              <Search
                size={18}
                strokeWidth={2}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  searchFocused ? "text-teal-500" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                placeholder={t("common.searchProducts")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-full text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 outline-none ${
                  searchFocused
                    ? "bg-white ring-2 ring-teal-500/20 shadow-sm"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex items-center justify-center mx-4">
            <img
              src={logoImg}
              alt="Logo"
              className="h-20 w-20 object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* Right Section: Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-95"
              >
                {link.name}
              </Link>
            ))}

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative ml-3 p-2.5 rounded-full bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-110"
            >
              <ShoppingCart size={19} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-teal-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-90 hover:scale-110"
            >
              <ShoppingCart size={20} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-teal-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-full bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-90"
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={toggleMenu}>
              <img
                src={logoImg}
                alt="Logo"
                className="h-16 w-16 object-contain"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-50 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-90"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="relative mb-6">
            <Search
              size={18}
              strokeWidth={2}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={t("common.searchProducts")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
            />
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-2 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className="px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 cursor-pointer active:translate-x-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6" />

          {/* Mobile Actions */}
          <div className="flex flex-col gap-3">
            {currentUser ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-50">
                  <Avatar user={currentUser} size="sm" />
                  <span className="text-sm font-medium text-teal-700">
                    {currentUser.name ||
                      currentUser.email?.split("@")[0] ||
                      "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <LogOut size={20} strokeWidth={2} />
                  <span className="text-sm font-medium">{t("nav.logout")}</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <User size={20} strokeWidth={2} />
                <span className="text-sm font-medium">{t("nav.login")}</span>
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Globe size={20} strokeWidth={2} />
              <span className="text-sm font-medium">
                {language === "en" ? "العربية" : "English"}
              </span>
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
    </nav>
  );
};

export default Navbar;
