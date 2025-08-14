<template>
  <div class="card">
    <p>{{ name }}</p>
    <p>{{ data }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    data: {
      type: Number as PropType<number>,
      required: true,
    },
  },
});
</script>

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
