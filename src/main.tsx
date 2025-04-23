import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";
import React from "react";
import "weather-icons/css/weather-icons.css";
import { setupApiMockWorker } from "./mock/localApiMock";
const handleMock = async () => {
  if (import.meta.env.VITE_OPENWEATHER_API_KEY) {
    const worker = setupApiMockWorker();
    await worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
      onUnhandledRequest: "bypass",
    });
  }
};
handleMock().then(() => {
  createRoot(document.getElementById("root")!).render(
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 6,
          fontFamily: "Helvetica",
        },
      }}
    >
      <App />
    </ConfigProvider>
  );
});
