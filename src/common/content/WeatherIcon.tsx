import React from "react";
import { Space } from "antd";

interface WeatherIconProps {
  main: string;
  className?: string;
}

function getWeatherIcon(main: string) {
  switch (main) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Snow":
      return "❄️";
    case "Thunderstorm":
      return "⛈️";
    default:
      return "🌡️";
  }
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  main,
  className = "custom-space",
}) => {
  return <Space className={className}>{getWeatherIcon(main)}</Space>;
};

export default WeatherIcon;
