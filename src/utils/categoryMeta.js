import {
  Pill,
  Droplets,
  Sparkles,
  Baby,
  Heart,
  Shield,
  Activity,
  Dumbbell,
  Smile,
  FlaskConical,
  Stethoscope,
  Cpu,
} from "lucide-react";

/**
 * Static category metadata — maps category name strings (Arabic or English)
 * to icon, colors, translations, and descriptions.
 *
 * Since the API returns raw category strings, this is the source of truth for
 * display metadata.
 */
export const CATEGORY_META = {
  // ── API real categories ─────────────────────────────────────────
  "Gh": {
    slug: "gh",
    name: "General Health",
    nameAr: "الصحة العامة",
    description: "General health & wellness products",
    descriptionAr: "منتجات الصحة والعافية العامة",
    icon: Stethoscope,
    iconColor: "#2dd4bf",
    gradientFrom: "rgba(20,184,166,0.25)",
    gradientTo: "rgba(20,184,166,0.05)",
  },
  "طيبات": {
    slug: "taybat",
    name: "Taybat",
    nameAr: "طيبات",
    description: "Natural & herbal products",
    descriptionAr: "المنتجات الطبيعية والعشبية",
    icon: Sparkles,
    iconColor: "#a78bfa",
    gradientFrom: "rgba(167,139,250,0.25)",
    gradientTo: "rgba(167,139,250,0.05)",
  },

  // ── Static health-need categories (for HealthNeedsSection) ──────
  "الأدوية": {
    slug: "medicine",
    name: "Medicine",
    nameAr: "الأدوية",
    description: "Quality medications you can trust",
    descriptionAr: "أدوية عالية الجودة يمكنك الوثوق بها",
    icon: Pill,
    iconColor: "#f87171",
    gradientFrom: "rgba(248,113,113,0.2)",
    gradientTo: "rgba(248,113,113,0.04)",
  },
  "العناية بالبشرة": {
    slug: "skin-care",
    name: "Skin Care",
    nameAr: "العناية بالبشرة",
    description: "Premium skin care products",
    descriptionAr: "منتجات العناية بالبشرة الفاخرة",
    icon: Droplets,
    iconColor: "#f472b6",
    gradientFrom: "rgba(244,114,182,0.2)",
    gradientTo: "rgba(244,114,182,0.04)",
  },
  "الفيتامينات والمكملات": {
    slug: "vitamins-supplements",
    name: "Vitamins",
    nameAr: "الفيتامينات والمكملات",
    description: "Essential vitamins & supplements",
    descriptionAr: "فيتامينات ومكملات أساسية",
    icon: Sparkles,
    iconColor: "#fbbf24",
    gradientFrom: "rgba(251,191,36,0.2)",
    gradientTo: "rgba(251,191,36,0.04)",
  },
  "الأم والطفل": {
    slug: "mom-baby",
    name: "Mom & Baby",
    nameAr: "الأم والطفل",
    description: "Gentle care for your loved ones",
    descriptionAr: "عناية لطيفة لأحبائك",
    icon: Baby,
    iconColor: "#60a5fa",
    gradientFrom: "rgba(96,165,250,0.2)",
    gradientTo: "rgba(96,165,250,0.04)",
  },
  "العناية الشخصية": {
    slug: "personal-care",
    name: "Personal Care",
    nameAr: "العناية الشخصية",
    description: "Complete personal care solutions",
    descriptionAr: "حلول العناية الشخصية الكاملة",
    icon: Heart,
    iconColor: "#f472b6",
    gradientFrom: "rgba(244,114,182,0.2)",
    gradientTo: "rgba(244,114,182,0.04)",
  },
  "المكملات الغذائية": {
    slug: "dietary-supplements",
    name: "Dietary Supplements",
    nameAr: "المكملات الغذائية",
    description: "Nutritional supplements for wellness",
    descriptionAr: "مكملات غذائية للصحة والعافية",
    icon: FlaskConical,
    iconColor: "#34d399",
    gradientFrom: "rgba(52,211,153,0.2)",
    gradientTo: "rgba(52,211,153,0.04)",
  },
  "الرعاية الصحية": {
    slug: "healthcare",
    name: "Healthcare",
    nameAr: "الرعاية الصحية",
    description: "Comprehensive healthcare products",
    descriptionAr: "منتجات الرعاية الصحية الشاملة",
    icon: Shield,
    iconColor: "#2dd4bf",
    gradientFrom: "rgba(45,212,191,0.2)",
    gradientTo: "rgba(45,212,191,0.04)",
  },
  "مستحضرات التجميل": {
    slug: "cosmetics",
    name: "Cosmetics",
    nameAr: "مستحضرات التجميل",
    description: "Premium beauty cosmetics",
    descriptionAr: "مستحضرات تجميل فاخرة",
    icon: Smile,
    iconColor: "#c084fc",
    gradientFrom: "rgba(192,132,252,0.2)",
    gradientTo: "rgba(192,132,252,0.04)",
  },
  "العناية بالأسنان": {
    slug: "dental-care",
    name: "Dental Care",
    nameAr: "العناية بالأسنان",
    description: "Professional dental care",
    descriptionAr: "العناية المهنية بالأسنان",
    icon: Activity,
    iconColor: "#38bdf8",
    gradientFrom: "rgba(56,189,248,0.2)",
    gradientTo: "rgba(56,189,248,0.04)",
  },
  "الأجهزة الطبية": {
    slug: "medical-devices",
    name: "Medical Devices",
    nameAr: "الأجهزة الطبية",
    description: "Medical devices and equipment",
    descriptionAr: "الأجهزة والمعدات الطبية",
    icon: Cpu,
    iconColor: "#a3e635",
    gradientFrom: "rgba(163,230,53,0.2)",
    gradientTo: "rgba(163,230,53,0.04)",
  },
  "التغذية الرياضية": {
    slug: "sports-nutrition",
    name: "Sports Nutrition",
    nameAr: "التغذية الرياضية",
    description: "Sports nutrition and supplements",
    descriptionAr: "التغذية الرياضية والمكملات",
    icon: Dumbbell,
    iconColor: "#fb923c",
    gradientFrom: "rgba(251,146,60,0.2)",
    gradientTo: "rgba(251,146,60,0.04)",
  },
};

/**
 * Get category metadata by name (Arabic or English).
 * Falls back to a default icon when name is unknown.
 */
export const getCategoryMeta = (name) => {
  if (!name) return null;
  return (
    CATEGORY_META[name] || {
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      nameAr: name,
      description: "Healthcare products",
      descriptionAr: "منتجات صحية",
      icon: Pill,
      iconColor: "#2dd4bf",
      gradientFrom: "rgba(20,184,166,0.2)",
      gradientTo: "rgba(20,184,166,0.04)",
    }
  );
};
