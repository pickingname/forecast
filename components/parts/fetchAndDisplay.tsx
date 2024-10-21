"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CircleGauge,
  CloudRain,
  Droplets,
  Gauge,
  MoveUp,
  Snowflake,
  Wind,
} from "lucide-react";

export default function FetchAndDisplayData() {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState({
    time: "",
    temperature_2m: "",
    relative_humidity_2m: "",
    apparent_temperature: "",
    precipitation: "",
    rain: "",
    showers: "",
    snowfall: "",
    weather_code: "",
    cloud_cover: "",
    pressure_msl: "",
    surface_pressure: "",
    wind_speed_10m: "",
    wind_direction_10m: "",
    wind_gusts_10m: "",
  });
  const [currentWeatherStatus, setCurrentWeatherStatus] = useState("");
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("");

  const fetchData = () => {
    const userLat = localStorage.getItem("userLat") || "";
    const userLon = localStorage.getItem("userLon") || "";

    const isValidCoordinate = (coord: string) => {
      return coord && !isNaN(Number(coord)) && !/[a-zA-Z]/.test(coord);
    };

    if (isValidCoordinate(userLat) && isValidCoordinate(userLon)) {
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${userLat}&longitude=${userLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timeformat=unixtime`
        )
        .then((response) => {
          setData(response.data);
          const current = response.data.current;
          let currentWeatherStatus = "";
          let currentWeatherIcon = "";
          setForecast({
            time: new Date(current.time * 1000).toLocaleString(),
            temperature_2m: current.temperature_2m,
            relative_humidity_2m: current.relative_humidity_2m,
            apparent_temperature: current.apparent_temperature,
            precipitation: current.precipitation,
            rain: current.rain,
            showers: current.showers,
            snowfall: current.snowfall,
            weather_code: current.weather_code,
            cloud_cover: current.cloud_cover,
            pressure_msl: current.pressure_msl,
            surface_pressure: current.surface_pressure,
            wind_speed_10m: current.wind_speed_10m,
            wind_direction_10m: current.wind_direction_10m,
            wind_gusts_10m: current.wind_gusts_10m,
          });

          switch (current.weather_code) {
            case 0:
              currentWeatherStatus = "Clear sky";
              currentWeatherIcon = "☀️";
              break;
            case 1:
              currentWeatherStatus = "Mainly clear";
              currentWeatherIcon = "🌤️";
              break;
            case 2:
              currentWeatherStatus = "Partly cloudy";
              currentWeatherIcon = "🌥️";
              break;
            case 3:
              currentWeatherStatus = "Overcast";
              currentWeatherIcon = "☁️";
              break;
            case 45:
              currentWeatherStatus = "Fog";
              currentWeatherIcon = "🌫️";
              break;
            case 48:
              currentWeatherStatus = "Depositing rime fog";
              currentWeatherIcon = "🌫️";
              break;
            case 51:
              currentWeatherStatus = "Light drizzle";
              currentWeatherIcon = "🌧️";
              break;
            case 53:
              currentWeatherStatus = "Moderate drizzle";
              currentWeatherIcon = "🌧️!";
              break;
            case 55:
              currentWeatherStatus = "Dense drizzle";
              currentWeatherIcon = "🌧️!!";
              break;
            case 56:
              currentWeatherStatus = "Light freezing drizzle";
              currentWeatherIcon = "🌨️❄️";
              break;
            case 57:
              currentWeatherStatus = "Dense freezing drizzle";
              currentWeatherIcon = "🌨️❄️!!";
              break;
            case 61:
              currentWeatherStatus = "Light rain";
              currentWeatherIcon = "🌧️☔";
              break;
            case 63:
              currentWeatherStatus = "Moderate rain";
              currentWeatherIcon = "🌧️☔!";
              break;
            case 65:
              currentWeatherStatus = "Heavy rain";
              currentWeatherIcon = "🌧️☔!!";
              break;
            case 66:
              currentWeatherStatus = "Light freezing rain";
              currentWeatherIcon = "🌨️❄️☔";
              break;
            case 67:
              currentWeatherStatus = "Heavy freezing rain";
              currentWeatherIcon = "🌨️❄️☔!!";
              break;
            case 71:
              currentWeatherStatus = "Light snow fall";
              currentWeatherIcon = "🌨️";
              break;
            case 73:
              currentWeatherStatus = "Moderate snow fall";
              currentWeatherIcon = "🌨️!";
              break;
            case 75:
              currentWeatherStatus = "Heavy snow fall";
              currentWeatherIcon = "🌨️!!";
              break;
            case 77:
              currentWeatherStatus = "Snow grains";
              currentWeatherIcon = "🌨️?";
              break;
            case 80:
              currentWeatherStatus = "Light rain showers";
              currentWeatherIcon = "🌧️☔";
              break;
            case 81:
              currentWeatherStatus = "Moderate rain showers";
              currentWeatherIcon = "🌧️☔!";
              break;
            case 82:
              currentWeatherStatus = "Violent rain showers";
              currentWeatherIcon = "🌧️☔!!";
              break;
            case 85:
              currentWeatherStatus = "Light snow showers";
              currentWeatherIcon = "🌨️";
              break;
            case 86:
              currentWeatherStatus = "Heavy snow showers";
              currentWeatherIcon = "🌨️!";
              break;
            case 95:
              currentWeatherStatus = "Light to moderate thunderstorms";
              currentWeatherIcon = "⛈️";
              break;
            case 96:
              currentWeatherStatus = "Thunderstorm with light hail";
              currentWeatherIcon = "⛈️🌨️";
              break;
            case 99:
              currentWeatherStatus = "Thunderstorm with heavy hail";
              currentWeatherIcon = "⛈️🌨️!!";
              break;
            default:
              currentWeatherStatus = "Unknown weather code";
              currentWeatherIcon = "?";
              break;
          }

          setCurrentWeatherStatus(currentWeatherStatus);
          setCurrentWeatherIcon(currentWeatherIcon);

          setTimeout(() => {
            document
              .getElementById("wind")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  useEffect(() => {
  const validateCoordinates = () => {
    const userLat = localStorage.getItem("userLat") || "";
    const userLon = localStorage.getItem("userLon") || "";

    const isValidCoordinate = (coord: string) => {
      return coord && !isNaN(Number(coord)) && !/[a-zA-Z]/.test(coord);
    };
  };

  validateCoordinates();

  window.addEventListener("storage", validateCoordinates);

  return () => {
    window.removeEventListener("storage", validateCoordinates);
  };
}, []);

  return (
    <div className="pt-5">
      <Button variant="outline" onClick={fetchData}>
        Fetch data
      </Button>
      {/* <pre>{data ? JSON.stringify(data, null, 2) : "..."}</pre> */}
      {data && (
        <>
          <p className="text-xl pt-5 pb-2">Fetched result</p>
          <div id="top-overview-component">
            <div className="font-outfit flex flex-wrap items-center">
              <p className="mr-2 text-6xl pb-2">{currentWeatherIcon}</p>
              <div>
                <p className="text-neutral-600">
                  {currentWeatherStatus}, Cloud coverage: {forecast.cloud_cover}
                  %
                </p>
                <p className="text-5xl">{forecast.temperature_2m}°C</p>
                <p className="text-neutral-600">
                  Feels like {forecast.apparent_temperature}°C
                </p>
              </div>
            </div>
          </div>

          <Card className="w-full font-outfit mt-4" id="water">
            <CardContent>
              <div className="grid grid-cols-2 gap-4 pt-5">
                <div className="flex items-center space-x-4">
                  <Gauge className="h-8 w-8" />
                  <div>
                    <p>Humidity</p>
                    <p className="text-neutral-600">
                      {forecast.relative_humidity_2m}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 justify-end">
                  <Droplets className="h-8 w-8" />
                  <div className="w-24">
                    <p>Precipitation</p>
                    <p className="text-neutral-600">
                      {forecast.precipitation} mm
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CloudRain className="h-8 w-8" />
                  <div>
                    <p>Rain</p>
                    <p className="text-neutral-600">{forecast.rain} mm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 justify-end">
                  <Snowflake className="h-8 w-8" />
                  <div className="w-24">
                    <p>Snow</p>
                    <p className="text-neutral-600">{forecast.snowfall} cm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full font-outfit mt-4" id="wind">
            <CardContent>
              <div className="grid grid-cols-2 gap-4 pt-5">
                <div className="flex items-center space-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-windmill"
                  >
                    <path d="m10 14 8 4 2-4L4 6l2-4 8 4" />
                    <path d="m8 8-4 8 4 2" />
                    <path d="m16 12 4-8-4-2L6 22" />
                    <path d="m19 22-2.4-4.6" />
                    <path d="M12.5 20v2" />
                    <path d="M4 22h17" />
                  </svg>
                  <div>
                    <p>Wind Speed</p>
                    <p className="text-neutral-600">
                      {forecast.wind_speed_10m} km/h
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 justify-end">
                  <Wind className="h-8 w-8" />
                  <div className="w-24">
                    <p>Wind Gusts</p>
                    <p className="text-neutral-600">
                      {forecast.wind_gusts_10m} km/h
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MoveUp
                    className="h-8 w-8"
                    style={{
                      transform: `rotate(${forecast.wind_direction_10m}deg)`,
                    }}
                  />
                  <div>
                    <p>Wind Direction</p>
                    <p className="text-neutral-600">
                      {forecast.wind_direction_10m}°
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 justify-end">
                  <CircleGauge className="h-8 w-8" />
                  <div className="w-24">
                    <p>Pressure</p>
                    <p className="text-neutral-600">
                      {forecast.pressure_msl} hPa
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
