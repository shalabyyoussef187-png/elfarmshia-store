import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { blogPosts } from "../data/blogPosts";
import BlogCard from "../components/common/BlogCard";

const Blog = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const [active, setActive] = useState("all");
  const cats = [];
  blogPosts.forEach((p) => {
    if (!cats.find((c) => c.key === p.category)) cats.push({ key: p.category, label: isRtl ? p.categoryAr : p.category });
  });
  const shown = active === "all" ? blogPosts : blogPosts.filter((p) => p.category === active);
  return (
    <div className="min-h-screen bg-white" dir={isRtl ? "rtl" : "ltr"}>
      <section className="bg-linear-to-b from-teal-50/50 to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4">
            {isRtl ? "مدونة الفرماشية الصحية" : "Al-Farmashia Health Blog"}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isRtl
              ? "مقالات عملية ومبسطة من فريق الصيدلية، عشان تاخد بالك من صحتك وصحة أسرتك."
              : "Practical, easy-to-read guides from our pharmacy team to help you look after your health and your family."}
          </p>
        </div>
      </section>
      <section className="py-5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex gap-2.5 overflow-x-auto sm:flex-wrap sm:justify-center" style={{ scrollbarWidth: "none" }}>
          {[{ key: "all", label: isRtl ? "الكل" : "All" }, ...cats].map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition cursor-pointer ${
                active === c.key ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((post) => (
            <BlogCard key={post.id} post={post} language={language} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
