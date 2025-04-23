import { Typography } from "antd";
import React from "react";
const { Text, Title } = Typography;

export const TemperatureDisplay: React.FC<{
  temp: number;
  feels_like: number;
}> = ({ temp, feels_like }) => (
  <div style={{ textAlign: "center" }}>
    <Title
      level={1}
      style={{ margin: "0", color: temp > 25 ? "#ff4d4f" : "#1890ff" }}
    >
      {Math.round(temp)}°C
    </Title>
    <Text type="secondary">Feels like: {Math.round(feels_like)}°C</Text>
  </div>
);
