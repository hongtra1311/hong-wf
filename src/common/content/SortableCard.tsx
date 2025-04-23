import React from "react";
import { Col, Card, Typography, Space } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { WindDisplay } from "./Wind";
import { TemperatureDisplay } from "./Temperature";
import { HumidityDisplay } from "./Humidity";
import { PressureDisplay } from "./Pressure";
import WidgetHours from "./WidgetHours";
import WidgetDays from "./WidgetDays";

const { Text, Title } = Typography;

type WidgetType =
  | "basic"
  | "uvIndex"
  | "wind"
  | "temperature"
  | "humidity"
  | "pressure"
  | "nextHours"
  | "nextDays"
  | "sunrise"
  | "sunset"
  | "uvIndex"
  | "visibility"
  | "cloudiness";

export interface WeatherCardProps {
  id: string;
  title?: string;
  icon?: React.ReactNode;
  value: string | number;
  description: string;
  size?: "normal" | "double" | "full";
  type: WidgetType;
  data?: any;
}

export const SortableCard: React.FC<WeatherCardProps> = ({
  id,
  title,
  icon,
  value,
  description,
  size = "normal",
  type,
  data,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: () => false, // Prevent layout shift during drag
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    zIndex: isDragging ? 1000 : 1,
    touchAction: "none", // Important for mobile drag
    position: "relative" as const,
    opacity: isDragging ? 0.5 : 1,
  };

  const getColSpan = () => {
    switch (size) {
      case "double":
        return { xs: 24, sm: 24, lg: 12 };
      case "full":
        return { xs: 24, sm: 24, lg: 24 };
      default:
        return { xs: 12, sm: 12, lg: 6 };
    }
  };

  const renderContent = () => {
    switch (type) {
      case "wind":
        return <WindDisplay speed={data.speed} deg={data.deg} />;
      case "temperature":
        return (
          <TemperatureDisplay temp={data.temp} feels_like={data.feels_like} />
        );
      case "humidity":
        return <HumidityDisplay humidity={data.humidity} />;
      case "pressure":
        return <PressureDisplay pressure={data.pressure} />;
      case "nextHours":
        return <WidgetHours hoursWeather={data} />;
      case "nextDays":
        return <WidgetDays daysWeather={data} />;
      default:
        return (
          <div style={{ textAlign: "center" }}>
            <Title
              level={2}
              style={{ margin: "0", color: "hsl(223.41deg 62.44% 38.63%)" }}
            >
              {value}
            </Title>
            <Text type="secondary">{description}</Text>
          </div>
        );
    }
  };

  return (
    <Col {...getColSpan()}>
      <div ref={setNodeRef} style={style} {...attributes}>
        <Card
          style={{
            height: size === "full" ? "auto" : "190px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Space>
              {icon}
              <Text strong>{title}</Text>
            </Space>
            <DragOutlined
              {...listeners}
              style={{ cursor: "grab", color: "#1890ff" }}
            />
          </div>
          <div>{renderContent()}</div>
        </Card>
      </div>
    </Col>
  );
};
