import React from "react";
import MainWeather from "./components/MainWeather";
import SearchSidebar from "./components/SearchSidebar";

function App() {
  return (
    // Задаємо фонове зображення з макету (поки що градієнт-заглушка, на Кроці 4 зробимо картинку)
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row antialiased overflow-x-hidden">
      {/* Ліва/Верхня частина — Головна погода */}
      <MainWeather />

      {/* Права/Нижня частина — Пошук та деталі */}
      <SearchSidebar />
    </div>
  );
}

export default App;
