<template>
  <form @submit.prevent="handleSubmit">
    <v-text-field
      label="Introduce your name"
      placeholder="Alvaro"
      id="firstName"
      v-model="formData.firstName"
      :error-messages="formErrors.errors.firstName"
    ></v-text-field>
    <v-text-field
      id="lastName"
      label="Introduce your last name"
      placeholder="Giner"
      v-model="formData.lastName"
      :error-messages="formErrors.errors.lastName"
    ></v-text-field>
    <v-text-field
      id="email"
      label="Introduce your email"
      placeholder="example@mail.com"
      v-model="formData.email"
      :error-messages="formErrors.errors.email"
    ></v-text-field>
    <v-text-field
      id="password"
      label="Introduce your password"
      placeholder="Abcd1234*"
      v-model="formData.password"
      type="password"
      :error-messages="formErrors.errors.password"
    ></v-text-field>
    <p v-if="formErrors.errors.signup">{{ formErrors.errors.signup }}</p>
    <v-btn variant="tonal" type="submit"> Sign up </v-btn>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { validateSignupForm } from "../../lib/validations/formValidation";
import { mapMutations } from "vuex";

type SignUpFormErrors = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  signup?: string | undefined;
};

export default defineComponent({
  name: "SignUpForm",

  data() {
    return {
      formData: {
        firstName: "" as string,
        lastName: "" as string,
        email: "" as string,
        password: "" as string,
      },
      formErrors: {
        succes: false as boolean,
        errors: {} as SignUpFormErrors,
      },
    };
  },
  methods: {
    ...mapMutations(["logInUser"]),
    async handleSubmit() {
      try {
        const validUser = await validateSignupForm(this.formData);

        if ("errors" in validUser) {
          this.formErrors = {
            succes: false,
            errors: validUser.errors,
          };
          return;
        }

        this.logInUser(validUser);
        console.log("Succesfull log in");
        this.$router.push("/home");
      } catch (error: any) {
        this.formErrors = {
          succes: false,
          errors: {
            signup:
              "Ocurrió un error con el inicio de sesión. Inténtelo otra vez",
          },
        };
      }
    },
  },
});
</script>
