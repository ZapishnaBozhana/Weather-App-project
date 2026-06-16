import React, { useState } from "react";

function SearchSidebar({
  current,
  forecast,
  onSearch,
  activeTab,
  setActiveTab,
}) {
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
  const dailyForecast = forecast
    ? forecast.list.filter((item) => item.dt_txt.includes("12:00:00"))
    : [];

  return (
    <div className="w-full md:w-[460px] bg-black/20 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10 p-6 md:p-8 flex flex-col justify-between min-h-screen shadow-2xl transition-all duration-300">
      <div>
        {}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center border-b border-white/20 pb-2 focus-within:border-white transition-colors"
        >
          <input
            type="text"
            placeholder="Search Location..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none text-white placeholder-slate-300 focus:outline-none w-full pr-8 text-sm md:text-base font-light"
          />
          <button
            type="submit"
            className="absolute right-0 cursor-pointer text-slate-300 hover:text-white transition-colors"
          >
            🔍
          </button>
        </form>

        {}
        <div className="flex justify-between border-b border-white/10 mt-6 text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("today")}
            className={`pb-2 flex-1 font-medium transition-all ${activeTab === "today" ? "text-yellow-400 border-b-2 border-yellow-400 font-semibold" : "text-slate-400 hover:text-white"}`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab("5day")}
            className={`pb-2 flex-1 font-medium transition-all ${activeTab === "5day" ? "text-yellow-400 border-b-2 border-yellow-400 font-semibold" : "text-slate-400 hover:text-white"}`}
          >
            5-Day
          </button>
          <button
            onClick={() => setActiveTab("air")}
            className={`pb-2 flex-1 font-medium transition-all ${activeTab === "air" ? "text-yellow-400 border-b-2 border-yellow-400 font-semibold" : "text-slate-400 hover:text-white"}`}
          >
            Details +
          </button>
        </div>

        {}
        {activeTab === "today" && (
          <div className="mt-6 animate-fadeIn">
            <h3 className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Weather Details...
            </h3>
            <p className="text-sm uppercase text-yellow-300 mb-4 font-medium tracking-wide">
              {current.weather[0].description}
            </p>
            <div className="space-y-3 text-sm font-light">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-300">Temp max</span>
                <span>{Math.round(current.main.temp_max)}° 🌡️</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-300">Temp min</span>
                <span>{Math.round(current.main.temp_min)}° 🥶</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-300">Humidity</span>
                <span>{current.main.humidity}% 💧</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-300">Cloudy</span>
                <span>{current.clouds.all}% ☁️</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Wind</span>
                <span>{Math.round(current.wind.speed * 3.6)} km/h 💨</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "5day" && (
          <div className="mt-6 animate-fadeIn space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-2">
              5-Day Forecast (12:00)
            </h3>
            {dailyForecast.map((item, index) => {
              const date = new Date(item.dt * 1000).toLocaleDateString(
                "en-US",
                { weekday: "short", day: "numeric", month: "short" },
              );
              const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10 backdrop-blur-sm"
                >
                  <span className="text-sm font-light w-24">{date}</span>
                  <img src={icon} alt="icon" className="w-8 h-8" />
                  <span className="text-xs uppercase text-slate-300 flex-1 px-2 text-left truncate">
                    {item.weather[0].main}
                  </span>
                  <span className="text-sm font-semibold">
                    {Math.round(item.main.temp)}°
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "air" && (
          <div className="mt-6 animate-fadeIn">
            <h3 className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Advanced Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                <p className="text-xs text-slate-300">Pressure</p>
                <p className="text-lg font-semibold mt-1">
                  {current.main.pressure} hPa
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                <p className="text-xs text-slate-300">Visibility</p>
                <p className="text-lg font-semibold mt-1">
                  {(current.visibility / 1000).toFixed(1)} km
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                <p className="text-xs text-slate-300">Sunrise</p>
                <p className="text-base font-semibold mt-1">
                  {new Date(current.sys.sunrise * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  🌅
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                <p className="text-xs text-slate-300">Sunset</p>
                <p className="text-base font-semibold mt-1">
                  {new Date(current.sys.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  🌇
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {}
      <div className="mt-8 border-t border-white/10 pt-4">
        <h3 className="text-xs uppercase tracking-widest text-slate-300 font-medium mb-3">
          Hourly Timeline
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {hourlyForecast.map((item, index) => {
            const time = item.dt_txt.split(" ")[1].substring(0, 5);
            const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            return (
              <div
                key={index}
                className="bg-white/5 p-2.5 rounded-xl min-w-[80px] text-center border border-white/10 flex flex-col items-center backdrop-blur-sm"
              >
                <p className="text-[10px] text-slate-300 font-light">{time}</p>
                <img src={icon} alt="icon" className="w-8 h-8 my-0.5" />
                <p className="text-xs font-semibold">
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
