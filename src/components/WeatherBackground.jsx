import React from "react";

function WeatherBackground({ id, children }) {
  let backgroundImage = "";

  //Гроза
  if (id >= 200 && id < 300) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1594760467013-64ac2b80b7d3?q=75&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  }
  // Мряка
  else if ((id >= 300 && id < 400) || id === 500 || id === 501) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1428592953211-077101b2021b?q=75&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  }
  // Злива
  else if (id >= 502 && id < 600) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1496034663057-6245f11be793?q=75&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  }
  // Сніг
  else if (id >= 600 && id < 700) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1468476775582-6bede20f356f?q=75&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  }
  // Туман
  else if (id >= 700 && id < 800) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=75&w=1200&auto=format&fit=crop')";
  }
  // Чисте сонце
  else if (id === 800) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1598965914211-6ec6872593a6?q=75&w=1200&auto=format&fit=crop')";
  }
  // Легка хмарність
  else if (id === 801 || id === 802) {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1592204162921-d583dbd84709?q=75&w=1200&auto=format&fit=crop')";
  }
  //Похмуро
  else {
    backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1614959909713-128c622fad23?q=75&w=1200&auto=format&fit=crop')";
  }

  return (
    <div
      style={{ backgroundImage }}
      className="min-h-screen w-full text-white flex flex-col md:flex-row antialiased overflow-x-hidden bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
    >
      {children}
    </div>
  );
}

export default WeatherBackground;
