import React from "react";
import { Row, Col, Carousel } from "antd";
import HourWeather from "./HourWeather";
import { HourlyWeather } from "../../types/weather";
import { getHourFromTimestamp } from "../../util/convert";
interface WidgetHoursProps {
  hoursWeather: HourlyWeather[] | null;
}
const WidgetHours: React.FC<WidgetHoursProps> = ({ hoursWeather }) => {
  if (!hoursWeather || hoursWeather.length === 0) return null;
  const currentTime = getHourFromTimestamp(hoursWeather[0].dt);
  const isMobile = window.innerWidth <= 500;

  const chunkedHours: HourlyWeather[][] = [];
  for (let i = 0; i < hoursWeather.length; i += 4) {
    chunkedHours.push(hoursWeather.slice(i, i + 4));
  }

  return (
    <Col xs={24} sm={24} lg={24}>
      {isMobile ? (
        <Carousel dots={false} draggable>
          {chunkedHours.map((chunk, index) => (
            <div key={index}>
              <Row justify="center">
                {chunk.map((hour, hourIndex) => (
                  <Col key={hourIndex} span={6}>
                    <HourWeather hourWeather={hour} currentTime={currentTime} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>
      ) : (
        <Row>
          {hoursWeather &&
            hoursWeather.map((hour, index) => (
              <HourWeather
                hourWeather={hour}
                currentTime={currentTime}
                key={index}
              />
            ))}
        </Row>
      )}
    </Col>
  );
};

export default WidgetHours;
