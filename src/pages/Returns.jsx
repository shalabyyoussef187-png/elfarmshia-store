import {
  RotateCcw,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const Returns = () => {
  const returnSteps = [
    {
      step: "1",
      title: "Contact Us",
      description:
        "Reach out within 14 days of delivery via phone or email with your order number",
    },
    {
      step: "2",
      title: "Get Approval",
      description:
        "Our team will review your request and provide return authorization",
    },
    {
      step: "3",
      title: "Pack Items",
      description:
        "Pack items securely in original packaging with all accessories and documentation",
    },
    {
      step: "4",
      title: "Schedule Pickup",
      description:
        "We'll arrange free pickup from your address at your convenience",
    },
    {
      step: "5",
      title: "Receive Refund",
      description:
        "Get your refund within 5-7 business days after we receive the items",
    },
  ];

  const eligibleReturns = [
    "Unopened products in original packaging",
    "Items with intact seals and labels",
    "Products within 14 days of delivery",
    "Items with valid purchase receipt",
    "Damaged or defective products (any time)",
    "Wrong items delivered",
  ];

  const nonEligibleReturns = [
    "Opened medications or supplements",
    "Personal care items with broken seals",
    "Products without original packaging",
    "Items beyond 14-day return window",
    "Products showing signs of use",
    "Custom or special orders",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-teal-100 rounded-2xl flex items-center justify-center">
            <RotateCcw size={32} className="text-teal-600" strokeWidth={2} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Returns & Refunds
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your satisfaction is our priority
          </p>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-teal-50 rounded-3xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  14-Day Return Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We want you to be completely satisfied with your purchase. If
                  you're not happy with any item, you can return it within 14
                  days of delivery for a full refund. All products must be
                  unopened and in their original packaging with seals intact.
                </p>
              </div>
            </div>
          </div>

          {/* Eligible vs Non-Eligible */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Eligible for Return
                </h3>
              </div>
              <ul className="space-y-3">
                {eligibleReturns.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <XCircle
                    size={20}
                    className="text-red-600"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Not Eligible for Return
                </h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleReturns.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle
                      size={20}
                      className="text-red-600 flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How to Return an Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {returnSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <div className="w-14 h-14 mx-auto bg-teal-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  {index < returnSteps.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 bg-gray-200" />
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Damaged/Wrong Items */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle
                  size={24}
                  className="text-amber-600"
                  strokeWidth={2}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Damaged or Wrong Items?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you receive a damaged, defective, or incorrect item, please
                  contact us immediately. We'll arrange a free pickup and send
                  you a replacement or issue a full refund - no questions asked.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Please take photos of the damaged item and packaging to help
                  us process your claim faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Refund Information
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Refund Timeline
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Refunds are processed within 5-7 business days after we
                  receive and verify the returned items. You'll receive an email
                  confirmation once the refund is initiated.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Refund Method
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Refunds are issued to your original payment method. For cash
                  on delivery orders, we can refund via bank transfer or mobile
                  wallet.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Partial Returns
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  If you ordered multiple items, you can return some and keep
                  others. We'll refund only the returned items.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Exchange Policy
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We currently don't offer direct exchanges. Please return the
                  item for a refund and place a new order for the product you
                  want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-linear-to-b from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help with a Return?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Our customer support team is ready to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+201234567890"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              Call: +20 123 456 7890
            </a>
            <a
              href="mailto:support@pharmacy.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-400 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              Email: support@pharmacy.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Returns;
