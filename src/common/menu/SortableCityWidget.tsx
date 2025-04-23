import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CityWeatherWidget } from "../../types/widget";
import { FullWeatherData } from "../../types/weather";
import { cityCoordinates } from "../../mock/localApiMock";

const { Text } = Typography;

interface WidgetProps {
  widget: CityWeatherWidget;
  weatherData: FullWeatherData;
  isEditMode?: boolean;
  onDelete: (id: string) => void;
  onCardClick: () => void;
}

export const getCityByCoordinates = (
  lat: number,
  lon: number
): string | null => {
  const epsilon = 0.0001; // độ chính xác, có thể điều chỉnh tùy yêu cầu

  const city = cityCoordinates.find((item) => {
    return (
      Math.abs(item.lat - lat) < epsilon && Math.abs(item.lon - lon) < epsilon
    );
  });

  return city ? city.city : null;
};

export const SortableCityWidget: React.FC<WidgetProps> = ({
  widget,
  weatherData,
  isEditMode,
  onDelete,
  onCardClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, animateLayoutChanges: () => false });

  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //       transition,
  //     }
  //   : undefined;

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
  // Get local time (HH:mm)
  const getLocalTime = (dt: number, timezoneOffset: number): string => {
    const localTimestamp = (dt + timezoneOffset) * 1000;
    const localDate = new Date(localTimestamp);

    return localDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditMode) {
      e.stopPropagation();
      onCardClick();
    }
  };

  const renderWidgetContent = (weatherData: FullWeatherData) => {
    return (
      <Card
        ref={setNodeRef}
        style={{
          ...style,
          marginBottom: 16,
          backgroundColor: "hsl(223.41deg 62.44% 38.63%)",
          color: "white",
          cursor: "move",
        }}
        {...attributes}
        {...listeners}
        onClick={handleClick}
      >
        <Row gutter={16}>
          <Col span={16}>
            <div style={{ marginBottom: 8 }}>
              <Text strong style={{ color: "white", fontSize: "18px" }}>
                {getCityByCoordinates(weatherData.lat, weatherData.lon)}
              </Text>
            </div>
            <div style={{ marginBottom: 4 }}>
              <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                {getLocalTime(
                  weatherData.current.dt,
                  weatherData.timezone_offset
                )}
              </Text>
            </div>
            <div style={{ marginBottom: 8 }}>
              <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                {weatherData.current.weather[0].description}
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ marginTop: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {Math.round(weatherData.current.temp)}°C
                </Text>
              </div>
              <div>
                <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                  {Math.round(weatherData.daily[0].temp.min)}°C /{" "}
                  {Math.round(weatherData.daily[0].temp.max)}°C{" "}
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {renderWidgetContent(weatherData)}
      {isEditMode && (
        <DeleteOutlined
          onClick={() => onDelete(widget.id)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            padding: 8,
            cursor: "pointer",
            color: "white",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};
