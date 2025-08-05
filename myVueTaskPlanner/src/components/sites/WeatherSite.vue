<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchWeatherData } from "../../lib/api";
import WeatherCard from "../cards/WeatherCard.vue";

export type WeatherData = {
  date: string;
  temperature: number;
};

const weatherData = ref<WeatherData[]>();

onMounted(async () => {
  const res = await fetchWeatherData();

  if (res) {
    weatherData.value = res;
  }
});
</script>

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

<style></style>
