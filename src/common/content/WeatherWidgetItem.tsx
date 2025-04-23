import React from "react";
import { Col, Card, Typography, Space } from "antd";

import { Widget } from "../../types/widget";

const { Text, Title } = Typography;

interface WeatherWidgetItemProps {
  // detail of a widget
  weatherWidgetItem: Widget;
  //lg
  lg?: number;
}

export const WeatherWidgetItem: React.FC<WeatherWidgetItemProps> = ({
  weatherWidgetItem,
  lg = 6,
}) => {
  return (
    <Col xs={24} sm={12} lg={lg}>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }} size="small">
          <Space>
            {weatherWidgetItem.icon}
            <Text strong>{weatherWidgetItem.title}</Text>
          </Space>
          <Title level={2} style={{ margin: "8px 0" }}>
            {weatherWidgetItem.value}
          </Title>
          <Text type="secondary">{weatherWidgetItem.description}</Text>
        </Space>
      </Card>
    </Col>
  );
};
