const API_KEY = "2f2655c40746a4cfe91d6c0ac3a8fea3"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city) => {
  try {
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!weatherResponse.ok) {
      throw new Error("City not found");
    }
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );
    const forecastData = await forecastResponse.json();

    return {
      current: weatherData,
      forecast: forecastData,
    };
  } catch (error) {
    console.error("Помилка при отриманні погоди:", error);
    throw error;
  }
};
