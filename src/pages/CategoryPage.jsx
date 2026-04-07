import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/common/ProductCard";

const CategoryPage = () => {
  const { slug } = useParams();

  // Sample products - would come from API in production
  const products = [
    {
      id: 1,
      name: "Panadol Extra",
      price: 45.0,
      originalPrice: 55.0,
      discount: 18,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Premium Product",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Healthcare Essential",
      price: 28.0,
      originalPrice: 35.0,
      discount: 20,
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Wellness Product",
      price: 32.0,
      image:
        "https://images.unsplash.com/photo-1550572017-4814c5c3a5e4?w=400&h=400&fit=crop",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Health Care Item",
      price: 24.0,
      originalPrice: 30.0,
      discount: 20,
      image:
        "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Medical Supply",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
      rating: 4.8,
    },
    {
      id: 7,
      name: "Care Solution",
      price: 85.0,
      originalPrice: 95.0,
      discount: 11,
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
      rating: 4.7,
    },
    {
      id: 8,
      name: "Treatment Option",
      price: 42.0,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
      rating: 4.6,
    },
  ];

  const categoryInfo = {
    medicine: {
      title: "Medicine & Treatments",
      description:
        "Discover a wide range of authentic medications for various health conditions",
      subcategories: [
        "Pain Relief",
        "Cold & Flu",
        "Digestive Health",
        "Antibiotics",
        "All Medicine",
      ],
    },
    "skin-care": {
      title: "Skin Care Products",
      description: "Premium skincare solutions for healthy, radiant skin",
      subcategories: [
        "Moisturizers",
        "Cleansers",
        "Sunscreen",
        "Anti-Aging",
        "All Skincare",
      ],
    },
    vitamins: {
      title: "Vitamins & Supplements",
      description:
        "Essential vitamins and dietary supplements for optimal health",
      subcategories: [
        "Multivitamins",
        "Vitamin D",
        "Omega-3",
        "Immunity Support",
        "All Vitamins",
      ],
    },
    "mom-baby": {
      title: "Mom & Baby Care",
      description: "Premium care products for mothers and babies",
      subcategories: [
        "Baby Food",
        "Diapers",
        "Baby Care",
        "Maternity",
        "All Products",
      ],
    },
  };

  const info = categoryInfo[slug] || categoryInfo.medicine;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {info.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            {info.description}
          </p>
        </div>
      </section>

      {/* Subcategories & Filters */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Subcategories */}
          <div className="flex flex-wrap gap-3 mb-6">
            {info.subcategories.map((subcat, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  index === info.subcategories.length - 1
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filters:</span>
            </div>

            {/* Price Range */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
                <span className="text-gray-700">Price Range</span>
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Brand */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
                <span className="text-gray-700">Brand</span>
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative ml-auto">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
                <span className="text-gray-700">Sort by: Popular</span>
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {products.length}
              </span>{" "}
              products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-4 bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-900 rounded-full font-semibold transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Category Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                100% Authentic
              </h3>
              <p className="text-gray-600">
                All products sourced from licensed pharmacies
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Licensed pharmacists available for consultation
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Same-day delivery in Port Said and major cities
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
