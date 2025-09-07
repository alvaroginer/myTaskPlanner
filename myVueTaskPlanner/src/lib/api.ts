import {
  URL_REYKJAVIK,
  URL_VALENCIA,
  URL_VIRGEN_DE_LA_VEGA,
  type FormatedDayWeatherData,
} from "./definitions";
import { translateWeatherCode, getHoursAndMinutes } from "./utils";

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

export const fetchWeatherData = async (option: string) => {
  try {
    let url: string;
    switch (option) {
      case "Valencia":
        url = URL_VALENCIA;
        break;

      case "Reykjavik":
        url = URL_REYKJAVIK;
        break;

      case "Virgen de la Vega":
        url = URL_VIRGEN_DE_LA_VEGA;
        break;

      default:
        url = URL_VALENCIA;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("An error occurred while fecthing the data");
    }

    const weatherData: OpenMeteoHourlyResponse = await response.json();

    const { time, temperature_2m } = weatherData.hourly;

    let weeklyTemperature: Record<string, number[]> = {};
    time.forEach((timestamp, index) => {
      const timestampDate = new Date(timestamp).toLocaleDateString();

      if (!weeklyTemperature[timestampDate]) {
        weeklyTemperature[timestampDate] = [temperature_2m[index]];
      } else {
        weeklyTemperature[timestampDate].push(temperature_2m[index]);
      }
    });

    console.log(weeklyTemperature);

    return weeklyTemperature;
  } catch (error: any) {
    console.log(error.message);
  }
};

export interface OpenMeteoDailyResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  daily_units: {
    time: "iso8601";
    temperature_2m_max: "°C";
    temperature_2m_min: "°C";
    weather_code: "wmo code";
    sunrise: "iso8601";
    sunset: "iso8601";
    precipitation_probability_max: "%";
  };

  daily: {
    time: string[]; // YYYY-MM-DD
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    sunrise: string[]; // YYYY-MM-DDTHH:mm
    sunset: string[];
    precipitation_probability_max: number[];
  };
}

export const fetchWeeklyWeatherData = async () => {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,precipitation_probability_max";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("En error occured while fethcing the data from the API");
    }

    const weatherApiData: OpenMeteoDailyResponse = await response.json();

    const {
      time,
      temperature_2m_max,
      temperature_2m_min,
      weather_code,
      precipitation_probability_max,
      sunrise,
      sunset,
    } = weatherApiData.daily;

    const formatedWeatherData: FormatedDayWeatherData[] = time.map(
      (timestamp, index) => ({
        timeToDate: timestamp,
        maxTemperature: temperature_2m_max[index],
        minTemperature: temperature_2m_min[index],
        weatherStatus: translateWeatherCode(weather_code[index]),
        precipitations: `${precipitation_probability_max?.[index]}%`,
        sunriseHour: getHoursAndMinutes(sunrise[index]),
        sunsetHour: getHoursAndMinutes(sunset[index]),
      })
    );

    console.log(formatedWeatherData);

    return formatedWeatherData;
  } catch (error: any) {
    console.log("Something went wrong: " + error.message);
    return [];
  }
};
