
import { ArrowRight, Users, TrendingUp, MapPin, Bot } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Landing = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden ">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/images/land.jpg"
          alt="Smart Agriculture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors flex items-center justify-center">
                {t('getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-green-700 transition-colors">
                {t('learnMore')}
              </button>
            </div>
          </div>

          {/* Right Side Stat Cards */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center text-white border border-white/20">
              <Users className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">५०००+</div>
              <div className="text-sm text-white/80">दर्ता भएका किसान</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center text-white border border-white/20">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">२०००+</div>
              <div className="text-sm text-white/80">दैनिक कारोबार</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center text-white border border-white/20">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">७७</div>
              <div className="text-sm text-white/80">जिल्लामा सेवा</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center text-white border border-white/20">
              <Bot className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl font-bold">२४/७</div>
              <div className="text-sm text-white/80">AI सहायता</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

