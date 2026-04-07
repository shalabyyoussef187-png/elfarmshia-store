import { Briefcase, Users, Target, Heart, ArrowRight } from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Pharmacist",
      department: "Healthcare",
      location: "Port Said, Egypt",
      type: "Full-time",
    },
    {
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Pharmacy Operations Manager",
      department: "Operations",
      location: "Port Said, Egypt",
      type: "Full-time",
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Hybrid",
      type: "Full-time",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate healthcare professionals",
    },
    {
      icon: Target,
      title: "Career Growth",
      description: "Continuous learning and development opportunities",
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Flexible schedules and supportive work environment",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-teal-50/50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Help us make healthcare accessible to everyone in Egypt
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Why Work With Us?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center mb-12">
            At Al-Farmashiia, we're building more than just an online pharmacy.
            We're creating a trusted healthcare platform that makes a real
            difference in people's lives. Join our mission to provide quality
            healthcare products to every Egyptian family.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Icon
                        size={24}
                        className="text-teal-600"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Open Positions
          </h2>
          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {position.department}
                      </span>
                      <span>• {position.location}</span>
                      <span>• {position.type}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95">
                    Apply
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't see the right role?
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            We're always looking for talented individuals. Send us your CV and
            let's talk about opportunities.
          </p>
          <a
            href="mailto:careers@pharmacy.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          >
            Send Your CV
            <ArrowRight size={20} strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Careers;
