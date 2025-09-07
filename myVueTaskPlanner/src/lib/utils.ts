import { weatherCodes } from "./definitions";

export const isValidFutureDate = (dateStr: string): boolean => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(dateStr)) throw new Error("The date format must be dd/mm/yy");

  const [day, month, year] = dateStr.split("/").map(Number);
  const fullYear = year + 2000; // suponemos años 2000–2099
  const inputDate = new Date(fullYear, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // para comparar solo fechas

  return inputDate >= today;
};

export const generateRandomId = (length: number = 8): string =>
  Math.random()
    .toString(36)
    .slice(2, 2 + length);

export const generateDayString = (timestamp: number) => {
  const newDate = new Date(timestamp);
  const dateToStr = newDate.toDateString();
  return dateToStr;
};

export const getHoursAndMinutes = (timestamp: string) => {
  const formatedDate = new Date(timestamp);
  return `${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
};

export const getAvg = (grades: number[]) => {
  return (grades.reduce((acc, c) => acc + c, 0) / grades.length).toFixed(1);
};

export const hours = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`
);

export const translateWeatherCode = (code: number) => {
  return weatherCodes[code];
};
