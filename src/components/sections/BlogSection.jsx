import BlogCard from "../common/BlogCard";
import SectionHeader from "../common/SectionHeader";

const BlogSection = ({ language = "en" }) => {
  // Sample blog posts - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      slug: "winter-immunity-tips",
      title: "5 Essential Tips to Boost Your Immunity This Winter",
      titleAr: "5 نصائح أساسية لتعزيز مناعتك هذا الشتاء",
      excerpt:
        "Learn how to strengthen your immune system naturally with these expert-recommended strategies from our medical team.",
      excerptAr:
        "تعلم كيفية تقوية جهازك المناعي بشكل طبيعي مع هذه الاستراتيجيات الموصى بها من فريقنا الطبي.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      category: "Immunity",
      categoryAr: "المناعة",
      date: "Mar 28, 2026",
      readTime: "5",
      author: {
        name: "Dr. Sarah Ahmed",
        nameAr: "د. سارة أحمد",
        title: "General Practitioner",
        titleAr: "طبيبة عامة",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
      },
    },
    {
      id: 2,
      slug: "skincare-routine-guide",
      title: "The Ultimate Guide to a Healthy Skincare Routine",
      titleAr: "الدليل الشامل لروتين صحي للعناية بالبشرة",
      excerpt:
        "Discover the essential steps for maintaining radiant, healthy skin at any age with dermatologist-approved advice.",
      excerptAr:
        "اكتشف الخطوات الأساسية للحفاظ على بشرة مشرقة وصحية في أي عمر مع نصائح معتمدة من أطباء الجلدية.",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
      category: "Skincare",
      categoryAr: "العناية بالبشرة",
      date: "Mar 25, 2026",
      readTime: "7",
      author: {
        name: "Dr. Mona Hassan",
        nameAr: "د. منى حسن",
        title: "Dermatologist",
        titleAr: "طبيبة جلدية",
        avatar:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80",
      },
    },
    {
      id: 3,
      slug: "vitamins-supplements-guide",
      title: "Understanding Vitamins: What You Really Need",
      titleAr: "فهم الفيتامينات: ما تحتاجه حقاً",
      excerpt:
        "Not all supplements are necessary. Learn which vitamins your body actually needs and when to take them.",
      excerptAr:
        "ليست كل المكملات ضرورية. تعرف على الفيتامينات التي يحتاجها جسمك فعلياً ومتى تتناولها.",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
      category: "Nutrition",
      categoryAr: "التغذية",
      date: "Mar 22, 2026",
      readTime: "6",
      author: {
        name: "Dr. Ahmed Khalil",
        nameAr: "د. أحمد خليل",
        title: "Nutritionist",
        titleAr: "أخصائي تغذية",
        avatar:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80",
      },
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            language === "ar"
              ? "نصائح من أطبائنا"
              : "Health Tips from Our Doctors"
          }
          subtitle={
            language === "ar"
              ? "مقالات أسبوعية من متخصصين صحيين لمساعدتك على العيش بشكل أفضل"
              : "Weekly articles from healthcare professionals to help you live better"
          }
          language={language}
          viewAllLink="/blog"
        />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              language={language}
              clickable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
