import React from "react";
import { Link } from "react-router-dom";
import AirQualityWidget from "../components/AirQualityWidget";
import MainWeather from "../components/MainWeather";
import SearchSidebar from "../components/SearchSidebar";

function WeatherDashboard({
  weatherData,
  error,
  activeTab,
  setActiveTab,
  handleSearch,
  pollution,
}) {
  return (
    <>
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500/80 backdrop-blur-md p-3 rounded-xl text-center text-sm font-semibold z-50 animate-bounce">
          {error}
        </div>
      )}

      {/* 🎛️ Наш контейнер тепер знову має класи флексів, щоб кнопка і віджет стояли в один ряд */}
      <div className="absolute top-6 left-6 md:left-12 z-40 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Link
          to="/map"
          className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 backdrop-blur-md px-5 py-3 xl:px-6 xl:py-4 rounded-2xl text-xs xl:text-sm uppercase tracking-widest font-medium text-slate-200 hover:text-white transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_0_rgba(250,204,21,0.1)] hover:-translate-y-0.5"
        >
          <svg
            className="w-4 h-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>

          <span className="opacity-90 group-hover:opacity-100 transition-opacity">
            Live Radar
          </span>
        </Link>

        <AirQualityWidget pollution={pollution} setActiveTab={setActiveTab} />
      </div>

      <MainWeather current={weatherData?.current} />

      <SearchSidebar
        current={weatherData?.current}
        forecast={weatherData?.forecast}
        onSearch={handleSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
}

export default WeatherDashboard;
