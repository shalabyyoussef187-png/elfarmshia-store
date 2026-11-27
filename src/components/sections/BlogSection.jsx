import BlogCard from "../common/BlogCard";
import { blogPosts as posts } from "../../data/blogPosts";
import SectionHeader from "../common/SectionHeader";

const BlogSection = ({ language = "en" }) => {
  const blogPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            language === "ar"
              ? "نصائح صحية من صيادلتنا"
              : "Health Tips from Our Pharmacy Team"
          }
          subtitle={
            language === "ar"
              ? "مقالات عملية ومبسطة تساعدك تاخد بالك من صحتك وصحة أسرتك"
              : "Practical, easy-to-read guides to look after your health and your family"
          }
          language={language}
          viewAllLink="/blog"
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
