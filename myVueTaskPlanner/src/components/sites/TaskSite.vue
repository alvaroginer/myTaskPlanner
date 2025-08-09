<template>
  <AddTaskForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddTaskForm from "../forms/AddTaskForm.vue";

export default defineComponent({
  components: {
    AddTaskForm,
  },
});
</script>

<style></style>
