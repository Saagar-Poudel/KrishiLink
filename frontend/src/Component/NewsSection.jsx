import { Calendar, ExternalLink, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NewsSection = () => {
  const { t } = useLanguage();
  
  const news = [
    {
      id: 1,
      title: 'कृषि अनुदान योजना २०८१',
      excerpt: 'सरकारले नयाँ कृषि अनुदान योजना सार्वजनिक गरेको छ। यस योजना अन्तर्गत किसानहरूले बीउ, मल र कृषि उपकरणमा ५०% अनुदान पाउनेछन्।',
      date: '२०८१/०१/१५',
      category: 'अनुदान',
      urgent: true,
      source: 'कृषि मन्त्रालय'
    },
    {
      id: 2,
      title: 'जैविक खेतीका लागि नयाँ प्रविधि',
      excerpt: 'नेपालमा जैविक खेतीलाई प्रवर्द्धन गर्न नयाँ प्रविधिको परिचय। यस प्रविधिबाट उत्पादन ३०% बढ्ने अनुमान।',
      date: '२०८१/०१/१२',
      category: 'प्रविधि',
      urgent: false,
      source: 'कृषि अनुसन्धान केन्द्र'
    },
    {
      id: 3,
      title: 'मौसम परिवर्तनको प्रभाव र समाधान',
      excerpt: 'मौसम परिवर्तनले नेपाली कृषिमा पारेको प्रभाव र यसका समाधानका उपायहरूबारे विस्तृत अध्ययन प्रकाशित।',
      date: '२०८१/०१/१०',
      category: 'अनुसन्धान',
      urgent: false,
      source: 'पर्यावरण मन्त्रालय'
    },
    {
      id: 4,
      title: 'कृषि उत्पादन बीमा योजना',
      excerpt: 'प्राकृतिक प्रकोपबाट हुने नोक्सानीबाट किसानहरूलाई बचाउन कृषि बीमा योजना सुरु गरिएको छ।',
      date: '२०८१/०१/०८',
      category: 'बीमा',
      urgent: true,
      source: 'राष्ट्रिय बीमा संस्थान'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'अनुदान':
        return 'bg-green-600 text-white';
      case 'प्रविधि':
        return 'bg-blue-600 text-white';
      case 'अनुसन्धान':
        return 'bg-yellow-500 text-white';
      case 'बीमा':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
  <section
  id="news"
  className="py-16 bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB]"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-[#34D399] mb-4">
        {t('newsTitle')}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {t('newsSubtitle')}
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {news.map((item) => (
        <div
          key={item.id}
          className={`bg-white dark:bg-[#12241A] border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
            item.urgent
              ? 'border-orange-500 dark:border-[#F59E0B]'
              : 'border-gray-200 dark:border-[#1F2937]'
          }`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-[#374151]">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-tight flex-1 dark:text-[#F9FAFB]">
                {item.urgent && (
                  <Bell className="h-4 w-4 text-orange-500 dark:text-[#F59E0B] inline mr-2" />
                )}
                {item.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(
                  item.category
                )}`}
              >
                {item.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {item.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {item.date}
              </div>
              <div>{item.source}</div>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-white dark:bg-[#0B1A12] border border-gray-300 dark:border-[#374151] rounded-md hover:bg-gray-50 dark:hover:bg-[#12241A] transition-colors flex items-center justify-center text-green-700 dark:text-[#34D399]">
              पूरा पढ्नुहोस्
              <ExternalLink className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Newsletter Subscription */}
    <div className="bg-green-700 dark:bg-[#059669] text-white rounded-lg">
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">समाचार सदस्यता</h3>
        <p className="mb-6 opacity-90">
          नवीनतम कृषि समाचार र सरकारी योजनाहरूको जानकारी प्राप्त गर्न सदस्यता लिनुहोस्।
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="तपाईंको इमेल ठेगाना"
            className="flex-1 px-4 py-2 rounded-md text-gray-900 dark:text-[#0B1A12] bg-white dark:bg-[#F9FAFB] border border-gray-300 dark:border-[#374151]"
          />
          <button className="px-6 py-2 bg-white dark:bg-[#FACC15] text-green-700 dark:text-[#0B1A12] rounded-md hover:bg-gray-100 dark:hover:bg-[#F59E0B] transition-colors">
            सदस्यता लिनुहोस्
          </button>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default NewsSection;