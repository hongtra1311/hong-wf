import React from "react";
import { Col, Typography, Space } from "antd";
import { HourlyWeather } from "../../types/weather";
import WeatherIcon from "./WeatherIcon";
import { getHourFromTimestamp } from "../../util/convert";
const { Text } = Typography;
interface WidgetHoursProps {
  hourWeather: HourlyWeather;
  currentTime: string;
}

const HourWeather: React.FC<WidgetHoursProps> = ({
  hourWeather,
  currentTime,
}) => {
  const hour = getHourFromTimestamp(hourWeather.dt);
  const renderHourly = (
    <Space direction="vertical" align="center" style={{ width: "100%" }}>
      <Text>{hour === currentTime ? "Now" : hour}</Text>
      <WeatherIcon main={hourWeather.weather[0].main} />
      <Text>{Math.round(hourWeather.temp)}°</Text>
    </Space>
  );
  const isMobile = window.innerWidth <= 500; // Adjust this value as needed
  return (
    <>
      {isMobile ? (
        <Col span={4} xs={24} sm={6} lg={4} style={{ textAlign: "center" }}>
          {renderHourly}
        </Col>
      ) : (
        <Col span={2} style={{ textAlign: "center" }}>
          {renderHourly}
        </Col>
      )}
    </>
  );
};

export default HourWeather;
