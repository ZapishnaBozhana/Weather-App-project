import React from 'react';

// Приймаємо setActiveTab у пропси компонента
function AirQualityWidget({ pollution, setActiveTab }) {
  let aqi = 1; 

  if (pollution && pollution.main?.aqi) {
    aqi = pollution.main.aqi;
  }
  
  const config = {
    1: { label: "", color: "text-green-400", desc: "Повітря чисте 🍃" },
    2: { label: "", color: "text-yellow-300", desc: "Помірне повітря 🌤️" },
    3: { label: "", color: "text-orange-400", desc: "Легке забруднення 😷" },
    4: { label: "", color: "text-red-400", desc: "Зачиніть вікна! 🛑" },
    5: { label: "", color: "text-purple-400", desc: "Рівень смогу критичний ⚠️" }
  };

  const currentAqi = config[aqi];

  return (
    // Перетворили div на button, додали onClick, курсор-вказівник та ефект легкого збільшення при наведенні
    <button 
      onClick={() => setActiveTab && setActiveTab('air')}
      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 backdrop-blur-md px-5 py-3 rounded-2xl text-xs uppercase tracking-widest font-medium select-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] animate-fadeIn cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
    >
      <svg 
        className={`w-4 h-4 ${currentAqi.color} filter drop-shadow-[0_0_4px_currentColor]`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      <div className="flex flex-col sm:flex-row sm:gap-2 text-left">
        <span className={`${currentAqi.color} font-semibold`}>{currentAqi.label}</span>
        <span className="text-[10px] text-slate-400 lowercase normal-case tracking-normal hidden sm:inline">|</span>
        <span className="text-slate-300 font-light lowercase normal-case tracking-normal">{currentAqi.desc}</span>
      </div>
    </button>
  );
}

export default AirQualityWidget;