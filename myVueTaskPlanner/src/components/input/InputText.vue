<script setup lang="ts">
import { ref, computed } from "vue";

type InputTextProps = {
  id: string;
  label: string;
  placeholder: string;
  errorMessage?: string;
  limit?: number;
  modelValue: string;
};

const { id, label, placeholder, errorMessage, limit } =
  defineProps<InputTextProps>();

const emit = defineEmits(["update:modelValue"]);

const inputData = ref("");

const inputError = computed(() => {
  if (!limit) return null;
  return inputData.value.length > limit;
});

const handleInput = ($event: any) => {
  emit("update:modelValue", $event.target.value);
};
</script>

<template>
  <div class="container">
    <label :for="id">{{ label }}</label>
    <input
      type="text"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :class="{ error: errorMessage || inputError }"
      v-model="inputData"
      @input="handleInput($event)"
    />
    <div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="limit" :class="{ 'error-message': inputError }">
        {{ inputData.length }}/{{ limit }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

input {
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

.error {
  outline: 2px solid red !important;
}

.error-message {
  color: red;
}

p {
  margin: 0;
}
</style>
