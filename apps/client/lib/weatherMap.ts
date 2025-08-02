export const weatherMap: Record<number, {label: string, imgUrl: string}> = {
  0: {label: "Clear sky", imgUrl: "https://cdn.weatherbit.io/static/img/icons/c01d.png"},
  1: {label: "Mainly clear", imgUrl: "https://cdn.weatherbit.io/static/img/icons/c02d.png"},
  2: {label: "Partly cloudy", imgUrl: "https://cdn.weatherbit.io/static/img/icons/c02d.png"},
  3: {label: "Overcast clouds", imgUrl: "https://cdn.weatherbit.io/static/img/icons/c04d.png"},
  45: {label: "Fog", imgUrl: "https://cdn.weatherbit.io/static/img/icons/a05d.png"},
  48: { label: "Rime fog", imgUrl: "https://cdn.weatherbit.io/static/img/icons/a05d.png" },
  51: { label: "Light drizzle", imgUrl: "https://cdn.weatherbit.io/static/img/icons/d01d.png" },
  53: { label: "Moderate drizzle", imgUrl: "https://cdn.weatherbit.io/static/img/icons/d02d.png"},
  55: { label: "Dense drizzle", imgUrl: "https://cdn.weatherbit.io/static/img/icons/d03d.png"},
  56: { label: "Light freezing drizzle", imgUrl: "https://cdn.weatherbit.io/static/img/icons/d03d.png"},
  57: { label: "Dense freezing drizzle", imgUrl: "https://cdn.weatherbit.io/static/img/icons/d03d.png"},
  61: { label: "Light rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/r01d.png"},
  63: { label: "Moderate rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/r02d.png"},
  65: { label: "Heavy rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/r03d.png"},
  66: { label: "Freezing rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/f01d.png"},
  67: { label: "Freezing rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/f01d.png"},
  71: { label: "Light snow", imgUrl: "https://cdn.weatherbit.io/static/img/icons/s01d.png"},
  73: { label: "Moderate snow", imgUrl: "https://cdn.weatherbit.io/static/img/icons/s01d.png"},
  75: { label: "Heavy snow", imgUrl: "https://cdn.weatherbit.io/static/img/icons/s03d.png"},
  77: { label: "Snow grains", imgUrl: "https://cdn.weatherbit.io/static/img/icons/s02d.png"},
  80: { label: "Light rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/r04d.png"},
  81: { label: "Moderate rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/r06d.png"},
  82: { label: "Violent rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/r06d.png"},
  85: { label: "Violent rain", imgUrl: "https://cdn.weatherbit.io/static/img/icons/s01d.png"},
  86: { label: "Heavy snow", imgUrl: "https://cdn.weatherbit.io/static/img/icons/s01d.png"},
  95: { label: "Thunderstorm", imgUrl: "https://cdn.weatherbit.io/static/img/icons/t02d.png"},
  96: { label: "Thunderstorm", imgUrl: "https://cdn.weatherbit.io/static/img/icons/t04d.png"},
  99: { label: "Thunderstorm", imgUrl: "https://cdn.weatherbit.io/static/img/icons/t04d.png"},
};

export const getWeatherInfo = (code: number) => {
  return weatherMap[code] ?? { 
    label: "Broken clouds", 
    imgUrl: "https://cdn.weatherbit.io/static/img/icons/c03d.png" 
  };
};

