import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { blogPosts, getPost } from "../data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const post = getPost(slug);
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center" dir={isRtl ? "rtl" : "ltr"}>
        <p className="mb-4 font-bold text-gray-700">{isRtl ? "المقال مش موجود" : "Article not found"}</p>
        <Link to="/blog" className="font-bold text-emerald-700">{isRtl ? "كل المقالات" : "All articles"}</Link>
      </div>
    );
  }
  const body = isRtl ? post.bodyAr : post.bodyEn;
  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const Back = isRtl ? ArrowRight : ArrowLeft;
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10" dir={isRtl ? "rtl" : "ltr"}>
      <Link to="/blog" className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
        <Back size={16} /> {isRtl ? "كل المقالات" : "All articles"}
      </Link>
      <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
        {isRtl ? post.categoryAr : post.category}
      </span>
      <h1 className="mb-4 text-2xl sm:text-4xl font-black leading-snug text-gray-900">
        {isRtl ? post.titleAr : post.title}
      </h1>
      <div className="mb-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="font-bold text-gray-700">{isRtl ? post.author.nameAr : post.author.name}</span>
        <span className="flex items-center gap-1"><Calendar size={13} />{post.date}</span>
        <span className="flex items-center gap-1"><Clock size={13} />{post.readTime} {isRtl ? "دقيقة" : "min"}</span>
      </div>
      <img src={post.image} alt="" className="mb-6 aspect-video w-full rounded-3xl object-cover" />
      <div className="space-y-4 text-base leading-8 text-gray-700">
        {body.map((b, i) =>
          b.h ? (
            <h2 key={i} className="pt-3 text-xl font-black text-gray-900">{b.h}</h2>
          ) : b.ul ? (
            <ul key={i} className="list-disc space-y-2 ps-6">
              {b.ul.map((li, k) => <li key={k}>{li}</li>)}
            </ul>
          ) : (
            <p key={i}>{b.p}</p>
          ),
        )}
      </div>
      <p className="mt-8 rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-relaxed text-amber-900">
        {isRtl ? post.noteAr : post.noteEn}
      </p>
      <div className="mt-10">
        <h3 className="mb-4 text-lg font-black text-gray-900">{isRtl ? "اقرأ كمان" : "Keep reading"}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} to={`/blog/${o.slug}`} className="rounded-2xl border border-gray-100 p-4 font-bold text-gray-900 hover:border-emerald-300">
              {isRtl ? o.titleAr : o.title}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
