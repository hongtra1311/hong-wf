import React from "react";
import { FullWeatherData } from "./weather";
export type Widget = {
  title: string;
  icon: React.JSX.Element;
  value: string;
  description: string;
};

export interface CityWeatherWidget {
  id: string;
  visible: boolean;
  order: number;
  data: FullWeatherData;
}

export type CityCoordinates = {
  city: string;
  lat: number;
  lon: number;
};
