import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "How to Boost Your Immune System Naturally",
      excerpt:
        "Discover effective natural ways to strengthen your immune system and stay healthy all year round.",
      author: "Dr. Ahmed Hassan",
      category: "Wellness",
      date: "March 15, 2024",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Understanding Vitamin D Deficiency",
      excerpt:
        "Learn about the importance of vitamin D, signs of deficiency, and how to maintain optimal levels.",
      author: "Dr. Sarah Ahmed",
      category: "Vitamins",
      date: "March 12, 2024",
      image:
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Winter Skincare Routine Essentials",
      excerpt:
        "Protect your skin during the cold months with these dermatologist-recommended tips and products.",
      author: "Dr. Mona Ibrahim",
      category: "Skincare",
      date: "March 10, 2024",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Managing Seasonal Allergies",
      excerpt:
        "Expert advice on preventing and treating seasonal allergies for better quality of life.",
      author: "Dr. Ahmed Hassan",
      category: "Health",
      date: "March 8, 2024",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Baby's First Year: Health Milestones",
      excerpt:
        "A comprehensive guide to your baby's health milestones and what to expect in the first year.",
      author: "Dr. Sarah Ahmed",
      category: "Baby Care",
      date: "March 5, 2024",
      image:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "The Truth About Dietary Supplements",
      excerpt:
        "What you need to know about supplements, when to take them, and how to choose quality products.",
      author: "Dr. Mona Ibrahim",
      category: "Nutrition",
      date: "March 1, 2024",
      image:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=600&fit=crop",
    },
  ];

  const categories = [
    "All",
    "Wellness",
    "Vitamins",
    "Skincare",
    "Health",
    "Baby Care",
    "Nutrition",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Health & Wellness Blog
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Expert advice from our team of licensed pharmacists and healthcare
            professionals
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  index === 0
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="overflow-hidden aspect-4/3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-teal-50 text-teal-600 text-sm font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {article.author}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                    <Calendar size={14} />
                    {article.date}
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 hover:bg-teal-600 hover:text-white text-gray-900 rounded-full font-semibold transition-all duration-300 group-hover:shadow-lg cursor-pointer active:scale-95">
                    Read More
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-linear-to-b from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-teal-50 mb-8">
            Subscribe to our newsletter for health tips and wellness advice
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
