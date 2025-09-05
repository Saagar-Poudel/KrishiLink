import React, { useState, useEffect } from "react"; 
import { Search, MapPin, TrendingUp } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useLanguage } from "../../contexts/LanguageContext";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const apikey = "2a57e1e4c13eb0579d5b5f223462a126";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const weatherResponse = await fetch(`${apiUrl}${city}&appid=${apikey}`);
      if (!weatherResponse.ok) throw new Error("City not found");
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);

      const forecastResponse = await fetch(`${forecastUrl}${city}&appid=${apikey}`);
      if (!forecastResponse.ok) throw new Error("Forecast not available");
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult);

      toast({
        title: "Weather",
        description: `Weather data for ${city} loaded successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch weather data. Please check the city name.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Kathmandu");
  }, []);

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
      setSearchCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const getDailyForecasts = () => {
    if (!forecastData) return [];
    const dailyForecasts = [];
    const processedDates = new Set();
    for (const item of forecastData.list) {
      const date = new Date(item.dt * 1000).toDateString();
      if (!processedDates.has(date) && dailyForecasts.length < 4) {
        dailyForecasts.push(item);
        processedDates.add(date);
      }
    }
    return dailyForecasts.slice(1);
  };

  const getTempColor = (temp) => {
    if (temp > 25) return "text-red-500 dark:text-red-400";
    if (temp < 15) return "text-blue-500 dark:text-blue-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 dark:from-[#0B1A12] dark:to-[#12241A] dark:text-[#F9FAFB]">
      {/* Header */}
 <div className="bg-white dark:bg-[#0B1A12] text-gray-900 dark:text-white p-6 shadow-md">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-2 text-green-600">{t("Krishi Link Weather")}</h1>
    <p className="text-green-600">{t("Agricultural Weather & Market Information")}</p>
  </div>
  </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search Section */}
        <div className="p-6 bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] shadow rounded-2xl">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <MapPin className="w-6 h-6 text-green-600 dark:text-[#34D399]" />
            <div className="flex-1 flex gap-2 w-full">
              <input
                placeholder="Search for a city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none dark:bg-[#0B1A12] dark:border-[#374151] dark:text-[#F9FAFB]"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 dark:bg-[#34D399] hover:bg-green-700 dark:hover:bg-[#059669] text-white px-4 py-2 rounded-lg transition w-full sm:w-auto justify-center"
              >
                <Search className="w-4 h-4" /> {t("Search")}
              </button>
            </div>
          </div>
        </div>

        {/* Current Weather */}
        {weatherData && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-green-700 dark:text-[#34D399]">
              <MapPin className="w-6 h-6 text-green-600 dark:text-[#34D399]" />
              {t("Current Weather")}
            </h2>
            <div className="p-6 rounded-2xl shadow bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937]">
              <h3 className="text-xl font-semibold mb-2 text-green-700 dark:text-[#34D399]">{weatherData.name}</h3>
              <p className={`text-4xl font-bold ${getTempColor(weatherData.main.temp)}`}>
                {Math.round(weatherData.main.temp)}°C
              </p>
              <p className="text-gray-600 dark:text-gray-300 capitalize">{weatherData.weather[0].description}</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400">
                  💧 {t("Humidity")}: {weatherData.main.humidity}%
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400">
                  🌬️ {t("Wind")}: {weatherData.wind.speed} m/s
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4-Day Forecast */}
        {forecastData && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-green-700 dark:text-[#34D399]">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-[#34D399]" />
              {t("4-Day Forecast")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getDailyForecasts().map((forecast, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl shadow bg-white dark:bg-[#12241A] border border-gray-200 dark:border-[#1F2937] flex flex-col items-center"
                >
                  <p className="font-semibold text-green-700 dark:text-[#34D399]">
                    {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${getTempColor(forecast.main.temp)}`}>
                    {Math.round(forecast.main.temp)}°C
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">{forecast.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
