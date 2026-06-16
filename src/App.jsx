import React, { useState, useEffect } from "react";
import MainWeather from "./components/MainWeather";
import SearchSidebar from "./components/SearchSidebar";
import WeatherBackground from "./components/WeatherBackground";
import { fetchWeatherData } from "./services/WeatherService";

function App() {
  const [city, setCity] = useState("Kyiv");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeatherData = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(searchCity);
      setWeatherData(data);
    } catch (err) {
      setError("'City not found. Try again!'");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData(city);
  }, []);

  const handleSearch = (newCity) => {
    setCity(newCity);
    getWeatherData(newCity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mr-3"></div>
        Завантаження погоди...
      </div>
    );
  }

  return (
    <WeatherBackground id={weatherData?.current?.weather[0]?.id}>
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500/80 backdrop-blur-md p-3 rounded-xl text-center text-sm font-semibold z-50 animate-bounce">
          {error}
        </div>
      )}
      <MainWeather current={weatherData?.current} />
      <SearchSidebar
        current={weatherData?.current}
        forecast={weatherData?.forecast}
        onSearch={handleSearch}
      />
    </WeatherBackground>
  );
}

export default App;
