export const getWeather = async (lat: number, lon: number) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();
  
  return {
    temp: data.current_weather?.temperature,
    icon: data.current_weather?.weathercode,
    min: data.daily?.temperature_2m_min?.[0],
    max: data.daily?.temperature_2m_max?.[0],
  };
};
