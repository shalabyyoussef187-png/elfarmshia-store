import axios from "axios";

const API_BASE_URL = "https://pharma-api-flame.vercel.app/api";

/**
 * Fetch categories from the API
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 20)
 * @returns {Promise<{data: Array, pagination: Object}>}
 */
export const fetchCategories = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
      params: { page, limit },
    });

    // Validate response structure
    if (response.data?.success && Array.isArray(response.data.data)) {
      return {
        data: response.data.data,
        pagination: response.data.pagination || null,
      };
    }

    throw new Error("Invalid response structure");
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Category name translation map (Arabic to English)
 * API returns Arabic names, we map them to English equivalents
 */
export const categoryTranslations = {
  الأدوية: "Medicine",
  "العناية بالبشرة": "Skin Care",
  "العناية بالشعر": "Hair Care",
  "الأم والطفل": "Mom & Baby",
  "الفيتامينات والمكملات": "Vitamins & Supplements",
  "العناية الشخصية": "Personal Care",
  "المكملات الغذائية": "Dietary Supplements",
  "الرعاية الصحية": "Healthcare",
  "مستحضرات التجميل": "Cosmetics",
  "العناية بالأسنان": "Dental Care",
  "الأجهزة الطبية": "Medical Devices",
  "التغذية الرياضية": "Sports Nutrition",
};

/**
 * Generate a URL-friendly slug from Arabic or English text
 * @param {string} text - Category name
 * @returns {string} - URL slug
 */
export const generateSlug = (text) => {
  // Try to get English translation first
  const englishName = categoryTranslations[text] || text;

  return englishName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Get translated category name
 * @param {string} arabicName - Arabic category name from API
 * @param {string} language - Current language ('en' or 'ar')
 * @returns {string} - Translated name
 */
export const getCategoryName = (arabicName, language = "en") => {
  if (language === "ar") {
    return arabicName;
  }
  return categoryTranslations[arabicName] || arabicName;
};

/**
 * Get category description based on name
 * @param {string} arabicName - Arabic category name
 * @param {string} language - Current language
 * @returns {string} - Category description
 */
export const getCategoryDescription = (arabicName, language = "en") => {
  const descriptions = {
    الأدوية: {
      en: "Quality medications you can trust",
      ar: "أدوية عالية الجودة يمكنك الوثوق بها",
    },
    "العناية بالبشرة": {
      en: "Premium skin care products",
      ar: "منتجات العناية بالبشرة الفاخرة",
    },
    "العناية بالشعر": {
      en: "Professional hair care solutions",
      ar: "حلول احترافية للعناية بالشعر",
    },
    "الأم والطفل": {
      en: "Gentle care for your loved ones",
      ar: "عناية لطيفة لأحبائك",
    },
    "الفيتامينات والمكملات": {
      en: "Essential vitamins and supplements",
      ar: "فيتامينات ومكملات أساسية",
    },
    "العناية الشخصية": {
      en: "Complete personal care solutions",
      ar: "حلول العناية الشخصية الكاملة",
    },
    "المكملات الغذائية": {
      en: "Nutritional supplements for wellness",
      ar: "مكملات غذائية للصحة والعافية",
    },
    "الرعاية الصحية": {
      en: "Comprehensive healthcare products",
      ar: "منتجات الرعاية الصحية الشاملة",
    },
    "مستحضرات التجميل": {
      en: "Premium beauty cosmetics",
      ar: "مستحضرات تجميل فاخرة",
    },
    "العناية بالأسنان": {
      en: "Professional dental care",
      ar: "العناية المهنية بالأسنان",
    },
    "الأجهزة الطبية": {
      en: "Medical devices and equipment",
      ar: "الأجهزة والمعدات الطبية",
    },
    "التغذية الرياضية": {
      en: "Sports nutrition and supplements",
      ar: "التغذية الرياضية والمكملات",
    },
  };

  const desc = descriptions[arabicName];
  if (desc) {
    return desc[language];
  }

  // Fallback description
  return language === "ar"
    ? "منتجات عالية الجودة"
    : "Quality healthcare products";
};

/**
 * Get category image placeholder
 * Images are placeholders since API doesn't provide images
 * @param {string} arabicName - Arabic category name
 * @returns {string} - Image URL
 */
export const getCategoryImage = (arabicName) => {
  const images = {
    الأدوية:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    "العناية بالبشرة":
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    "العناية بالشعر":
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=300&fit=crop",
    "الأم والطفل":
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
    "الفيتامينات والمكملات":
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop",
    "العناية الشخصية":
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=300&fit=crop",
    "المكملات الغذائية":
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    "الرعاية الصحية":
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    "مستحضرات التجميل":
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    "العناية بالأسنان":
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop",
    "الأجهزة الطبية":
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop",
    "التغذية الرياضية":
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop",
  };

  return (
    images[arabicName] ||
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
  );
};
