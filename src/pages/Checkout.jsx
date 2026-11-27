import { PLACEHOLDER_IMAGE } from "../utils/placeholder";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isFreeShipping, FREE_SHIPPING_MIN } from "../utils/shipping";
import { useLanguage } from "../context/LanguageContext";
import {
  CreditCard,
  Wallet,
  ShoppingBag,
  Check,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Navigation,
  X,
  User,
  Phone,
  Building2,
  Home,
  FileText,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { ordersAPI } from "../services/api/orders";
import { getStoredUser } from "../services/api/auth";

const Checkout = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { success, error: showError, warning } = useToast();

  // Get user from localStorage
  const storedUser = getStoredUser();

  const [formData, setFormData] = useState({
    fullName: storedUser?.name || "",
    phone: storedUser?.phone || "",
    address: "",
    city: "",
    location: { lat: null, lng: null, address: "" },
    notes: "",
    paymentMethod: "cod", // cod or card
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [tempLocation, setTempLocation] = useState({
    lat: 30.0444,
    lng: 31.2357,
  }); // Default: Cairo

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLocationSelect = () => {
    const locationAddress = `Location: ${tempLocation.lat.toFixed(4)}, ${tempLocation.lng.toFixed(4)}`;
    setFormData((prev) => ({
      ...prev,
      location: {
        lat: tempLocation.lat,
        lng: tempLocation.lng,
        address: locationAddress,
      },
    }));
    setShowLocationPicker(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTempLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          success(t("checkout.locationDetected"));
        },
        () => {
          showError(t("checkout.locationFailed"));
        },
      );
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("checkout.nameRequired");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("checkout.phoneRequired");
    } else if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = t("checkout.invalidPhone");
    }

    if (!formData.address.trim()) {
      newErrors.address = t("checkout.addressRequired");
    }

    if (!formData.city.trim()) {
      newErrors.city = t("checkout.cityRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      warning(t("checkout.cartEmpty"));
      return;
    }

    if (!validateForm()) {
      showError(t("checkout.fixErrors"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare address text
      const fullAddress = `${formData.address}, ${formData.city}`;

      // Create orders for all cart items
      const orderPromises = cartItems.map((item) => {
        const orderData = {
          customerName: formData.fullName,
          phone: formData.phone,
          addressText: fullAddress,
          // Include location if available
          ...(formData.location.lat && {
            lat: formData.location.lat,
            lng: formData.location.lng,
          }),
          productId: item.id || item._id,
          quantity: item.quantity,
        };
        return ordersAPI.createOrder(orderData);
      });

      // Submit all orders
      const orderResponses = await Promise.all(orderPromises);

      // Extract order data from responses
      const orders = orderResponses
        .map((response) => {
          if (response.success && response.data) {
            return {
              id: response.data.id,
              productName: response.data.productName,
              quantity: response.data.quantity,
              status: response.data.status,
            };
          }
          return null;
        })
        .filter(Boolean);

      if (orders.length > 0) {
        // Clear cart after successful order
        clearCart();

        // Navigate to success page with order data
        navigate("/order-success", {
          state: {
            orderData: {
              orders,
              customerInfo: {
                name: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
              },
              totalAmount: totalPrice,
            },
          },
        });

        success(t("checkout.orderSuccess"));
      } else {
        throw new Error("No orders were created");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      showError(t("checkout.orderFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 text-center shadow-sm">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag
                className="text-gray-400"
                size={32}
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t("cart.empty")}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-8">
              {t("checkout.addProducts")}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={20} />
              <span>{t("cart.startShopping")}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-12 md:py-16 lg:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4 md:mb-6 transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            <span className="font-medium">{t("checkout.backToCart")}</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4">
            {t("checkout.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            {t("checkout.subtitle")}
          </p>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Customer Information */}
              <div className="bg-linear-to-br from-white to-teal-50/30 rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg border border-teal-100/50">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <User size={18} className="text-teal-600" />
                  </div>
                  {t("checkout.customerInfo")}
                </h2>

                <div className="space-y-4 md:space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      <User size={16} className="text-teal-600" />
                      {t("checkout.fullName")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border-2 text-sm sm:text-base ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      } focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all`}
                      placeholder={t("checkout.fullNamePlaceholder")}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      <Phone size={16} className="text-teal-600" />
                      {t("checkout.phoneNumber")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border-2 text-sm sm:text-base ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      } focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all`}
                      placeholder={t("checkout.phonePlaceholder")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      <Building2 size={16} className="text-teal-600" />
                      {t("checkout.city")} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border-2 text-sm sm:text-base ${
                        errors.city
                          ? "border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      } focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all`}
                    >
                      <option value="">{t("checkout.selectCity")}</option>
                      <option value="Cairo">Cairo - القاهرة</option>
                      <option value="Alexandria">Alexandria - الإسكندرية</option>
                      <option value="Giza">Giza - الجيزة</option>
                      <option value="Shubra El Kheima">Shubra El Kheima - شبرا الخيمة</option>
                      <option value="Port Said">Port Said - بورسعيد</option>
                      <option value="Suez">Suez - السويس</option>
                      <option value="Luxor">Luxor - الأقصر</option>
                      <option value="Aswan">Aswan - أسوان</option>
                      <option value="Mansoura">Mansoura - المنصورة</option>
                      <option value="Tanta">Tanta - طنطا</option>
                    </select>
                    {errors.city && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      <Home size={16} className="text-teal-600" />
                      {t("checkout.address")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border-2 text-sm sm:text-base ${
                        errors.address
                          ? "border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      } focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all resize-none`}
                      placeholder={t("checkout.addressPlaceholder")}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                    >
                      <FileText size={16} className="text-teal-600" />
                      {t("checkout.notes")}
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all resize-none text-sm sm:text-base"
                      placeholder={t("checkout.notesPlaceholder")}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-gray-200">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                    <Wallet size={18} className="text-teal-600" />
                  </div>
                  {t("checkout.paymentMethod")}
                </h2>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Wallet size={20} className="text-teal-600" />
                        <span className="font-bold text-gray-900 text-sm sm:text-base">
                          {t("checkout.cod")}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {t("checkout.codDescription")}
                      </p>
                    </div>
                  </label>

                  {/* Credit Card (Disabled for now) */}
                  <label className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 border-gray-200 bg-gray-50 cursor-not-allowed opacity-60">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      disabled
                      className="mt-1 w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard size={20} className="text-gray-400" />
                        <span className="font-bold text-gray-500 text-sm sm:text-base">
                          {t("checkout.card")}{" "}
                          <span className="text-xs">({language === "ar" ? "قريباً" : "Coming Soon"})</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {t("checkout.cardDescription")}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm lg:sticky lg:top-32">
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck size={24} className="text-teal-600" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {t("checkout.orderSummary")}
                  </h2>
                </div>

                {/* Cart Items Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img
                          src={item.image || PLACEHOLDER_IMAGE}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {t("cart.quantity")}: {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-teal-600">
                          EGP {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{t("cart.subtotal")}</span>
                    <span className="font-semibold">EGP {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{t("cart.shipping")}</span>
                    {isFreeShipping(formData.city, totalPrice) ? (
                      <span className="font-semibold text-green-600">
                        {language === "ar" ? "مجاناً (بورسعيد، فوق ٣٠٠ ج)" : "Free (Port Said, over 300 EGP)"}
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-700 text-end">
                        {formData.city === "Port Said"
                          ? language === "ar"
                            ? `يتحدد عند التأكيد (مجاني فوق ${FREE_SHIPPING_MIN} ج)`
                            : `Set on confirmation (free over ${FREE_SHIPPING_MIN} EGP)`
                          : language === "ar"
                            ? "يتحدد عند تأكيد الطلب"
                            : "Set on order confirmation"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">
                    {t("cart.total")}
                  </span>
                  <span className="text-2xl font-bold text-teal-600">
                    EGP {totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t("checkout.placing")}</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} strokeWidth={2.5} />
                      <span>{t("checkout.placeOrder")}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <ShieldCheck size={14} />
                  <span>{t("checkout.secureCheckout")}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
