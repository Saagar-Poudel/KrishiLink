import React, { useState, useEffect } from "react";
import { Search, MapPin, TrendingUp } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const apikey = "2a57e1e4c13eb0579d5b5f223462a126";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
   const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      // Fetch current weather
      const weatherResponse = await fetch(`${apiUrl}${city}&appid=${apikey}`);
      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);

      // Fetch forecast
      const forecastResponse = await fetch(`${forecastUrl}${city}&appid=${apikey}`);
      if (!forecastResponse.ok) {
        throw new Error("Forecast not available");
      }
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult);

      toast({
        title: "Weather Updated",
        description: `Weather data for ${city} loaded successfully`,
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
    // Load default weather for Kathmandu
    fetchWeather("Kathmandu");
  }, []);

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
      setSearchCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Get daily forecasts (filter to get one per day)
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
    
    return dailyForecasts.slice(1); // Skip today, show next 4 days
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 shadow-[var(--shadow-medium)]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Krishi Link Weather</h1>
          <p className="text-primary-foreground/80">Agricultural Weather & Market Information</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search Section */}
        <div className="p-6 bg-gradient-to-r from-card to-muted border shadow-[var(--shadow-soft)]">
          <div className="flex gap-4 items-center">
            <MapPin className="w-6 h-6 text-primary" />
            <div className="flex-1 flex gap-2">
              <input
                placeholder="Search for a city..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              
              <button onClick={handleSearch} disabled={loading} className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Current Weather */}
        {weatherData && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Current Weather
            </h2>
            <div className="p-6 rounded-2xl shadow bg-card border">
      <h3 className="text-xl font-semibold mb-2">{weatherData.name}</h3>
      <p className="text-4xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
      <p className="text-muted-foreground capitalize">{weatherData.weather[0].description}</p>
      <div className="flex gap-6 mt-4 text-sm">
        <span>💧 Humidity: {weatherData.main.humidity}%</span>
        <span>🌬️ Wind: {weatherData.wind.speed} m/s</span>
      </div>
      </div>
          </div>
        )}

        {/* 4-Day Forecast */}
        {forecastData && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              4-Day Forecast
            </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {getDailyForecasts().map((forecast, index) => (
        <div
          key={index}
          className="p-4 rounded-2xl shadow bg-card border flex flex-col items-center"
        >
          <p className="font-semibold">
            {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-2xl font-bold mt-2">{Math.round(forecast.main.temp)}°C</p>
          <p className="text-muted-foreground capitalize">{forecast.weather[0].description}</p>
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
