<script setup lang="ts">
import StatCard from "./cards/StatCard.vue";
</script>

<template>
  <div class="container">
    <StatCard name="All tasks" :data="5" />
    <StatCard name="Completed tasks" :data="2" />
    <StatCard name="Out of date tasks" :data="1" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
