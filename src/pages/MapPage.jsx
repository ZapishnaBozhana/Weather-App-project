import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ComponentResize() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const API_KEY = "2f2655c40746a4cfe91d6c0ac3a8fea3";

function MapPage({ current }) {
  const position = current
    ? [current.coord.lat, current.coord.lon]
    : [50.4501, 30.5234];
  const cityName = current ? current.name : "Kyiv";
  const [weatherLayer, setWeatherLayer] = useState("precipitation_new");

  return (
    <div className="h-screen w-full bg-slate-950 p-4 md:p-6 text-white flex flex-col animate-fadeIn font-sans overflow-hidden">
      {}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/10 backdrop-blur-md border border-white/10 p-4 mb-4 shadow-lg gap-4 shrink-0">
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="text-xl font-bold tracking-widest flex items-center gap-1 drop-shadow-md select-none">
            <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold ml-2">
              Radar
            </span>
          </div>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 text-xs uppercase tracking-wider font-light">
            <button
              onClick={() => setWeatherLayer("none")}
              className={`px-3 py-1.5 rounded-lg transition-all ${weatherLayer === "none" ? "bg-white/10 text-yellow-300 font-medium" : "text-slate-400 hover:text-white"}`}
            >
              Map Only
            </button>
            <button
              onClick={() => setWeatherLayer("precipitation_new")}
              className={`px-3 py-1.5 rounded-lg transition-all ${weatherLayer === "precipitation_new" ? "bg-white/10 text-yellow-300 font-medium" : "text-slate-400 hover:text-white"}`}
            >
              Rain
            </button>
            <button
              onClick={() => setWeatherLayer("clouds_new")}
              className={`px-3 py-1.5 rounded-lg transition-all ${weatherLayer === "clouds_new" ? "bg-white/10 text-yellow-300 font-medium" : "text-slate-400 hover:text-white"}`}
            >
              Clouds
            </button>
          </div>
        </div>

        <Link
          to="/"
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-sm font-light tracking-wide transition-all shadow-md uppercase text-slate-200 hover:text-white"
        >
          Back to main page
        </Link>
      </div>

      {}
      <div className="flex-1 overflow-hidden border border-white/10 shadow-2xl relative w-full mb-2">
        <MapContainer
          center={position}
          zoom={5}
          style={{ height: "100%", width: "100%", zIndex: 10 }}
        >
          {}
          <ComponentResize />

          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap &copy; CARTO"
          />

          {weatherLayer !== "none" && (
            <TileLayer
              key={weatherLayer}
              url={`https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
              opacity={0.95}
            />
          )}

          <Marker position={position}>
            <Popup>
              <div className="text-slate-900 p-2 font-sans min-w-[150px]">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">
                  Station Location
                </h3>
                <p className="text-base uppercase text-indigo-950 font-medium tracking-wide mb-2">
                  {cityName}
                </p>
                <div className="text-xs font-light text-slate-600 border-t border-slate-100 pt-1.5 flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-600 font-medium uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;
