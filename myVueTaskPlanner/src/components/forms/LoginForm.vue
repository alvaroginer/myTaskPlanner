<template>
  <form @submit.prevent="handleSubmit">
    <InputText id="" label="" placeholder=""></InputText>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from '../input/InputText.vue';

type LoginFormErrors = {
  email?: string | undefined;
  password: string | undefined;
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
