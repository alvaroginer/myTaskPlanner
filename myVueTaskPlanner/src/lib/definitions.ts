export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  tasks: TaskData[];
  id: string;
}

export type VuexStore = {
  userData: VuexUser | null;
};

export type VuexUser = Pick<
  UserData,
  "email" | "id" | "firstName" | "lastName"
>;

export interface TaskData {
  taskId: string;
  name: string;
  description?: string;
  createdAt: number;
  deadline: number;
  completed: boolean;
}

export interface addTaskFormData {
  name: string;
  description?: string;
  deadline: string;
}

export interface TaskFormErrors {
  name?: string | undefined;
  deadline?: string | undefined;
}

export interface TaskFormState {
  success: boolean;
  errors: TaskFormErrors;
}

export type FormatedDayWeatherData = {
  timeToDate: string;
  maxTemperature: number;
  minTemperature: number;
  weatherStatus: string;
  precipitations: string;
  sunriseHour: string;
  sunsetHour: string;
};

export const URL_VALENCIA =
  "https://api.open-meteo.com/v1/forecast?latitude=39.4699&longitude=-0.3763&hourly=temperature_2m";
export const URL_REYKJAVIK =
  "https://api.open-meteo.com/v1/forecast?latitude=64.1355&longitude=-21.8954&hourly=temperature_2m";
export const URL_VIRGEN_DE_LA_VEGA =
  "https://api.open-meteo.com/v1/forecast?latitude=40.065&longitude=-1.404&hourly=temperature_2m";

export const weatherCodes: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm (slight or moderate)",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};
