import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const Cart = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { info, success, warning } = useToast();

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) {
      warning(t("cart.maxQuantity"));
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    info(`${item.name} ${t("cart.itemRemoved")}`);
  };

  const handleClearCart = () => {
    if (window.confirm(t("cart.clearConfirm"))) {
      clearCart();
      success(t("cart.cleared"));
    }
  };

  // Calculate savings
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-12 md:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-teal-100 flex items-center justify-center">
              <ShoppingBag
                className="text-teal-600"
                size={24}
                strokeWidth={2}
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                {t("cart.title")}
              </h1>
              <p className="text-base md:text-xl text-gray-600 mt-1 md:mt-2">
                {cartItems.length} {t("cart.items")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="flex flex-col items-center justify-center py-12 md:py-20">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gray-100 flex items-center justify-center mb-6">
                <ShoppingBag
                  className="text-gray-400"
                  size={40}
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center px-4">
                {t("cart.empty")}
              </h2>
              <p className="text-sm md:text-base text-gray-600 text-center max-w-md mb-8 px-4">
                {t("cart.emptyMessage")}
              </p>
              <Link
                to="/products"
                className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>{t("cart.startShopping")}</span>
                <ArrowRight size={20} strokeWidth={2.5} />
              </Link>
            </div>
          ) : (
            // Cart Items
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {/* Clear Cart Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleClearCart}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm font-medium">
                      {t("cart.clearCart")}
                    </span>
                  </button>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                      {/* Product Image */}
                      <div className="shrink-0 mx-auto sm:mx-0">
                        <div className="w-32 h-32 sm:w-24 sm:h-24 rounded-xl bg-gray-100 overflow-hidden">
                          <img
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"
                            }
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        {item.category && (
                          <p className="text-xs md:text-sm text-gray-500 mb-1">
                            {item.category}
                          </p>
                        )}
                        {item.brand && (
                          <p className="text-xs md:text-sm text-gray-500">
                            <span className="font-medium">Brand:</span>{" "}
                            {item.brand}
                          </p>
                        )}

                        {/* Price & Discount */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3 mt-3">
                          <span className="text-xl md:text-2xl font-bold text-teal-600">
                            EGP {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <>
                              <span className="text-xs md:text-sm text-gray-400 line-through">
                                EGP {item.originalPrice.toFixed(2)}
                              </span>
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                -{item.discount}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between w-full sm:w-auto gap-3 sm:gap-0">
                        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all duration-300"
                              disabled={item.quantity <= 1}
                            >
                              <Minus
                                size={16}
                                className={
                                  item.quantity <= 1
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                }
                              />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all duration-300"
                            >
                              <Plus size={16} className="text-gray-700" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1">
                              {t("cart.subtotal")}
                            </p>
                            <p className="text-lg md:text-xl font-bold text-gray-900">
                              EGP {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm font-medium">
                            {t("cart.remove")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm lg:sticky lg:top-32">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                    {t("checkout.orderSummary")}
                  </h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm md:text-base text-gray-600">
                      <span>{t("cart.subtotal")}</span>
                      <span className="font-semibold">
                        EGP {totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex justify-between text-sm md:text-base text-green-600">
                        <span>{t("cart.savings")}</span>
                        <span className="font-bold">
                          -EGP {totalSavings.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                      <AlertCircle
                        size={16}
                        className="text-blue-600 shrink-0 mt-0.5"
                      />
                      <p className="text-xs text-blue-900">
                        {language === "ar"
                          ? "الشحن والخصومات سيتم حسابها عند الدفع"
                          : "Shipping and additional discounts calculated at checkout"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                    <span className="text-lg md:text-xl font-bold text-gray-900">
                      {t("cart.total")}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-teal-600">
                      EGP {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl mb-4 cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <span>{t("cart.checkout")}</span>
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </Link>

                  <Link
                    to="/products"
                    className="w-full flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    <span>{t("cart.continueShopping")}</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
