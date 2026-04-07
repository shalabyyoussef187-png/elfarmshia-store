import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import { Shield, Eye, Users, Lightbulb, TrendingUp } from "lucide-react";
import { aboutContent } from "../data/aboutContent";

const About = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const content = aboutContent[language] || aboutContent.en;

  const iconMap = {
    shield: Shield,
    eye: Eye,
    users: Users,
    lightbulb: Lightbulb,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-linear-to-br from-teal-50 via-white to-teal-50/30 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-teal-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-linear-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-400 mb-4 block">
              ✦ {content.story.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              {content.story.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {content.story.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.story.timeline.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-2"
              >
                <span className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 mb-5">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {item.body}
                </p>
                <div className="mt-6 text-6xl font-black text-white/5 select-none">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-600 mb-4 block">
              ✦ {content.values.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {content.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.values.items.map((value, i) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <div
                  key={i}
                  className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mb-5">
                    <Icon className="text-teal-600" size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-linear-to-br from-teal-600 via-teal-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-teal-200 mb-4 block">
              ✦ {content.how.tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              {content.how.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.how.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-5xl font-black text-white/20">
                    {step.num}
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-teal-500/30 border border-teal-400/30">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.items.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl font-black text-teal-600 mb-3">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {content.cta.title}
          </h2>
          <p className="text-xl text-gray-600 mb-10">{content.cta.subtitle}</p>
          <a
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {content.cta.button}
            <TrendingUp size={20} strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
