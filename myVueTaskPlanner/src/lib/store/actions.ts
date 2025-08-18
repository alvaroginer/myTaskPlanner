import type { Commit, Dispatch } from 'vuex/types/index.js';
import { getOneUser } from '../lib/query/userQuery';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  async updateUser({ commit }: { commit: Commit }, userId: string) {
    const newUserData = await getOneUser(userId);
    commit('logInUser', newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
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
        dispatch('upDateUser', firebaseUser.uid);
      } else {
        commit('logOut');
      }
    });
  },
};
