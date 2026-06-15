import React, { useState, useEffect } from "react";
import MainWeather from "./components/MainWeather";
import SearchSidebar from "./components/SearchSidebar";
import { fetchWeatherData } from "./services/WeatherService";

function App() {
  const [city, setCity] = useState("Kyiv"); // Місто за замовчуванням
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для отримання даних
  const getWeatherData = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(searchCity);
      setWeatherData(data);
    } catch (err) {
      setError("Місто не знайдено або сталася помилка!");
    } finally {
      setLoading(false);
    }
  };

  // Завантажуємо погоду для початкового міста при старті додатку
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row antialiased overflow-x-hidden">
      {/* Якщо є помилка, покажемо її тонкою плашкою зверху */}
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500/80 backdrop-blur-md p-3 rounded-xl text-center text-sm font-semibold z-50">
          {error}
        </div>
      )}

      {/* Передаємо поточні дані в лівий блок */}
      <MainWeather current={weatherData?.current} />

      {/* Передаємо дані та функцію пошуку в правий блок */}
      <SearchSidebar
        current={weatherData?.current}
        forecast={weatherData?.forecast}
        onSearch={handleSearch}
      />
    </div>
  );
}

export default App;
