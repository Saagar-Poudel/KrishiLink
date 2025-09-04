import { useLanguage } from '../../contexts/LanguageContext';
import Weather from './Wether';

const WeatherAndPrices = () => {
  const { t } = useLanguage();

  const marketPrices = [
    { name: 'धान', price: '४००', unit: 'प्रति क्विन्टल', change: '+४%', trend: 'up' },
    { name: 'मकै', price: '६००', unit: 'प्रति क्विन्टल', change: '-२%', trend: 'down' },
    { name: 'आलु', price: '४५', unit: 'प्रति केजी', change: '+६%', trend: 'up' },
    { name: 'प्याज', price: '७०', unit: 'प्रति केजी', change: '+१२%', trend: 'up' },
    { name: 'टमाटर', price: '६०', unit: 'प्रति केजी', change: '-४%', trend: 'down' },
    { name: 'केरा', price: '१२०', unit: 'प्रति दर्जन', change: '+३%', trend: 'up' },
  ];


  return (
    <section id="weather" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
           {t('weatherPricesTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('weatherPricesSubtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weather Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md">
            <Weather />
          </div> 

          {/* Market Prices Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md">
            
 <div className="border-border/50">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-3xl font-semibold text-foreground mb-2 text-green-600">
                Live Market Data from Nepal Calendar
              </h2>
              <p className="text-sm text-muted-foreground text-green-600">
                Real-time vegetable price updates from Kalimati Market
              </p>
            </div>
            
            <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
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

      </div>
    </section>
  );
};

export default WeatherAndPrices;