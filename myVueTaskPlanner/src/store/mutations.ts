import type { VuexStore } from '../lib/definitions';
import type { VuexUser } from '../lib/definitions';

export default {
  logInUser(state: VuexStore, newUserData: VuexUser) {
    state.userData = newUserData;
  },

  logOut(state: VuexStore) {
    state.userData = null;
    localStorage.removeItem('userData');
  },
};
