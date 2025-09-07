<template>
  <v-text-field
    v-model="search"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    hide-details
    single-line
  ></v-text-field>
  <v-data-table
    v-if="weatherData.length"
    :search="search"
    :headers="headers"
    :items="weatherData"
    hide-default-footer
  >
    <template v-slot:[`item.maxTemperature`]="{ item }">
      <span>{{ item.maxTemperature }}</span>
      <v-icon color="red">mdi-thermometer-high</v-icon>
    </template>

    <template v-slot:[`item.minTemperature`]="{ item }">
      <span>{{ item.minTemperature }}</span>
      <v-icon color="blue">mdi-thermometer-low</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchWeeklyWeatherData } from "../../lib/api";
import type { FormatedDayWeatherData } from "../../lib/definitions";

const headers = [
  { title: "Date", value: "timeToDate" },
  { title: "Weather", value: "weatherStatus" },
  { title: "Max. Temperature", value: "maxTemperature" },
  { title: "Min. Temperature", value: "minTemperature" },
  { title: "Precipitations %", value: "precipitations" },
  { title: "Sunrise Hour", value: "sunriseHour" },
  { title: "Sunset Hour", value: "sunsetHour" },
];

export default defineComponent({
  name: "DataTable",
  data() {
    return {
      weatherData: [] as FormatedDayWeatherData[],
      search: "" as string,
    };
  },

  async mounted() {
    try {
      const res = await fetchWeeklyWeatherData();
      console.log("Esto es la repsuesta de la api en dattable" + res);
      this.weatherData = res;
    } catch {
      console.error("An error happended while fetching api data");
    }
  },
});
</script>
