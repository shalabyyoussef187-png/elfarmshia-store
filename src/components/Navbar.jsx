import { useState } from "react";
import { IoSearch, IoCart } from "react-icons/io5";
import "./Navbar.css";
import logoImg from "../assets/logo.svg";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Arabic Navigation Links */}
        <div className="nav-links">
          <a href="#categories" className="nav-link">
            الصنيفات
          </a>
          <a href="#offers" className="nav-link">
            العروض
          </a>
          <a href="#pharmacies" className="nav-link">
            الصيدليات
          </a>
        </div>

        {/* Center: Logo */}
        <div className="nav-logo">
          <img src={logoImg} alt="الفرمشيته" className="logo-img" />
        </div>

        {/* Right: Search Bar and Cart */}
        <div className="nav-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="ابحث عن دواء، يعالج، برونش..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              dir="rtl"
            />
            <button className="search-btn">
              <IoSearch className="search-icon" />
            </button>
          </div>
          <button className="cart-btn">
            <IoCart className="cart-icon" />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
