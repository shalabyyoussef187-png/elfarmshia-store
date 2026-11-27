import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  MessageSquare,
  ShieldCheck,
  Check,
} from "lucide-react";
import { FREE_SHIPPING_MIN } from "../utils/shipping";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const Cart = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { info, success, warning } = useToast();

  const [orderNote, setOrderNote] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCountry, setShippingCountry] = useState(isRtl ? "مصر" : "Egypt");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 20) {
      warning(isRtl ? "الحد الأقصى للكمية هو 20 قطة" : "Maximum quantity is 20 items");
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    info(`${item.name} ${isRtl ? "تمت إزالته من السلة" : "removed from cart"}`);
  };

  const handleClearCart = () => {
    if (window.confirm(isRtl ? "هل أنت تأكد من تفريغ السلة؟" : "Are you sure you want to clear the cart?")) {
      clearCart();
      success(isRtl ? "تم تفريغ السلة بنجاح" : "Cart cleared successfully");
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === "PHARMA10" || couponCode.toUpperCase() === "SAVE10") {
      const discount = totalPrice * 0.1;
      setDiscountAmount(discount);
      setCouponApplied(true);
      success(isRtl ? "تم تطبيق خصم 10% بنجاح!" : "10% discount applied!");
    } else {
      warning(isRtl ? "كود الخصم غير صحيح" : "Invalid coupon code");
    }
  };

  const handleCalculateShipping = (e) => {
    e.preventDefault();
    setShippingCost(50);
    success(isRtl ? "تم حساب تكلفة الشحن: 50 ج.م" : "Shipping rates calculated: 50 EGP");
  };

  const finalPrice = Math.max(0, totalPrice - discountAmount + shippingCost);

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-900/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-teal-700 shadow-xs">
              <ShoppingBag size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
                {isRtl ? "سلة التسوق" : "Shopping Cart"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {cartItems.length} {isRtl ? "منتجات في السلة" : "items in your cart"}
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all cursor-pointer"
            >
              <Trash2 size={15} />
              <span>{isRtl ? "تفريغ السلة" : "Clear Cart"}</span>
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-xl mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6 text-teal-600">
              <ShoppingBag size={38} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-emerald-950 mb-2">
              {isRtl ? "سلة التسوق فارغة" : "Your cart is empty"}
            </h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              {isRtl
                ? "يبدو أنك لم تضف أي منتجات إلى سلة التسوق بعد. تصفح منتجاتنا واكتشف عروضنا المتميزة!"
                : "Explore our wide range of products and find something you love!"}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-full shadow-lg shadow-teal-600/20 hover:scale-105 transition-all"
            >
              <span>{isRtl ? "ابدأ التسوق الآن" : "Start Shopping Now"}</span>
              {isRtl ? <ArrowLeft size={18} strokeWidth={2.5} /> : <ArrowRight size={18} strokeWidth={2.5} />}
            </Link>
          </div>
        ) : (
          /* Active Cart Grid matching Dr Vitamin Inspiration */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Cart Items Table + Order Note (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Items Table Container */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                {/* Table Header - Desktop Only */}
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-gray-100 text-xs font-black text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">{isRtl ? "المنتج" : "Product"}</div>
                  <div className="col-span-3 text-center">{isRtl ? "الكمية" : "Quantity"}</div>
                  <div className="col-span-3 text-left rtl:text-right">{isRtl ? "المجموع الفرعي" : "Subtotal"}</div>
                </div>

                {/* Table Body Items - Responsive Grid / Stacked on Mobile */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 sm:items-center">
                        
                        {/* Product details (6 Cols on sm+) */}
                        <div className="sm:col-span-6 flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                              title={isRtl ? "حذف" : "Remove"}
                            >
                              <Trash2 size={16} />
                            </button>

                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-gray-100 p-1.5 sm:p-2 shrink-0 overflow-hidden flex items-center justify-center">
                              <img
                                src={item.image || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug line-clamp-2">
                                {item.name}
                              </h3>
                              <p className="text-xs text-teal-700 font-bold mt-0.5">
                                {item.price.toFixed(0)} {isRtl ? "ج.م" : "EGP"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mobile bottom row / Desktop columns */}
                        <div className="flex items-center justify-between sm:contents pt-2 border-t border-gray-100 sm:border-0 sm:pt-0">
                          {/* Stepper Quantity (3 Cols on sm+) */}
                          <div className="sm:col-span-3 flex sm:justify-center">
                            <div className="flex items-center bg-slate-100 border border-slate-200/80 rounded-xl p-1 shadow-xs">
                              <button
                                onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer"
                              >
                                <Minus size={13} strokeWidth={2.5} />
                              </button>
                              
                              <span className="w-8 sm:w-9 text-center font-extrabold text-xs sm:text-sm text-gray-900">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold hover:bg-teal-700 transition-all cursor-pointer shadow-xs"
                              >
                                <Plus size={13} strokeWidth={2.5} />
                              </button>
                            </div>
                          </div>

                          {/* Subtotal (3 Cols on sm+) */}
                          <div className="sm:col-span-3 text-left rtl:text-right">
                            <span className="text-sm sm:text-base font-black text-emerald-950">
                              {(item.price * item.quantity).toFixed(0)} {isRtl ? "ج.م" : "EGP"}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping CTA inside left box */}
                <div className="p-4 bg-slate-50/70 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
                  >
                    <span>{isRtl ? "متابعة التسوق" : "Continue Shopping"}</span>
                  </Link>
                </div>
              </div>

              {/* Order Note Box ("أضافة ملاحظة الطلب") */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare size={18} className="text-teal-600" />
                  <h3 className="text-sm font-extrabold text-emerald-950">
                    {isRtl ? "أضافة ملاحظة الطلب" : "Add Order Note"}
                  </h3>
                </div>
                <textarea
                  rows={3}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder={isRtl ? "كيف يمكننا مساعدتك؟ اكتب أي تعليمات خاصة بتسليم طلبك..." : "How can we help you? Write any delivery instructions..."}
                  className="w-full p-4 text-xs text-gray-800 bg-slate-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all placeholder-gray-400 resize-none font-medium"
                />
              </div>

            </div>

            {/* Right Column: Order Summary Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-md sticky top-28">
                
                <h2 className="text-lg font-black text-emerald-950 mb-6 pb-3 border-b border-gray-100">
                  {isRtl ? "إجمالي سلة التسوق" : "Cart Totals"}
                </h2>

                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm font-bold text-gray-600 mb-4">
                  <span>{isRtl ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="text-base font-black text-emerald-950">
                    {totalPrice.toFixed(0)} {isRtl ? "ج.م" : "EGP"}
                  </span>
                </div>

                {/* Free delivery in Port Said over 300 EGP */}
                <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs font-extrabold text-emerald-900 mb-2">
                    {totalPrice >= FREE_SHIPPING_MIN
                      ? isRtl
                        ? "مبروك! التوصيل مجاني داخل بورسعيد"
                        : "Free delivery in Port Said unlocked"
                      : isRtl
                        ? `فاضلك ${Math.ceil(FREE_SHIPPING_MIN - totalPrice)} ج ويبقى التوصيل مجاني داخل بورسعيد`
                        : `Add ${Math.ceil(FREE_SHIPPING_MIN - totalPrice)} EGP more for free delivery in Port Said`}
                  </p>
                  <div className="h-2 rounded-full bg-emerald-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-all"
                      style={{ width: `${Math.min(100, (totalPrice / FREE_SHIPPING_MIN) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Estimate Shipping Accordion / Box */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck size={16} className="text-teal-600" />
                    <span className="text-xs font-extrabold text-gray-800">
                      {isRtl ? "تقدير أسعار الشحن:" : "Estimate Shipping Rates:"}
                    </span>
                  </div>

                  <form onSubmit={handleCalculateShipping} className="space-y-2">
                    <input
                      type="text"
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      placeholder={isRtl ? "الدولة" : "Country"}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl outline-none focus:border-teal-400"
                    />
                    <input
                      type="text"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      placeholder={isRtl ? "الرمز البريدي / المدينة" : "City / Zip Code"}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl outline-none focus:border-teal-400"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      {isRtl ? "حساب تكلفة الشحن" : "Calculate Shipping Rates"}
                    </button>
                  </form>
                </div>

                {/* Coupon Code Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={15} className="text-teal-600" />
                    <span className="text-xs font-extrabold text-gray-800">
                      {isRtl ? "قسيمة الخصم:" : "Coupon Code:"}
                    </span>
                  </div>

                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={isRtl ? "رمز القسيمة" : "Coupon code"}
                      disabled={couponApplied}
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl outline-none focus:border-teal-400 uppercase font-bold"
                    />
                    <button
                      type="submit"
                      disabled={couponApplied}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer disabled:bg-emerald-600"
                    >
                      {couponApplied ? <Check size={16} /> : (isRtl ? "تطبيق" : "Apply")}
                    </button>
                  </form>
                </div>

                {/* Discounts Display */}
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-600 mb-4 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                    <span>{isRtl ? "خصم القسيمة (10%):" : "Coupon Discount (10%):"}</span>
                    <span>-{discountAmount.toFixed(0)} {isRtl ? "ج.م" : "EGP"}</span>
                  </div>
                )}

                {/* Final Total */}
                <div className="flex justify-between items-baseline pt-4 mb-6 border-t border-gray-100">
                  <span className="text-base font-black text-gray-900">
                    {isRtl ? "إجمالي الطلبات:" : "Total Orders:"}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-teal-700">
                      {finalPrice.toFixed(0)} {isRtl ? "ج.م" : "EGP"}
                    </span>
                    <p className="text-[10px] text-gray-400">
                      {isRtl ? "يتم احتساب الضرائب والشحن عند الدفع" : "Taxes & shipping calculated at checkout"}
                    </p>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  to="/checkout"
                  className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isRtl ? "إتمام الشراء الآن" : "Proceed to Checkout"}</span>
                  {isRtl ? <ArrowLeft size={18} strokeWidth={2.5} /> : <ArrowRight size={18} strokeWidth={2.5} />}
                </Link>

                {/* Trust Guarantee Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium">
                  <ShieldCheck size={16} className="text-teal-600" />
                  <span>{isRtl ? "دفع آمن ومحمي 100%" : "100% Secure Checkout"}</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
