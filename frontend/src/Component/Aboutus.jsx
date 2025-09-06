import { Leaf, Users, Award, Sprout } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="bg-gray-50 dark:bg-[#0B1A12] dark:text-[#F9FAFB] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-[#F9FAFB]">
            About KrishiLink
          </h2>
          <p className="text-lg text-gray-600 dark:text-[#D1D5DB] max-w-3xl mx-auto">
            KrishiLink is your trusted agricultural partner, connecting farmers, 
            buyers, and service providers through a smart and sustainable digital platform.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-[#F9FAFB]">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-[#D1D5DB]">
              To empower farmers with technology, enhance agricultural productivity, 
              and create a reliable marketplace for selling and buying fresh produce.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-[#F9FAFB]">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-[#D1D5DB]">
              To build a sustainable and digitally connected agricultural ecosystem 
              that benefits farmers, consumers, and future generations.
            </p>
          </div>
        </div>

        {/* Values / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow hover:shadow-lg transition">
            <Leaf className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-[#34D399]" />
            <h4 className="font-bold text-lg">Sustainability</h4>
            <p className="text-gray-600 dark:text-[#D1D5DB] mt-2">
              Promoting eco-friendly farming practices.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow hover:shadow-lg transition">
            <Users className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-[#34D399]" />
            <h4 className="font-bold text-lg">Community</h4>
            <p className="text-gray-600 dark:text-[#D1D5DB] mt-2">
              Connecting farmers, buyers, and experts together.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow hover:shadow-lg transition">
            <Award className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-[#34D399]" />
            <h4 className="font-bold text-lg">Quality</h4>
            <p className="text-gray-600 dark:text-[#D1D5DB] mt-2">
              Ensuring high-quality products and fair trade.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] rounded-2xl shadow hover:shadow-lg transition">
            <Sprout className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-[#34D399]" />
            <h4 className="font-bold text-lg">Innovation</h4>
            <p className="text-gray-600 dark:text-[#D1D5DB] mt-2">
              Using technology to modernize agriculture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
