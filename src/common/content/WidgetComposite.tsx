import React, { useState } from "react";
import { Row } from "antd";
import {
  CloudOutlined,
  ExperimentOutlined,
  AimOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { FullWeatherData } from "../../types/weather";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableCard, WeatherCardProps } from "./SortableCard";

interface WidgetCompositeProps {
  data: FullWeatherData | null;
}

export const WidgetComposite: React.FC<WidgetCompositeProps> = ({ data }) => {
  if (!data) return null;
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

  // Filter hourly data starting from current time and get the next 12 hours
  const next12Hours = data?.hourly
    .filter((hour) => hour.dt >= currentTime) // Filter hours that are greater than or equal to current time
    .slice(0, 12); // Get the next 12 hours,

  const initialCards: WeatherCardProps[] = [
    {
      id: "nextHours",
      title: `Feels like ${Math.round(data.current.feels_like)}°C, ${
        data.current.weather[0].description
      }`,
      value: data.current.weather[0].main,
      description: data.current.weather[0].description,
      size: "full" as const,
      type: "nextHours",
      data: next12Hours,
    },
    {
      id: "nextDays",
      title: "8 Days Forecast",
      value: data.current.weather[0].main,
      description: data.current.weather[0].description,
      size: "full" as const,
      type: "nextDays",
      data: data.daily,
    },
    {
      id: "temperature",
      title: "Temperature",
      icon: <ExperimentOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: `${Math.round(data.current.temp)}°C`,
      description: `Feels like: ${Math.round(data.current.feels_like)}°C`,
      size: "normal" as const,
      type: "temperature" as const,
      data: {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
      },
    },
    {
      id: "weather",
      title: "Weather",
      icon: <CloudOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: data.current.weather[0].main,
      description: data.current.weather[0].description,
      size: "normal" as const,
      type: "basic" as const,
    },
    {
      id: "wind",
      title: "Wind",
      icon: <AimOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: `${data.current.wind_speed} m/s`,
      description: `Direction: ${data.current.wind_deg}°`,
      size: "normal" as const,
      type: "wind" as const,
      data: {
        speed: data.current.wind_speed,
        deg: data.current.wind_deg,
      },
    },
    {
      id: "humidity",
      title: "Humidity",
      icon: <ExperimentOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: data.current.uvi,
      description: "Current humidity",
      size: "normal" as const,
      type: "humidity" as const,
      data: {
        humidity: data.current.humidity,
      },
    },
    {
      id: "pressure",
      title: "Pressure",
      icon: <ExperimentOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: `${data.current.pressure} hPa`,
      description: "Atmospheric pressure at sea level",
      size: "double" as const,
      type: "pressure" as const,
      data: {
        pressure: data.current.pressure,
      },
    },
    {
      id: "sunrise",
      title: "Sunrise",
      value: new Date(data.current.sunrise * 1000).toLocaleTimeString(),
      description: "Time of sunrise",
      size: "normal" as const,
      type: "sunrise" as const,
      data: {
        sunrise: data.current.sunrise,
      },
    },
    {
      id: "sunset",
      title: "Sunset",
      value: new Date(data.current.sunset * 1000).toLocaleTimeString(),
      description: "Time of sunset",
      size: "normal" as const,
      type: "sunset" as const,
      data: {
        sunset: data.current.sunset,
      },
    },
    {
      id: "uvIndex",
      title: "UV Index",
      icon: <ExperimentOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: `${data.current.uvi}`,
      description: "Current UV index",
      size: "normal" as const,
      type: "uvIndex" as const,
      data: {
        uvi: data.current.uvi,
      },
    },
    {
      id: "cloudiness",
      title: "Cloudiness",
      icon: <CloudOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: `${data.current.clouds}%`,
      description: "Cloud coverage in the sky",
      size: "normal" as const,
      type: "cloudiness" as const,
      data: {
        clouds: data.current.clouds,
      },
    },
    {
      id: "visibility",
      title: "Visibility",
      icon: <EyeOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      value: `${data.current.visibility / 1000} km`,
      description: "Visibility range in kilometers",
      size: "normal" as const,
      type: "visibility" as const,
      data: {
        visibility: data.current.visibility,
      },
    },
  ];

  const [cards, setCards] = useState(initialCards);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={cards.map((card) => card.id)}
        strategy={rectSortingStrategy}
      >
        <Row gutter={[16, 16]}>
          {cards.map((card) => (
            <SortableCard key={card.id} {...card} />
          ))}
        </Row>
      </SortableContext>
    </DndContext>
  );
};
