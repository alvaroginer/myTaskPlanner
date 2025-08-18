import type { VuexStore } from "../definitions";
import type { VuexUser } from "../definitions";

export default {
  logInUser(state: VuexStore, newUserData: VuexUser) {
    state.userData = newUserData;
  },

  logOut(state: VuexStore) {
    state.userData = null;
    localStorage.removeItem("userData");
  },
};
