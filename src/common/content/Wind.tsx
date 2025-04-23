import { CompassOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
const { Text, Title } = Typography;

export const WindDisplay: React.FC<{ speed: number; deg: number }> = ({
  speed,
  deg,
}) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        transform: `rotate(${deg}deg)`,
        transition: "transform 0.3s ease",
        marginBottom: "16px",
      }}
    >
      <CompassOutlined style={{ fontSize: 40, color: "#1890ff" }} />
    </div>
    <Title level={3} style={{ margin: "0" }}>
      {speed} m/s
    </Title>
    <Text type="secondary">{deg}°</Text>
  </div>
);
