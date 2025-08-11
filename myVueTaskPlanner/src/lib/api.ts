type OpenMeteoHourlyResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    temperature_2m: string;
  };
  hourly: {
    time: string[]; // Array de timestamps
    temperature_2m: number[]; // Array de temperaturas
  };
};

export const fetchWeatherData = async () => {
  try {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('An error occurred while fecthing the data');
    }

    const weatherData: OpenMeteoHourlyResponse = await response.json();

    const { time, temperature_2m } = weatherData.hourly;
    const combinedData = time.map((timestamp, index) => ({
      date: timestamp,
      temperature: temperature_2m[index],
    }));

    let weeklyTemperature: Record<number, number[]> = {};
    time.forEach((timestamp, index) => {
      const timestampDate = new Date(timestamp).getTime();

      if (!weeklyTemperature[timestampDate]) {
        weeklyTemperature[timestampDate] = [temperature_2m[index]];
      } else {
        weeklyTemperature[timestampDate].push(temperature_2m[index]);
      }
    });

    return combinedData;
  } catch (error: any) {
    console.log(error.message);
  }
};
