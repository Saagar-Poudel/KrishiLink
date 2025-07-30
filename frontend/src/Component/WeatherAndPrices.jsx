import { Cloud, Sun, CloudRain, Thermometer, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WeatherAndPrices = () => {
  const { t } = useLanguage();
  
  const weatherData = {
    location: 'काठमाडौं',
    temperature: '२४°C',
    condition: 'आंशिक बादल',
    humidity: '६४%',
    windSpeed: '१२ किमी/घण्टा',
    forecast: [
      { day: 'आज', temp: '२४°C', condition: 'cloudy' },
      { day: 'भोलि', temp: '२६°C', condition: 'sunny' },
      { day: 'पर्सि', temp: '२३°C', condition: 'rainy' },
      { day: 'बिहीबार', temp: '२५°C', condition: 'sunny' },
    ]
  };

  const marketPrices = [
    { name: 'धान', price: '४००', unit: 'प्रति क्विन्टल', change: '+४%', trend: 'up' },
    { name: 'मकै', price: '६००', unit: 'प्रति क्विन्टल', change: '-२%', trend: 'down' },
    { name: 'आलु', price: '४५', unit: 'प्रति केजी', change: '+६%', trend: 'up' },
    { name: 'प्याज', price: '७०', unit: 'प्रति केजी', change: '+१२%', trend: 'up' },
    { name: 'टमाटर', price: '६०', unit: 'प्रति केजी', change: '-४%', trend: 'down' },
    { name: 'केरा', price: '१२०', unit: 'प्रति दर्जन', change: '+३%', trend: 'up' },
  ];

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

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
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700">
                <Thermometer className="h-5 w-5 text-green-700" />
                {t('todayWeather')}
              </h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-green-700 mb-1">{weatherData.temperature}</div>
                <div className="text-gray-500 mb-2">{weatherData.location}</div>
                <div className="text-sm text-gray-500">{weatherData.condition}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-100 rounded-lg">
                  <div className="text-sm text-gray-500">आर्द्रता</div>
                  <div className="font-semibold">{weatherData.humidity}</div>
                </div>
                <div className="text-center p-3 bg-gray-100 rounded-lg">
                  <div className="text-sm text-gray-500">हावाको गति</div>
                  <div className="font-semibold">{weatherData.windSpeed}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-500 mb-2">४ दिनको पूर्वानुमान</div>
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(day.condition)}
                      <span>{day.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Prices Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700">
                <TrendingUp className="h-5 w-5 text-green-700" />
                {t('marketPrices')}
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">प्रति {item.unit}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">रू {item.price}</div>
                      <div className="flex items-center gap-1">
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span 
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            item.trend === 'up' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-1">मूल्य अलर्ट</div>
                <div className="text-sm text-gray-600">
                  आलुको मूल्य अपेक्षाभन्दा ८% बढी छ। बेच्ने उत्तम समय हो।
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