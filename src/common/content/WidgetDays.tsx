import React from "react";
import { Col, Table, Row } from "antd";
import { DailyWeather } from "../../types/weather";
import WeatherIcon from "./WeatherIcon";
import { WiThermometer } from "weather-icons-react";

interface WidgetDaysProps {
  daysWeather: DailyWeather[] | null;
}

const WidgetDays: React.FC<WidgetDaysProps> = ({ daysWeather }) => {
  if (!daysWeather) return null;
  const isMobile = window.innerWidth <= 500; // Adjust this value as needed
  const formattedData = daysWeather.map((day, index) => ({
    date:
      index === 0
        ? "Today"
        : new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
    icon: (
      <Row align="middle">
        <WeatherIcon main={day.weather[0].main} />
        <p style={{ marginLeft: "15px", textAlign: "center" }}>
          {`${Math.round(day.temp.min)} / ${Math.round(day.temp.max)}°C`}
        </p>
      </Row>
    ),
    temp: (
      <Row align="middle">
        <WiThermometer size={isMobile ? "24px" : "3rem"} color="#1890ff" />
        <p style={{ marginLeft: "8px" }}>{`${Math.round(day.temp.day)}°C`}</p>
      </Row>
    ),
  }));

  // Define columns for Ant Design table
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Weather",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "Temperature (°C)",
      dataIndex: "temp",
      key: "temp",
    },
  ];
  return (
    <Col xs={24} sm={24} lg={24} style={{ marginBottom: "16px" }}>
      <Table
        dataSource={formattedData}
        columns={columns}
        rowKey="date"
        pagination={false}
        bordered={false}
        showHeader={false}
        style={{
          background: "#fff",
          borderRadius: 8,
          lineHeight: "1.2",
          padding: "0",
        }}
      />
    </Col>
  );
};

export default WidgetDays;
