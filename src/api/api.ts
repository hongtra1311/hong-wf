export const linkApi = (lat: number, lon: number) =>
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=en&exclude=minutely,alerts&appid=${
    import.meta.env.VITE_OPENWEATHER_API_KEY
  }`;
