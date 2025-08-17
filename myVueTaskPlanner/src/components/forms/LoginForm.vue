<template>
  <form @submit.prevent="handleSubmit">
    <InputText
      id="email"
      label="Introduce your email"
      placeholder="example@gmail.com"
      v-model="formData.email"
      :error-message="formDataErrors.errors.email"
    ></InputText>
    <InputText
      id="password"
      label="Introduce your password"
      placeholder="Abcd123*"
      v-model="formData.password"
      :error-message="formDataErrors.errors.password"
    ></InputText>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from '../input/InputText.vue';

type LoginFormErrors = {
  email?: string | undefined;
  password?: string | undefined;
};

export default defineComponent({
  name: 'LoginForm',
  components: {
    InputText,
  },
  data() {
    return {
      formData: {
        email: '' as string,
        password: '' as string,
      },
      formDataErrors: {
        succes: false as boolean,
        errors: {} as LoginFormErrors,
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log('hola');
    },
  },
});
</script>
