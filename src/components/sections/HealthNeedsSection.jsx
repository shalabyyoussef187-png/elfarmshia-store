import HealthNeedCard from "../common/HealthNeedCard";
import SectionHeader from "../common/SectionHeader";
import {
  Thermometer,
  Shield,
  Droplets,
  Wind,
  Baby,
  Activity,
  Heart,
  Pill,
} from "lucide-react";

const HEALTH_NEEDS = [
  {
    id: 1,
    name: "Cold & Flu",
    nameAr: "نزلات البرد والإنفلونزا",
    description: "Relief for cold symptoms and flu",
    descriptionAr: "علاج أعراض البرد والإنفلونزا",
    icon: Thermometer,
    link: "/products?search=البرد",
  },
  {
    id: 2,
    name: "Immunity Boost",
    nameAr: "تعزيز المناعة",
    description: "Strengthen your immune system",
    descriptionAr: "قوّ جهازك المناعي",
    icon: Shield,
    link: "/products?category=%D8%A7%D9%84%D9%81%D9%8A%D8%AA%D8%A7%D9%85%D9%8A%D9%86%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D9%85%D9%83%D9%85%D9%84%D8%A7%D8%AA&search=%D9%85%D9%86%D8%A7%D8%B9%D8%A9",
  },
  {
    id: 3,
    name: "Skin Care",
    nameAr: "العناية بالبشرة",
    description: "Solutions for healthy, glowing skin",
    descriptionAr: "حلول للبشرة الصحية المتألقة",
    icon: Droplets,
    link: "/products?category=%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9%20%D8%A8%D8%A7%D9%84%D8%A8%D8%B4%D8%B1%D8%A9",
  },
  {
    id: 4,
    name: "Respiratory",
    nameAr: "صحة الجهاز التنفسي",
    description: "Breathe easier and better",
    descriptionAr: "تنفس بشكل أفضل وأسهل",
    icon: Wind,
    link: "/products?search=تنفسي",
  },
  {
    id: 5,
    name: "Baby Care",
    nameAr: "رعاية الطفل",
    description: "Gentle care for your little ones",
    descriptionAr: "رعاية لطيفة لأطفالك",
    icon: Baby,
    link: "/products?category=%D8%A7%D9%84%D8%A3%D9%85%20%D9%88%D8%A7%D9%84%D8%B7%D9%81%D9%84",
  },
  {
    id: 6,
    name: "Pain Relief",
    nameAr: "تخفيف الألم",
    description: "Fast-acting pain management",
    descriptionAr: "إدارة الألم سريعة المفعول",
    icon: Activity,
    link: "/products?search=ألم",
  },
  {
    id: 7,
    name: "Heart Health",
    nameAr: "صحة القلب",
    description: "Support cardiovascular wellness",
    descriptionAr: "دعم صحة القلب والأوعية",
    icon: Heart,
    link: "/products?search=قلب",
  },
  {
    id: 8,
    name: "Digestive Health",
    nameAr: "صحة الجهاز الهضمي",
    description: "Improve digestive comfort",
    descriptionAr: "تحسين راحة الجهاز الهضمي",
    icon: Pill,
    link: "/products?search=هضمي",
  },
];

const HealthNeedsSection = ({ language = "en" }) => {
  const isRtl = language === "ar";

  return (
    <section className="py-20 bg-slate-50/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={isRtl ? "تسوق حسب احتياجاتك الصحية" : "Shop by Health Needs"}
          subtitle={
            isRtl
              ? "ابحث عن المنتجات المناسبة لاحتياجاتك الصحية المحددة"
              : "Find the right products for your specific health concerns"
          }
          language={language}
          showViewAll={false}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HEALTH_NEEDS.map((need) => (
            <HealthNeedCard key={need.id} need={need} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthNeedsSection;
