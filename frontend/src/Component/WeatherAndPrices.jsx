import { Cloud, Sun, CloudRain, Thermometer, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import Weather from './Wether';

const WeatherAndPrices = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const apikey = "2a57e1e4c13eb0579d5b5f223462a126";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const fetchWeather = async (location) => {
    try {
      const response = await fetch(`${apiUrl}${location}&appid=${apikey}`);
      if (!response.ok) throw new Error("Weather data not found");
      const data = await response.json();
      setWeather(data); 
      return {
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].description,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const weatherData = {
    location: 'काठमाडौं',
    temperature: '२४°C',
    condition: 'आंशिक बादल',
    humidity: '६४%',
    windSpeed: '१२ किमी/घण्टा',
    Forecast: [
      { day: t('today'), temp: '२४°C', tempEn: '24°C', condition: 'cloudy' },
      { day: t('tomorrow'), temp: '२६°C', tempEn: '26°C', condition: 'sunny' },
      { day: t('dayAfter'), temp: '२३°C', tempEn: '23°C', condition: 'rainy' },
      { day: t('thursday'), temp: '२५°C', tempEn: '25°C', condition: 'sunny' },
    ],
  };

  // const Forecast = [
  //   { day: t('today'), temp: '२४°C', tempEn: '24°C', condition: 'cloudy' },
  //   { day: t('tomorrow'), temp: '२६°C', tempEn: '26°C', condition: 'sunny' },
  //   { day: t('dayAfter'), temp: '२३°C', tempEn: '23°C', condition: 'rainy' },
  //   { day: t('thursday'), temp: '२५°C', tempEn: '25°C', condition: 'sunny' },
  // ];

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
            <Weather />
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