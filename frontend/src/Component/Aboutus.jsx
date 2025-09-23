import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Users, 
  Target, 
  Eye, 
  Sprout, 
  Smartphone, 
  TrendingUp, 
  Shield, 
  Clock,
  Star,
  MapPin,
  Award
} from 'lucide-react';
import farmersImage from '../assets/zucchini.png';

// Counter component for stats
const Counter = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const duration = 2000;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, end]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Animated section wrapper
const AnimatedSection = ({ children, className = '' }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  const teamMembers = [
    { name: "Sagar Poudel", role: "Founder & CEO", image: "public/Images/Sagaru.jpg", bio: "Agriculture expert with 15+ years in agri-tech innovation." },
    { name: "Ritik Joshi", role: "CTO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", bio: "Tech visionary specializing in scalable platform solutions." },
    { name: "Prakash Sapkota", role: "Head of Farmer Relations", image: "public/Images/prakash.jpg", bio: "Former farmer with deep understanding of agricultural challenges." }
  ];

  const timelineEvents = [
    { year: '2024', title: 'Project Inception', description: 'Started with a vision to bridge the gap between farmers and technology' },
    { year: '2024', title: 'Beta Launch', description: 'Launched beta version with 100+ farmers in rural Maharashtra' },
    { year: '2025', title: 'Technology Integration', description: 'Integrated IoT sensors and mobile app for real-time crop monitoring' },
    { year: '2025', title: 'Market Expansion', description: 'Expanded to 5 states connecting 1000+ farmers with direct buyers' },
    { year: '2025', title: 'Present Day', description: 'Leading smart agriculture platform with comprehensive ecosystem' }
  ];

  const features = [
    { icon: Smartphone, title: 'Smart Technology', description: 'IoT sensors, mobile apps, and AI-powered insights for modern farming' },
    { icon: Users, title: 'Direct Connection', description: 'Connect farmers directly with buyers, eliminating middlemen' },
    { icon: TrendingUp, title: 'Better Prices', description: 'Ensure fair pricing and increased profits for farmers' },
    { icon: Shield, title: 'Quality Assurance', description: 'Verified quality standards and trusted marketplace' },
    { icon: Clock, title: 'Real-time Updates', description: 'Live market prices, weather updates, and crop monitoring' },
    { icon: Award, title: 'Expert Support', description: 'Agricultural experts and technical support available 24/7' }
  ];

  const stats = [
    { label: 'Farmers Connected', value: 1200, suffix: '+' },
    { label: 'Products Sold', value: 5000, suffix: '+' },
    { label: 'Partnerships', value: 50, suffix: '+' },
    { label: 'Revenue Generated', value: 2.5, prefix: '₹', suffix: 'Cr' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1110] text-gray-900 dark:text-gray-100">

      {/* Hero Section */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-green-600 dark:text-green-400">
            About <span className="text-green-600 dark:text-green-400">Krishi Link</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto text-green-700 dark:text-green-300">
            Connecting Farmers to Smarter Agriculture
          </p>
          <div className="w-16 h-1 bg-green-600 dark:bg-green-400 mx-auto rounded-full"></div>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h2 className="text-4xl font-bold text-green-600 dark:text-green-400">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To revolutionize agriculture by connecting farmers with cutting-edge technology and direct market access. We believe in empowering farmers with the tools and knowledge they need to increase productivity, reduce costs, and improve their livelihoods.
              </p>
            </div>
            {/* Vision */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Eye className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h2 className="text-4xl font-bold text-green-600 dark:text-green-400">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To create a sustainable agricultural ecosystem where technology and tradition work hand in hand. We envision a future where every farmer has access to smart farming solutions and fair market opportunities.
              </p>
            </div>
          </motion.div>
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src={farmersImage} alt="Happy farmers" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent"></div>
            </div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center shadow-md">
              <Sprout className="w-8 h-8 text-white dark:text-gray-900" />
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection className="py-20 px-4 bg-green-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">From a simple idea to transforming lives of thousands of farmers</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-500 dark:bg-green-400 rounded-full"></div>
            {timelineEvents.map((event, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-green-100 dark:border-green-700 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{event.year}</div>
                    <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">{event.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                  </div>
                </div>
                <div className="relative z-10 w-6 h-6 bg-green-600 dark:bg-green-400 rounded-full border-4 border-white dark:border-gray-900 shadow-md mx-auto"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-4">Why Choose Krishi Link</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Comprehensive solutions for modern agriculture challenges</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group bg-white dark:bg-gray-800 border border-green-100 dark:border-green-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-3">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Team */}
      <AnimatedSection className="py-20 px-4 bg-green-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">Passionate individuals working to revolutionize agriculture</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10 }} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="h-56 overflow-hidden mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-400">{member.name}</h3>
                <p className="text-green-600 dark:text-green-300 font-medium">{member.role}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-r from-green-700 to-green-500 dark:from-green-900 dark:to-green-700">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-white/10 dark:bg-gray-800 backdrop-blur-md rounded-2xl p-6 border border-green-200/30 dark:border-green-700 shadow-md">
              <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="text-green-100 dark:text-green-400 text-lg mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 px-4 bg-gradient-to-r from-green-700 to-green-500 dark:from-green-900 dark:to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Agriculture Revolution</h2>
          <p className="text-xl text-green-100 dark:text-green-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Be part of the change. Connect with us today and transform your farming journey with smart technology and direct market access.
          </p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 font-semibold text-lg rounded-xl shadow-lg hover:bg-green-50 dark:hover:bg-green-900 hover:shadow-glow transition-all duration-300">
            Join Krishi Link Today
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="ml-2">→</motion.div>
          </motion.button>
        </div>
      </AnimatedSection>

    </div>
  );
};

export default AboutUs;
