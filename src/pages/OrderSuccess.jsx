import {useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import {
  CheckCircle2,
  Package,
  MapPin,
  Phone,
  User,
  ArrowRight,
  Home,
  Sparkles,
} from "lucide-react";

const OrderSuccess = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // If no order data, redirect to home
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orders, customerInfo, totalAmount } = orderData;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-emerald-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-br from-green-400 to-emerald-500 mb-6 shadow-2xl animate-in zoom-in duration-500">
              <CheckCircle2
                className="text-white animate-in zoom-in duration-700 delay-200"
                size={48}
                strokeWidth={2.5}
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {t("orderSuccess.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              {t("orderSuccess.subtitle")}
            </p>
          </div>

          {/* Premium Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            {/* Card Header */}
            <div className="bg-linear-to-r from-teal-600 to-emerald-600 px-6 md:px-8 py-6 md:py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      {t("orderSuccess.orderDetails")}
                    </h2>
                    <p className="text-sm text-white/80">
                      {new Date().toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <p className="text-xs font-semibold text-white/90">
                    {t("orderSuccess.pending")}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="px-6 md:px-8 py-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-teal-600" />
                {t("orderSuccess.customerInfo")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <User size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">
                      {t("orderSuccess.name")}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {customerInfo.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">
                      {t("orderSuccess.phone")}
                    </p>
                    <p className="text-sm font-bold text-gray-900 ltr">
                      {customerInfo.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 mt-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold">
                    {t("orderSuccess.address")}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {customerInfo.address}
                  </p>
                  {customerInfo.city && (
                    <p className="text-xs text-gray-600 mt-1">
                      {customerInfo.city}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-6 md:px-8 py-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} className="text-teal-600" />
                {t("orderSuccess.orderedItems")}
              </h3>
              <div className="space-y-3">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                        <Package size={20} className="text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm md:text-base truncate">
                          {order.productName || "Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t("orderSuccess.quantity")}: {order.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 bg-teal-50 rounded-lg">
                      <p className="text-xs font-semibold text-teal-700">
                        {t("orderSuccess.pending")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="px-6 md:px-8 py-6 bg-linear-to-br from-gray-900 to-gray-800 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg md:text-xl font-bold text-white">
                  {t("orderSuccess.total")}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-teal-400">
                  EGP {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              {t("orderSuccess.whatNext")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-teal-600">1</span>
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {t("orderSuccess.step1")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-emerald-600">2</span>
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {t("orderSuccess.step2")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold text-gray-900">
                    {t("orderSuccess.step3")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer active:scale-95"
            >
              <Home size={20} />
              <span>{t("orderSuccess.backHome")}</span>
            </Link>
            <Link
              to="/products"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-xl font-bold text-base shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>{t("orderSuccess.continueShopping")}</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
