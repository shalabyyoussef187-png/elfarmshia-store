import { Calendar, Clock } from "lucide-react";

const BlogCard = ({ post, language = "en", clickable = false }) => {
  const CardWrapper = clickable ? "a" : "div";

  return (
    <CardWrapper
      {...(clickable ? { href: `/blog/${post.slug}` } : {})}
      className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/50 transition-all duration-500 flex flex-col h-full ${
        clickable
          ? "hover:shadow-xl hover:border-teal-200/50 cursor-pointer group"
          : "opacity-80 cursor-not-allowed relative"
      }`}
    >
      {/* Coming Soon Badge for non-clickable */}
      {!clickable && (
        <div className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full backdrop-blur-md bg-gray-900/80 text-xs font-semibold text-white">
          {language === "ar" ? "قريباً" : "Coming Soon"}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={language === "ar" ? post.titleAr : post.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            clickable ? "group-hover:scale-110" : ""
          }`}
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/90 text-xs font-medium text-gray-700">
          {language === "ar" ? post.categoryAr : post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>
              {post.readTime} {language === "ar" ? "دقيقة" : "min"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight transition-colors ${
            clickable ? "group-hover:text-teal-600" : ""
          }`}
        >
          {language === "ar" ? post.titleAr : post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
          {language === "ar" ? post.excerptAr : post.excerpt}
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={language === "ar" ? post.author.nameAr : post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {language === "ar" ? post.author.nameAr : post.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {language === "ar" ? post.author.titleAr : post.author.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default BlogCard;
