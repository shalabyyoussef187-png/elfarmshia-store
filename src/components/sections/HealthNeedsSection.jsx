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

// Every card opens a real department that has products (no keyword searches).
const cat = (...parts) => "/products?category=" + encodeURIComponent(parts.join(" - "));

const HEALTH_NEEDS = [
  { id: 1, name: "Immunity & Vitamins", nameAr: "المناعة والفيتامينات", description: "Vitamins to support your immunity", descriptionAr: "فيتامينات تقوّي مناعتك", icon: Shield, link: cat("الفيتامينات والمكملات", "فيتامينات") },
  { id: 2, name: "Fever & Temperature", nameAr: "الحرارة والبرد", description: "Thermometers to check fever at home", descriptionAr: "موازين حرارة لمتابعة السخونية في البيت", icon: Thermometer, link: cat("المستلزمات الطبية", "موازين الحرارة") },
  { id: 3, name: "Skin Care", nameAr: "العناية بالبشرة", description: "Solutions for healthy, glowing skin", descriptionAr: "حلول للبشرة الصحية المتألقة", icon: Droplets, link: cat("العناية بالبشرة") },
  { id: 4, name: "Respiratory", nameAr: "صحة الجهاز التنفسي", description: "Inhalers and nebulizers", descriptionAr: "أجهزة الاستنشاق والنيبولايزر", icon: Wind, link: cat("المستلزمات الطبية", "أجهزة الاستنشاق") },
  { id: 5, name: "Baby Care", nameAr: "رعاية الطفل", description: "Gentle care for your little ones", descriptionAr: "رعاية لطيفة لأطفالك", icon: Baby, link: cat("الأم والطفل") },
  { id: 6, name: "Joints & Support", nameAr: "العظام والمفاصل", description: "Supports, braces and joint supplements", descriptionAr: "دعامات وأربطة ومكملات للمفاصل", icon: Activity, link: cat("المستلزمات الطبية", "الدعامات والأربطة") },
  { id: 7, name: "Blood Pressure", nameAr: "ضغط الدم والقلب", description: "Blood pressure monitors", descriptionAr: "أجهزة قياس ضغط الدم", icon: Heart, link: cat("المستلزمات الطبية", "أجهزة قياس ضغط الدم") },
  { id: 8, name: "Medicines & Treatments", nameAr: "الأدوية والعلاجات", description: "Treatments and medicines", descriptionAr: "علاجات وأدوية", icon: Pill, link: cat("الأدوية والعلاجات") },
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
