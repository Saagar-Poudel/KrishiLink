import { useLanguage } from '../../contexts/LanguageContext';
import Weather from './Wether';

const WeatherAndPrices = () => {
  const { t } = useLanguage();

  return (
    <section id="weather" className="py-16 bg-gray-50 dark:bg-[#0B1A12] dark:text-[#F9FAFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-[#34D399] mb-4">
           {t('weatherPricesTitle')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('weatherPricesSubtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weather Section */}
          <div className="bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] rounded-lg shadow-md">
            <Weather />
          </div> 

          {/* Market Prices Section */}
          <div className="bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] rounded-lg shadow-md">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-green-600 dark:text-[#34D399] mb-2">
                  {t("marketPricesTitle")}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("marketPricesSubtitle")}
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-[#374151] rounded-lg overflow-hidden bg-white dark:bg-[#0B1A12]">
                <iframe
                  src="https://nepalicalendar.rat32.com/vegetable/embed.php"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="w-full"
                  title="Nepal Vegetable Market Prices"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WeatherAndPrices;
