import type { Commit, Dispatch } from "vuex/types/index.js";
import { getOneUser } from "../query/userQuery";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  async updateUser({ commit }: { commit: Commit }, userId: string) {
    const newUserData = await getOneUser(userId);
    const { tasks, ...vuexUser } = newUserData;
    commit("logInUser", vuexUser);
    localStorage.setItem("userData", JSON.stringify(vuexUser));
  },
  async initFirebaseAuth({
    commit,
    dispatch,
  }: {
    commit: Commit;
    dispatch: Dispatch;
  }) {
    onAuthStateChanged(getAuth(), (firebaseUser) => {
      if (firebaseUser) {
        dispatch("updateUser", firebaseUser.uid);
      } else {
        commit("logOut");
      }
    });
  },
};
