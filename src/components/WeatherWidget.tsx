/** @jsxImportSource @emotion/react */
import React from "react";
import { FullWeatherData } from "../types/weather";
import { WidgetComposite } from "../common/content/WidgetComposite";
import { CityCoordinates } from "../types/widget";
import { Typography } from "antd";
const { Title } = Typography;
interface WeatherWidgetProps {
  fullWeather: FullWeatherData | null;
  location: CityCoordinates;
}
import { css } from "@emotion/react";
const widgetStyles = css({
  marginLeft: "15%",
  marginRight: "15%",
  "@media (max-width: 768px)": {
    marginLeft: "0",
    marginRight: "0",
  },
});

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  fullWeather,
  location,
}) => {
  if (!fullWeather) return null;

  return (
    <div css={widgetStyles}>
      <Title
        level={4}
        style={{ textAlign: "center", marginBottom: 24, color: "#fff" }}
      >
        Current Weather in {location.city}
      </Title>
      <WidgetComposite data={fullWeather} />
    </div>
  );
};
