import React from "react";

function MainWeather({ current }) {
  if (!current) return null;

  const formatDate = (timezone) => {
    const localTime = new Date(
      new Date().getTime() + timezone * 1000 - 3 * 3600 * 1000,
    );
    return localTime.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  };

  const temp = Math.round(current.main.temp);

  const iconCode = current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="flex flex-col justify-between p-6 md:p-12 xl:p-20 2xl:p-28 flex-1 min-h-[40vh] md:min-h-screen">
      <div className="text-2xl font-bold tracking-wider flex items-center gap-1">
        <span></span>
        <span className="text-yellow-400"></span>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-7xl md:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-extralight tracking-tighter leading-none">
            {temp}°
          </span>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-normal tracking-tight">
              {current.name}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              {formatDate(current.timezone)}
            </p>
          </div>

          <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center border border-white/10">
            <img
              src={iconUrl}
              alt={current.weather[0].description}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainWeather;
