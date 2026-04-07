import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logoImg from "../../assets/logo.svg";

const Footer = ({ language = "en" }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: {
      title: language === "ar" ? "الشركة" : "Company",
      links: [
        { name: language === "ar" ? "من نحن" : "About Us", path: "/about" },
        {
          name: language === "ar" ? "اتصل بنا" : "Contact Us",
          path: "/contact",
        },
        { name: language === "ar" ? "الوظائف" : "Careers", path: "/careers" },
        { name: language === "ar" ? "المدونة" : "Blog", path: "/blog" },
        {
          name: language === "ar" ? "الصيدليات" : "Pharmacies",
          path: "/pharmacies",
        },
      ],
    },
    help: {
      title: language === "ar" ? "المساعدة" : "Help",
      links: [
        { name: language === "ar" ? "الأسئلة الشائعة" : "FAQ", path: "/faq" },
        {
          name: language === "ar" ? "الشحن والتوصيل" : "Shipping",
          path: "/shipping",
        },
        {
          name: language === "ar" ? "الإرجاع والاستبدال" : "Returns",
          path: "/returns",
        },
        {
          name: language === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
          path: "/privacy",
        },
      ],
    },
    categories: {
      title: language === "ar" ? "التصنيفات" : "Shop",
      links: [
        {
          name: language === "ar" ? "الأدوية" : "Medicine",
          path: "/category/medicine",
        },
        {
          name: language === "ar" ? "العناية بالبشرة" : "Skin Care",
          path: "/category/skin-care",
        },
        {
          name: language === "ar" ? "الفيتامينات" : "Vitamins",
          path: "/category/vitamins",
        },
        {
          name: language === "ar" ? "الأم والطفل" : "Mom & Baby",
          path: "/category/mom-baby",
        },
      ],
    },
  };

  return (
    <footer className="bg-linear-to-b from-gray-50 to-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={logoImg} alt="Al-Farmashiia" className="h-16 w-auto" />
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm leading-relaxed text-sm">
              {language === "ar"
                ? "صحتك هي هدفنا. نقدم لك منتجات صحية أصلية وعالية الجودة من صيدليات معتمدة."
                : "Your trusted online pharmacy for authentic, quality healthcare products. Committed to your wellness."}
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 group"
              >
                <FaFacebook
                  size={18}
                  className="text-gray-600 group-hover:text-teal-600"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 group"
              >
                <FaInstagram
                  size={18}
                  className="text-gray-600 group-hover:text-teal-600"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 group"
              >
                <FaTwitter
                  size={18}
                  className="text-gray-600 group-hover:text-teal-600"
                />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((column, index) => (
            <div key={index}>
              <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-teal-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50">
                <Phone size={18} className="text-teal-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">
                  {language === "ar" ? "الهاتف" : "Phone"}
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  +20 123 456 7890
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50">
                <Mail size={18} className="text-teal-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  support@pharmacy.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50">
                <MapPin size={18} className="text-teal-600" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">
                  {language === "ar" ? "الموقع" : "Location"}
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  {language === "ar" ? "بورسعيد، مصر" : "Port Said, Egypt"}
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © {currentYear}{" "}
              {language === "ar"
                ? "الصيدلية. جميع الحقوق محفوظة."
                : "Pharmacy. All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
