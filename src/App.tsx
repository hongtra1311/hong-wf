import React from "react";
import { Layout, Card, Spin } from "antd";
import { WeatherWidget } from "./components/WeatherWidget";
import { FullWeatherData } from "./types/weather";
import { useFetch } from "./hooks/useFetch";
import { HeaderLayout } from "./Header";
import { linkApi } from "./api/api";
import { cityCoordinates } from "./mock/localApiMock";

const { Content } = Layout;

function App() {
  const lat = localStorage.getItem("lat") || 1.2897;
  const lon = localStorage.getItem("lon") || 103.8501;
  const city = cityCoordinates.find(
    (city) => city.lat === Number(lat) && city.lon === Number(lon)
  ) || { city: "Singapore", lat: 1.2897, lon: 103.8501 };

  const {
    response: fullWeatherData,
    error,
    loading,
  } = useFetch(linkApi(Number(lat), Number(lon))) as {
    response: FullWeatherData | null;
    error: any;
    loading: boolean;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderLayout />
      <Content
        style={{
          padding: "24px",
          backgroundColor: "hsl(223.41deg 62.44% 38.63%)",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px" }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <Card>
            <div style={{ color: "#ff4d4f", textAlign: "center" }}>{error}</div>
          </Card>
        ) : (
          <WeatherWidget fullWeather={fullWeatherData} location={city} />
        )}
      </Content>
    </Layout>
  );
}

export default App;
