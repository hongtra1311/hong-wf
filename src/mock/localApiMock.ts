import { setupWorker, SetupWorker } from "msw/browser";
import { CityCoordinates } from "../types/widget";

export const cityCoordinates = [
  {
    city: "London",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    city: "New York",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    city: "Tokyo",
    lat: 35.6895,
    lon: 139.6917,
  },
  {
    city: "Paris",
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    city: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
  },
  {
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
  },
  {
    city: "Dubai",
    lat: 25.276987,
    lon: 55.296249,
  },
  {
    city: "Seoul",
    lat: 37.5665,
    lon: 126.978,
  },
  {
    city: "Hà Nội",
    lat: 21.0285,
    lon: 105.8542,
  },
  {
    city: "Bangkok",
    lat: 13.7563,
    lon: 100.5018,
  },
];
export const setupApiMockWorker = (): SetupWorker => {
  return setupWorker();
  // http.get("https://api.openweathermap.org/data/3.0/onecall?*", () =>
  //   HttpResponse.json(mockFullWeather, {
  //     status: 200,
  //   })
  // )
};

export const mockSearchCity = (
  query: string,
  signal?: AbortSignal
): Promise<CityCoordinates[]> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const data = cityCoordinates.filter((city) =>
        city.city.toLowerCase().includes(query.toLowerCase())
      );
      resolve(data);
    }, 500); // giả lập độ trễ

    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};
