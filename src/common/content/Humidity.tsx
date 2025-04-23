import { Progress } from "antd";
import React from "react";
export const HumidityDisplay: React.FC<{ humidity: number }> = ({
  humidity,
}) => (
  <div style={{ textAlign: "center" }}>
    <Progress
      type="circle"
      percent={humidity}
      format={(percent) => `${percent}%`}
      size={80}
      strokeColor={humidity > 70 ? "#ff4d4f" : "#1890ff"}
    />
  </div>
);
