<script setup lang="ts">
import { computed } from "vue";
import type { WeatherData } from "../sites/WeatherSite.vue";

const { date, temperature } = defineProps<WeatherData>();

const dateInfo = computed(() => {
  const validDate = new Date(date);
  const validDay = validDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const validHour = validDate.getHours();

  return { hour: validHour, day: validDay };
});

const thermalSensation = computed(() => {
  let sensation: string;
  switch (true) {
    case temperature <= 10:
      sensation = "Cold";
      break;
    case temperature <= 24:
      sensation = "Pleasant";
      break;
    case temperature > 24:
      sensation = "Hot";
      break;
    default:
      sensation = "Unknown";
  }
  return sensation;
});
</script>

<template>
  <div>
    <p>Day: {{ dateInfo.day }} at {{ dateInfo.hour }}</p>
    <p>
      Temperature: {{ temperature }}ºC - Thermal Sensation:
      {{ thermalSensation }}
    </p>
  </div>
</template>

<style scoped>
.container {
  width: 100px;
  height: 50px;
  border: 1px solid gray;
}
</style>
