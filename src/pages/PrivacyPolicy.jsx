import { Shield, Lock, Eye, Mail, FileText, Users } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account or place an order, we collect your name, email address, phone number, delivery address, and payment information. This helps us process your orders and communicate with you effectively.",
        },
        {
          subtitle: "Health Information",
          text: "For prescription medications, we collect prescription details and relevant health information. This data is handled with strict confidentiality and stored securely.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our website, including pages visited, products viewed, and browsing patterns to improve your shopping experience.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Order Processing",
          text: "We use your personal and payment information to process orders, arrange deliveries, and provide customer support.",
        },
        {
          subtitle: "Communication",
          text: "We may send you order confirmations, shipping updates, promotional offers, and health-related information. You can opt out of marketing communications anytime.",
        },
        {
          subtitle: "Service Improvement",
          text: "We analyze usage data to improve our website, personalize your experience, and develop new features and services.",
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with legal obligations, resolve disputes, and enforce our terms and policies.",
        },
      ],
    },
    {
      icon: Shield,
      title: "How We Protect Your Information",
      content: [
        {
          subtitle: "Secure Storage",
          text: "All personal and health information is stored on secure servers with industry-standard encryption. Access is restricted to authorized personnel only.",
        },
        {
          subtitle: "Payment Security",
          text: "We use SSL encryption for all payment transactions. Credit card information is processed through secure payment gateways and never stored on our servers.",
        },
        {
          subtitle: "Data Backup",
          text: "Regular backups ensure your data is protected against loss or corruption while maintaining strict security protocols.",
        },
      ],
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Service Providers",
          text: "We share necessary information with trusted partners who help us operate our business, such as delivery services, payment processors, and licensed pharmacies.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information when required by law, court order, or government request, or to protect our rights and safety.",
        },
        {
          subtitle: "No Selling of Data",
          text: "We never sell, rent, or trade your personal information to third parties for marketing purposes.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Your Privacy Rights",
      content: [
        {
          subtitle: "Access Your Data",
          text: "You have the right to request a copy of all personal information we hold about you.",
        },
        {
          subtitle: "Update Information",
          text: "You can update your account information anytime through your account settings or by contacting us.",
        },
        {
          subtitle: "Delete Your Data",
          text: "You can request deletion of your account and associated data. Note that we may retain certain information for legal compliance.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can unsubscribe from marketing communications at any time using the unsubscribe link in our emails.",
        },
      ],
    },
    {
      icon: Mail,
      title: "Cookies & Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use necessary cookies to enable core website functionality like shopping cart and user authentication.",
        },
        {
          subtitle: "Analytics Cookies",
          text: "We use analytics tools to understand how visitors use our site, helping us improve performance and user experience.",
        },
        {
          subtitle: "Marketing Cookies",
          text: "With your consent, we may use cookies to show you relevant advertisements and track campaign effectiveness.",
        },
        {
          subtitle: "Cookie Management",
          text: "You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-teal-100 rounded-2xl flex items-center justify-center">
            <Shield size={32} className="text-teal-600" strokeWidth={2} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your privacy and data security are our top priorities
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: March 2024</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-teal-50 rounded-3xl p-8 mb-16">
            <p className="text-gray-700 leading-relaxed text-lg">
              At Al-Farmashiia, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, store, and protect your data
              when you use our online pharmacy services. By using our website,
              you agree to the practices described in this policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Icon
                        size={24}
                        className="text-teal-600"
                        strokeWidth={2}
                      />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6 ml-16">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Children's Privacy */}
          <div className="mt-16 bg-gray-50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not directed to children under 18. We do not
              knowingly collect personal information from children. If you
              believe we have collected information from a child, please contact
              us immediately.
            </p>
          </div>

          {/* Policy Updates */}
          <div className="mt-8 bg-gray-50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. We'll notify you of
              significant changes via email or a notice on our website. Your
              continued use of our services after such changes constitutes
              acceptance of the updated policy.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-linear-to-b from-teal-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            If you have any questions or concerns about our Privacy Policy or
            how we handle your data, please contact us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@pharmacy.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
            >
              <Mail size={20} />
              privacy@pharmacy.com
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-400 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
