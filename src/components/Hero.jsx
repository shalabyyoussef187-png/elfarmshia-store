import "./Hero.css";
import { useState } from "react";
import { IoArrowForward, IoArrowDown } from "react-icons/io5";
import vitaminsImg from "../assets/vitamins.png";

const Hero = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const categories = [
    "Vitamins",
    "Supplements",
    "Medicines",
    "Wellness",
    "Beauty",
  ];

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentCategory(
      (prev) => (prev - 1 + categories.length) % categories.length,
    );
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Realistic Pharmacy Interior */}
        <div className="pharmacy-scene">
          {/* Category Carousel - Top */}
          <div className="category-carousel">
            <button className="carousel-btn prev" onClick={prevCategory}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="category-display">
              <h2>{categories[currentCategory]}</h2>
              <div className="category-dots">
                {categories.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === currentCategory ? "active" : ""}`}
                  ></span>
                ))}
              </div>
            </div>
            <button className="carousel-btn next" onClick={nextCategory}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Product Indicator */}
          <div className="product-indicator">
            <div className="product-glow"></div>
            <a href="#products" className="product-link">
              <img
                src={vitaminsImg}
                alt={categories[currentCategory]}
                className="product-image"
                key={currentCategory}
              />
            </a>
          </div>

          {/* Buy Now CTA */}
          <div className="hero-cta">
            <div className="cta-arrow">
              <IoArrowDown className="arrow-icon" />
            </div>
            <button className="buy-now-btn">
              <span>Buy Now</span>
              <IoArrowForward className="btn-arrow" />
            </button>
          </div>

          {/* Background: 3D Pharmacy Aisle Image */}
          <div className="pharmacy-background"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
