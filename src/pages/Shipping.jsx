import { Truck, Clock, MapPin, Package, CheckCircle2 } from "lucide-react";

const Shipping = () => {
  const deliveryAreas = [
    {
      area: "Port Said",
      timeline: "Same-day or Next-day",
      fee: "Free delivery on orders over 300 EGP",
    },
    {
      area: "Cairo, Alexandria, Giza",
      timeline: "1-2 business days",
      fee: "Shipping fee confirmed at order",
    },
    {
      area: "Delta Cities",
      timeline: "2-3 business days",
      fee: "Shipping fee confirmed at order",
    },
    {
      area: "Upper Egypt",
      timeline: "3-4 business days",
      fee: "Shipping fee confirmed at order",
    },
  ];

  const shippingSteps = [
    {
      icon: Package,
      title: "Order Confirmed",
      description:
        "You'll receive an email confirmation with your order details",
    },
    {
      icon: CheckCircle2,
      title: "Order Prepared",
      description:
        "Our pharmacy team carefully prepares and packages your items",
    },
    {
      icon: Truck,
      title: "Out for Delivery",
      description:
        "You'll get a tracking link via SMS when your order is shipped",
    },
    {
      icon: MapPin,
      title: "Delivered",
      description: "Receive your order at your doorstep with invoice",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-teal-100 rounded-2xl flex items-center justify-center">
            <Truck size={32} className="text-teal-600" strokeWidth={2} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Fast, reliable delivery across Egypt
          </p>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shippingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-teal-600 rounded-2xl flex items-center justify-center">
                      <Icon size={28} className="text-white" strokeWidth={2} />
                    </div>
                    {index < shippingSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Delivery Timeline
          </h2>
          <div className="space-y-4">
            {deliveryAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <MapPin
                      size={24}
                      className="text-teal-600"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {area.area}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>{area.timeline}</span>
                    </div>
                  </div>
                </div>
                <div className="md:text-right">
                  <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 font-semibold rounded-full">
                    {area.fee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Important Information
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Processing Time
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Orders placed before 12 PM are typically processed and shipped
                  the same day. Orders after 12 PM are processed the next
                  business day.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Delivery Hours
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We deliver Sunday through Thursday, 9 AM to 8 PM. Friday and
                  Saturday deliveries may be available in select areas.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Order Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You'll receive a tracking link via SMS and email once your
                  order is shipped. You can monitor your delivery status in
                  real-time.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Prescription Medications
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Orders containing prescription medications may require
                  additional verification time. Our licensed pharmacists will
                  review your prescription before shipping.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Special Storage Requirements
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Products requiring refrigeration or special storage are
                  shipped in temperature-controlled packaging to ensure quality
                  and safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-b from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            Get your healthcare products delivered to your doorstep
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
