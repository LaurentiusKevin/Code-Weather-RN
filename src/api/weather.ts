import axios from 'axios';

export default async function getWeather({
  lat,
  lon,
  unit,
}: {
  lat: number;
  lon: number;
  unit: string;
}) {
  const apiKey = '18d7cee05358cb4a87a21786dd6e40b3';

  const res = await axios({
    url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`,
  });

  return res.data;
}
