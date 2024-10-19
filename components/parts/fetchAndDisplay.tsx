"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Cloud,
  CloudRain,
  Droplets,
  Gauge,
  Snowflake,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";

export default function FetchAndDisplayData() {
  const [data, setData] = useState(null);
  const [isLocationInvalid, setIsLocationInvalid] = useState(false);
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
    let userLat = localStorage.getItem("userLat") || "";
    let userLon = localStorage.getItem("userLon") || "";

    const isValidCoordinate = (coord: string) => {
      return coord && !isNaN(Number(coord)) && !/[a-zA-Z]/.test(coord);
    };

    if (isValidCoordinate(userLat) && isValidCoordinate(userLon)) {
      setIsLocationInvalid(false);

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
              currentWeatherStatus = "Drizzle: Light intensity";
              currentWeatherIcon = "🌧️";
              break;
            case 53:
              currentWeatherStatus = "Drizzle: Moderate intensity";
              currentWeatherIcon = "🌧️!";
              break;
            case 55:
              currentWeatherStatus = "Drizzle: Dense intensity";
              currentWeatherIcon = "🌧️!!";
              break;
            case 56:
              currentWeatherStatus = "Freezing Drizzle: Light intensity";
              currentWeatherIcon = "🌨️❄️";
              break;
            case 57:
              currentWeatherStatus = "Freezing Drizzle: Dense intensity";
              currentWeatherIcon = "🌨️❄️!!";
              break;
            case 61:
              currentWeatherStatus = "Rain: Slight intensity";
              currentWeatherIcon = "🌧️☔";
              break;
            case 63:
              currentWeatherStatus = "Rain: Moderate intensity";
              currentWeatherIcon = "🌧️☔!";
              break;
            case 65:
              currentWeatherStatus = "Rain: Heavy intensity";
              currentWeatherIcon = "🌧️☔!!";
              break;
            case 66:
              currentWeatherStatus = "Freezing Rain: Light intensity";
              currentWeatherIcon = "🌨️❄️☔";
              break;
            case 67:
              currentWeatherStatus = "Freezing Rain: Heavy intensity";
              currentWeatherIcon = "🌨️❄️☔!!";
              break;
            case 71:
              currentWeatherStatus = "Snow fall: Slight intensity";
              currentWeatherIcon = "🌨️";
              break;
            case 73:
              currentWeatherStatus = "Snow fall: Moderate intensity";
              currentWeatherIcon = "🌨️!";
              break;
            case 75:
              currentWeatherStatus = "Snow fall: Heavy intensity";
              currentWeatherIcon = "🌨️!!";
              break;
            case 77:
              currentWeatherStatus = "Snow grains";
              currentWeatherIcon = "🌨️?";
              break;
            case 80:
              currentWeatherStatus = "Rain showers: Slight intensity";
              currentWeatherIcon = "🌧️☔";
              break;
            case 81:
              currentWeatherStatus = "Rain showers: Moderate intensity";
              currentWeatherIcon = "🌧️☔!";
              break;
            case 82:
              currentWeatherStatus = "Rain showers: Violent intensity";
              currentWeatherIcon = "🌧️☔!!";
              break;
            case 85:
              currentWeatherStatus = "Snow showers: Slight intensity";
              currentWeatherIcon = "🌨️";
              break;
            case 86:
              currentWeatherStatus = "Snow showers: Heavy intensity";
              currentWeatherIcon = "🌨️!";
              break;
            case 95:
              currentWeatherStatus = "Slight to moderate thunderstorms";
              currentWeatherIcon = "⛈️";
              break;
            case 96:
              currentWeatherStatus = "Thunderstorm with slight hail";
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
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setIsLocationInvalid(true);
    }
  };

  useEffect(() => {
    const validateCoordinates = () => {
      let userLat = localStorage.getItem("userLat") || "";
      let userLon = localStorage.getItem("userLon") || "";

      const isValidCoordinate = (coord: string) => {
        return coord && !isNaN(Number(coord)) && !/[a-zA-Z]/.test(coord);
      };

      if (isValidCoordinate(userLat) && isValidCoordinate(userLon)) {
        setIsLocationInvalid(false);
      } else {
        setIsLocationInvalid(true);
      }
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
        Fetch forecast
      </Button>
      {isLocationInvalid && <p className="text-red-600">Invalid location</p>}
      <p className="text-xl pt-5 pb-3">Forecast result</p>
      {/* <pre>{data ? JSON.stringify(data, null, 2) : "..."}</pre> */}
      {data && (
        <>
          <div className="" id="top-overview-component">
            <div className="font-outfit flex flex-wrap items-center">
              <p className="mr-2 text-6xl pb-2">{currentWeatherIcon}</p>
              <div>
                <p>{currentWeatherStatus}</p>
                <p className="text-5xl">{forecast.temperature_2m}°C</p>
                <p>Feels like {forecast.apparent_temperature}°C</p>
              </div>
            </div>
          </div>

          <Card className="w-full font-outfit mt-4">
            <CardContent>
              <div className="grid grid-cols-2 gap-4 pt-5">
                <div className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5" />
                  <div>
                    <p className="">Humidity</p>
                    <p className="">{forecast.relative_humidity_2m}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5" />
                  <div>
                    <p className="">Precipitation</p>
                    <p className="">{forecast.precipitation} mm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-5 w-5" />
                  <div>
                    <p className="">Rain</p>
                    <p className="">{forecast.rain} mm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Snowflake className="h-5 w-5" />
                  <div>
                    <p className="">Snow</p>
                    <p className="">{forecast.snowfall} cm</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-20">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Forecast Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{forecast.time}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {forecast.temperature_2m}°C
                </div>
                <p className="text-xs text-muted-foreground">
                  Feels like {forecast.apparent_temperature}°C
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Relative Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {forecast.relative_humidity_2m}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Precipitation</CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {forecast.precipitation} mm
                </div>
                <p className="text-xs text-muted-foreground">
                  Rain: {forecast.rain} mm | Snow: {forecast.snowfall} cm
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Current Weather</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentWeatherStatus}</div>
                <p className="text-xs text-muted-foreground">
                  Cloud cover: {forecast.cloud_cover}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Pressure</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {forecast.surface_pressure} hPa
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="">Wind</CardTitle>
                <Wind className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {forecast.wind_speed_10m} km/h
                </div>
                <p className="text-xs text-muted-foreground">
                  Direction: {forecast.wind_direction_10m} <br /> Gusts:{" "}
                  {forecast.wind_gusts_10m} km/h
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
