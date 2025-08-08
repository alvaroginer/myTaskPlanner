<template>
  <div class="container">
    <label :for="id">{{ label }}</label>
    <input
      type="text"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      :class="{ error: errorMessage || inputError }"
      v-model="modelValue"
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputText",
  props: {
    id: {
      type: String as () => string,
      required: true,
    },
    label: {
      type: String as () => string,
      required: true,
    },
    placeholder: {
      type: String as () => string,
      required: true,
    },
    errorMessage: {
      type: String as () => string,
    },
    limit: {
      type: Number as () => number,
    },
    modelValue: {
      type: String as () => string,
    },
  },
  emits: ["update:modelValue"],

  data() {
    return {
      inputData: this.modelValue as string,
    };
  },

  computed: {
    inputError(): boolean {
      if (!this.limit) return false;
      return this.inputData.length > this.limit;
    },
  },

  methods: {
    handleInput(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.inputData = value;
      this.$emit("update:modelValue", value);
    },
  },
});
</script>

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
