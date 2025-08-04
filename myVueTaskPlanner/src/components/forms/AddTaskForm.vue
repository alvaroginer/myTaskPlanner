<script setup lang="ts">
import { reactive } from "vue";
import type { TaskFormErrors, TaskFormState } from "../../lib/definitions";
import { validateAddTaskForm } from "../../lib/validation";
import InputText from "../input/InputText.vue";

//const emit = defineEmits(["add-task"]);

const formData = reactive({
  name: "",
  description: "",
  deadline: "",
});

const formDataErrors: TaskFormState = reactive({
  success: true,
  errors: {},
});

const handleSubmit = () => {
  const result = validateAddTaskForm(formData);
  if ("success" in result && result.success === false) {
    formDataErrors.success = false;
    formDataErrors.errors = result.errors;
    return;
  }

  console.log(result);
  //emit("add-task", result);
};
</script>

<template>
  <form class="form-container" @submit.prevent="handleSubmit">
    <InputText
      id="name"
      :limit="50"
      label="Put the task name"
      placeholder="Clean the garden"
      v-model="formData.name"
      :errorMessage="formDataErrors.errors.name || ''"
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
      :errorMessages="formDataErrors.errors.deadline || ''"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
