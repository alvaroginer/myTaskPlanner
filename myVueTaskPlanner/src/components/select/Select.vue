<template>
  <select :name="id" :id="id" :value="modelValue" @change="handleSelect">
    <option v-if="placeholder" value="" disabled>
      {{ placeholder }}
    </option>
    <option v-for="value in options" :key="value" :value="value">
      {{ value }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Select',
  props: {
    id: {
      type: String as () => string,
      required: true,
    },
    placeholder: {
      type: String as () => string,
    },
    options: {
      type: Array as PropType<string[] | number[]>,
      required: true,
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleSelect(event: Event) {
      const value = (event.target as HTMLSelectElement).value;
      this.$emit('update:modelValue', value);
    },
  },
});
</script>

<style>
select {
  border: 1px solid black;
  outline: 1px solid black;
  min-width: 80px;
  height: 40px;
  margin-top: 10px;
  border-radius: 4px;

  &:focus {
    outline: 2px solid blue;
  }
}
</style>
