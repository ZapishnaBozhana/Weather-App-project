import React, { useState } from "react";

function SearchSidebar({ current, forecast, onSearch }) {
  const [inputValue, setInputValue] = useState("");

  if (!current) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue("");
    }
  };

  const hourlyForecast = forecast ? forecast.list.slice(0, 4) : [];

  return (
    <div className="w-full md:w-[450px] bg-white/10 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/20 p-6 md:p-8 flex flex-col justify-between min-h-screen">
      <div>
        {}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center border-b border-white/30 pb-2 focus-within:border-white"
        >
          <input
            type="text"
            placeholder="Search Location..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none text-white placeholder-slate-300 focus:outline-none w-full pr-8 text-sm md:text-base"
          />
          <button
            type="submit"
            className="absolute right-0 cursor-pointer text-lg focus:outline-none"
          >
            🔍
          </button>
        </form>

        {}
        <div className="mt-8 md:mt-12">
          <h3 className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-6">
            Weather Details...
          </h3>
          <p className="text-sm uppercase text-yellow-300 mb-6 font-medium tracking-wide">
            {current.weather[0].description}
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Temp max</span>
              <span>{Math.round(current.main.temp_max)}° 🌡️</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Temp min</span>
              <span>{Math.round(current.main.temp_min)}° 🥶</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Humidity</span>
              <span>{current.main.humidity}% 💧</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Cloudy</span>
              <span>{current.clouds.all}% ☁️</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Wind</span>
              <span>{Math.round(current.wind.speed * 3.6)} km/h 💨</span>{" "}
              {}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="mt-8 border-t border-white/20 pt-6">
        <h3 className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-4">
          Upcoming Forecast...
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {hourlyForecast.map((item, index) => {
            const time = item.dt_txt.split(" ")[1].substring(0, 5); 
            const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            return (
              <div
                key={index}
                className="bg-white/5 p-3 rounded-xl min-w-[85px] text-center border border-white/10 flex flex-col items-center"
              >
                <p className="text-xs text-slate-300">{time}</p>
                <img
                  src={icon}
                  alt="forecast-icon"
                  className="w-10 h-10 my-1"
                />
                <p className="text-sm font-semibold">
                  {Math.round(item.main.temp)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchSidebar;
