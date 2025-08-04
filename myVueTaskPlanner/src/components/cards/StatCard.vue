<script setup lang="ts">
type StatCardProps = {
  name: string;
  data: number;
};

const { name, data } = defineProps<StatCardProps>();
</script>

<template>
  <div class="card">
    <p>{{ name }}</p>
    <p>{{ data }}</p>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}

.card {
  width: 100px;
  height: 75px;
  border-radius: 4px;
  border: 2px solid gray;
  background-color: beige;
}
</style>
