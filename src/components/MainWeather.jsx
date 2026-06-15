import React from 'react';

function MainWeather() {
  return (
    <div className="flex flex-col justify-between p-6 md:p-12 flex-1 min-h-[40vh] md:min-h-screen">
      {/* Лого */}
      <div className="text-2xl font-bold tracking-wider flex items-center gap-1">
        <span>W</span>
        <span className="text-yellow-400">⚡</span>
      </div>

      {}
      <div className="mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-7xl md:text-9xl font-light">16°</span>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-medium">London</h1>
            <p className="text-sm text-slate-300 mt-1">06:09 - Monday, 9 Sep '23</p>
          </div>
          {/*Значок погоди*/}
          <div className="ml-4 text-4xl md:text-6xl">☁️</div>
        </div>
      </div>
    </div>
  );
}

export default MainWeather;