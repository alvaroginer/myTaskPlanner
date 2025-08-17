<template>
  <form class="form-container" @submit.prevent="handleSubmit">
    <InputText
      id="name"
      :limit="50"
      label="Put the task name"
      placeholder="Clean the garden"
      v-model="formData.name"
      :errorMessage="formDataErrors.errors.name"
    />
    <InputText
      id="description"
      label="Put the task description"
      placeholder="Clean the garden"
      v-model="formData.description"
    />
    <InputText
      id="deadline"
      label="Introduce a deadline for your task"
      placeholder="dd/mm/yy"
      v-model="formData.deadline"
      :errorMessage="formDataErrors.errors.deadline"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { TaskFormErrors } from '../../lib/definitions';
import { validateAddTaskForm } from '../../lib/validation';
import InputText from '../input/InputText.vue';

type TaskForm = {
  name: string;
  description: string;
  deadline: string;
};

export default defineComponent({
  components: {
    InputText,
  },
  data() {
    return {
      formData: {
        name: '' as string,
        description: '' as string,
        deadline: '' as string,
      } as TaskForm,
      formDataErrors: {
        success: true as boolean,
        errors: {} as TaskFormErrors,
      },
    };
  },
  methods: {
    handleSubmit() {
      const result = validateAddTaskForm(this.formData);
      if ('success' in result && result.success === false) {
        this.formDataErrors = result;
        return;
      }

      console.log(result);
    },
  },
});
</script>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
