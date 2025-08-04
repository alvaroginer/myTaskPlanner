<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchWeatherData } from "../../lib/api";

type WeatherData = {
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

<template></template>

<style></style>
