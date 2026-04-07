import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "Orders & Products",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "Simply browse our products, add items to your cart, and proceed to checkout. You can pay online or choose cash on delivery. We'll confirm your order and deliver it to your doorstep.",
        },
        {
          question: "Are all products authentic?",
          answer:
            "Yes, we guarantee 100% authentic products. We partner only with licensed pharmacies and authorized distributors. All medications are sourced from reputable manufacturers and stored under proper conditions.",
        },
        {
          question: "Can I order prescription medications?",
          answer:
            "Yes, you can order prescription medications. You'll need to upload a valid prescription from a licensed doctor during checkout. Our pharmacists will verify it before processing your order.",
        },
        {
          question: "What if a product is out of stock?",
          answer:
            "If a product is out of stock, you can request to be notified when it's back in stock. We'll send you an email as soon as it becomes available again.",
        },
      ],
    },
    {
      category: "Delivery & Shipping",
      questions: [
        {
          question: "Where do you deliver?",
          answer:
            "We deliver across Egypt. Delivery times vary by location: same-day or next-day in Port Said and major cities, 2-3 days for other areas.",
        },
        {
          question: "How much does delivery cost?",
          answer:
            "Delivery is free for orders over 200 EGP. For orders under 200 EGP, a small delivery fee applies based on your location.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes! Once your order is shipped, you'll receive a tracking link via SMS and email. You can monitor your delivery in real-time.",
        },
        {
          question: "What are your delivery hours?",
          answer:
            "We deliver Sunday through Thursday, 9 AM to 8 PM. Orders placed before noon are typically delivered the same day in Port Said and major cities.",
        },
      ],
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept credit/debit cards (Visa, Mastercard), mobile wallets, and cash on delivery. All online payments are processed securely.",
        },
        {
          question: "Is it safe to pay online?",
          answer:
            "Absolutely. We use industry-standard SSL encryption to protect your payment information. Your financial data is never stored on our servers.",
        },
        {
          question: "Can I get a receipt?",
          answer:
            "Yes, we provide detailed invoices for all orders. You'll receive a digital receipt via email, and a printed receipt with your delivery.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "You can return unopened, unused products within 14 days of delivery. Medications and personal care items must be in original packaging with seals intact.",
        },
        {
          question: "How do refunds work?",
          answer:
            "Refunds are processed within 5-7 business days after we receive and verify the returned items. The amount will be refunded to your original payment method.",
        },
        {
          question: "What if I receive a damaged product?",
          answer:
            "Contact us immediately with photos of the damaged item. We'll arrange a free pickup and send you a replacement or issue a full refund.",
        },
      ],
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "Do I need an account to order?",
          answer:
            "No, you can checkout as a guest. However, creating an account lets you track orders, save favorites, and checkout faster on future purchases.",
        },
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach us via phone (+20 123 456 7890), email (support@pharmacy.com), or our contact form. We're available Sunday-Thursday, 9 AM to 8 PM.",
        },
        {
          question: "Can I cancel my order?",
          answer:
            "Yes, you can cancel orders before they're shipped. Contact us as soon as possible. Once shipped, you can refuse delivery or return the items.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item, questionIndex) => {
                  const globalIndex = `${sectionIndex}-${questionIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-teal-200 transition-colors"
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        className="w-full flex items-center justify-between gap-4 p-6 text-left"
                      >
                        <span className="font-semibold text-gray-900 text-lg">
                          {item.question}
                        </span>
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            isOpen
                              ? "bg-teal-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our customer support team is here to help
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
