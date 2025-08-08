<template>
  <div>
    <p v-if="!weatherData">Loading...</p>
    <WeatherCard
      v-for="(dayData, index) in weatherData"
      :date="dayData.date"
      :temperature="dayData.temperature"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchWeatherData } from "../../lib/api";
import WeatherCard from "../cards/WeatherCard.vue";

type WeatherData = {
  date: string;
  temperature: number;
};

export default defineComponent({
  name: "WeatherSite",
  data() {
    return {
      weatherData: null as WeatherData[] | null,
    };
  },

  async mounted() {
    const res = await fetchWeatherData();

    if (res) {
      this.weatherData = res;
    }
  },
});
</script>
