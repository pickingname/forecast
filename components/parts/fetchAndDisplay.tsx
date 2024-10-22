"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CircleGauge,
  CloudRain,
  Droplets,
  Gauge,
  MoveUp,
  Snowflake,
  TrendingUp,
  Wind,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  LineProps,
  Label,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function FetchAndDisplayData() {
  const [data, setData] = useState(null);
  interface HourlyData {
    time: string[];
    precipitation: number[];
    temperature_2m: number[];
    apparent_temperature: number[];
    wind_speed_10m: number[];
    wind_gusts_10m: number[];
    cloud_cover: number[];
    cloud_cover_low: number[];
    cloud_cover_mid: number[];
    cloud_cover_high: number[];
    relative_humidity_2m: number[];
    dew_point_2m: number[];
    surface_pressure: number[];
    visibility: number[];
  }

  const [hourlyData, setHourlyData] = useState<HourlyData | null>(null);
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
    is_day: "",
  });
  const [currentWeatherStatus, setCurrentWeatherStatus] = useState("");
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState("");

  setTimeout(() => {
    document
      .getElementById("top-overview-component")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);

  const fetchData = () => {
    const userLat = localStorage.getItem("userLat") || "";
    const userLon = localStorage.getItem("userLon") || "";

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
            is_day: current.is_day,
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

          // fetch hourly data which will be used for the chart
          return axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${userLat}&longitude=${userLon}&hourly=precipitation,temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,relative_humidity_2m,dew_point_2m,surface_pressure,visibility&timezone=auto&forecast_days=3`
          );
        })
        .then((response) => {
          setHourlyData(response.data.hourly);
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
      const userLat = localStorage.getItem("userLat") || "";
      const userLon = localStorage.getItem("userLon") || "";

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

  const chartData =
    hourlyData?.time.map((time: string, index: number) => {
      const date = new Date(time);
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      const formattedDate = `${formattedTime} ${day}/${month}/${year}`;

      return {
        time: formattedDate,
        precipitation: hourlyData.precipitation[index],
        temperature: hourlyData.temperature_2m[index],
        feels_like: hourlyData.apparent_temperature[index],
        wind_speed: hourlyData.wind_speed_10m[index],
        wind_gusts: hourlyData.wind_gusts_10m[index],
        cloud_cover: hourlyData.cloud_cover[index],
        cloud_cover_low: hourlyData.cloud_cover_low[index],
        cloud_cover_mid: hourlyData.cloud_cover_mid[index],
        cloud_cover_high: hourlyData.cloud_cover_high[index],
        relative_humidity: hourlyData.relative_humidity_2m[index],
        dew_point: hourlyData.dew_point_2m[index],
        surface_pressure: hourlyData.surface_pressure[index],
        visibility: hourlyData.visibility[index],
      };
    }) || [];

  return (
    <div className="pt-5">
      <Button variant="outline" onClick={fetchData}>
        Fetch data
      </Button>
      {/* {isLocationInvalid && <p className="text-red-600">Invalid location</p>} */}
      {/* <pre>{data ? JSON.stringify(data, null, 2) : "..."}</pre> */}
      {data && (
        <>
          <p className="text-xl pt-5">Fetched result</p>
          <p className="text-neutral-600 pb-2">Last updated: {forecast.time}</p>
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
          <Card className="w-full font-outfit mt-4" id="precip-forecast-chart">
            <CardHeader>
              <CardTitle className="font-normal tracking-normal">
                Precipitation forecast in Millimeters
              </CardTitle>
              <CardDescription>
                The chart displays precipitation data on both rain and snow,
                hover over it to view the complete date and time.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="time"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />

                  <Tooltip cursor={true} content={<ChartTooltipContent />} />

                  <Line
                    dataKey="precipitation"
                    type="linear"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="w-full font-outfit mt-4" id="temp-forecast-chart">
            <CardHeader>
              <CardTitle className="font-normal tracking-normal">
                Temperature and Apparent temperature forecast in Celsius
              </CardTitle>
              <CardDescription>
                Apparent temperature is the temperature that the human body
                feels when the effects of temperature, wind speed, and humidity
                are combined. This is also called &quot;Feels like&quot;. Hover over the
                chart to view the complete date and time.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="time"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />

                  <Tooltip cursor={true} content={<ChartTooltipContent />} />

                  <Line
                    dataKey="temperature"
                    type="linear"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    dataKey="feels_like"
                    type="linear"
                    stroke="#ff0000"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="w-full font-outfit mt-4" id="wind-forecast-chart">
            <CardHeader>
              <CardTitle className="font-normal tracking-normal">
                Wind speed and Wind gusts forecast in Kilometers per hour
              </CardTitle>
              <CardDescription>
                Wind gusts are sudden, brief increases in wind speed that are
                usually associated with thunderstorms, cold fronts, and other
                weather events. Hover over the chart to view the complete date
                and time.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="time"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />

                  <Tooltip cursor={true} content={<ChartTooltipContent />} />

                  <Line
                    dataKey="wind_speed"
                    type="linear"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    dataKey="wind_gusts"
                    type="linear"
                    stroke="#1e40af"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="w-full font-outfit mt-4" id="cloud-forecast-chart">
            <CardHeader>
              <CardTitle className="font-normal tracking-normal">
                Cloud cover forecast in percentage
              </CardTitle>
              <CardDescription>
                Cloud cover is the fraction of the sky obscured by clouds when
                observed from a particular location. Hover over the chart to
                view the complete date and time.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="time"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />

                  <Tooltip cursor={true} content={<ChartTooltipContent />} />

                  <Line
                    dataKey="cloud_cover"
                    type="linear"
                    stroke="#57534e"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    dataKey="cloud_cover_low"
                    type="linear"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    dataKey="cloud_cover_mid"
                    type="linear"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={true}
                  />
                  <Line
                    dataKey="cloud_cover_high"
                    type="linear"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="w-full font-outfit mt-4" id="visibility-forecast-chart">
            <CardHeader>
              <CardTitle className="font-normal tracking-normal">
                Visibility forecast in Meters
              </CardTitle>
              <CardDescription>
                Visibility is a measure of the distance at which an object or
                light can be clearly discerned. Hover over the chart to view the
                complete date and time.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="time"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />

                  <Tooltip cursor={true} content={<ChartTooltipContent />} />

                  <Line
                    dataKey="visibility"
                    type="linear"
                    stroke="#57534e"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
