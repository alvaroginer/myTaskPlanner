import { defineStore } from "pinia";
import { ref } from "vue";
import type { PiniaUser } from "../lib/definitions";

export const useStore = defineStore("userData", () => {
  const userData = ref<PiniaUser | null>(null);

  const loginUser = (newUserData: PiniaUser) => {
    //LogIn in FireBase
    userData.value = newUserData;
  };

  const logOut = () => {
    userData.value = null;
  };

  const updatePiniaUser = (newUserData: PiniaUser) => {
    userData.value = newUserData;
  };

  return { userData, loginUser, logOut, updatePiniaUser };
});
