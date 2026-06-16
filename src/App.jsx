import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./pages/WeatherDashboard";
import MapPage from "./pages/MapPage";
import WeatherBackground from "./components/WeatherBackground";
import { fetchWeatherData } from "./services/WeatherService";

function App() {
  const [city, setCity] = useState("Kyiv");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("today");

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
        Loading weather workspace...
      </div>
    );
  }
  return (
    <BrowserRouter>
      {}
      <WeatherBackground id={weatherData?.current?.weather[0]?.id}>
        <Routes>
          {}
          <Route
            path="/"
            element={
              <WeatherDashboard
                weatherData={weatherData}
                error={error}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleSearch={handleSearch}
              />
            }
          />

          {}
          <Route
            path="/map"
            element={<MapPage current={weatherData?.current} />}
          />
        </Routes>
      </WeatherBackground>
    </BrowserRouter>
  );
}

export default App;
