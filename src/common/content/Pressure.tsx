import { Progress, Typography } from "antd";
import React from "react";
const { Text, Title } = Typography;
export const PressureDisplay: React.FC<{ pressure: number }> = ({
  pressure,
}) => {
  const normalPressure = 1013.25; // standard atmospheric pressure
  const deviation = ((pressure - normalPressure) / normalPressure) * 100;

  return (
    <div style={{ textAlign: "center", padding: "0 20px" }}>
      <Title level={2} style={{ margin: "0" }}>
        {pressure} hPa
      </Title>
      <Progress
        percent={50 + deviation}
        status={pressure < normalPressure ? "exception" : "active"}
        strokeColor={{
          from: "#108ee9",
          to: "#87d068",
        }}
        showInfo={false}
      />
      <Text type="secondary">
        {pressure > normalPressure ? "High" : "Low"} Pressure System
      </Text>
    </div>
  );
};
