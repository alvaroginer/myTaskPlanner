import type { VuexStore } from "../definitions";
import type { VuexUser } from "../definitions";

export default {
  logInUser(state: VuexStore, newUserData: VuexUser) {
    state.userData = newUserData;
    localStorage.setItem("userData", JSON.stringify(newUserData));
    console.log("LogIn completed with: " + newUserData);
  },

  logOut(state: VuexStore) {
    state.userData = null;
    localStorage.removeItem("userData");
    console.log("LogOut completed");
  },
};
