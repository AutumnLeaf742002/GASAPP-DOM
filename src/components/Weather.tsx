import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'ca029841ec21e126c665db5dfb363ef7';

const Weather: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [recommendation, setRecommendation] = useState<string>('');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        });
      } else {
        console.error('Geolocalización no es soportada por este navegador.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
          );
          setWeather(response.data);
          makeRecommendation(response.data);
        } catch (error) {
          console.error('Error al obtener el clima:', error);
        }
      }
    };

    fetchWeather();
  }, [location]);

  const makeRecommendation = (data: any) => {
    const temp = data.main.temp;
    const rain = data.weather.some((condition: any) => condition.main === 'Rain');
    const humidity = data.main.humidity;

    if (rain) {
      setRecommendation('Lleva paraguas, hay probabilidad de lluvia.');
    } else if (temp > 30) {
      setRecommendation('Usa protector solar, hace mucho calor.');
    } else if (humidity > 70) {
      setRecommendation('Toma mucha agua, la humedad es alta.');
    } else {
      setRecommendation('El clima está agradable, disfruta tu día.');
    }
  };

  return (
    <div className="weather-container">
           <h2 className="weather-title">Clima Actual</h2>
      {weather ? (
        <div className="weather-info">
          <p>Ubicación: {weather.name}</p>
          <p>Temperatura: {weather.main.temp} °C</p>
          <p>Humedad: {weather.main.humidity}%</p>
          <p>Condiciones: {weather.weather[0].description}</p>
          <p><strong>Recomendación:</strong> {recommendation}</p>
        </div>
      ) : (
        <p>Cargando clima...</p>
      )}
    </div>
  );
};

export default Weather;
