import type { Commit } from 'vuex/types/index.js';
import { getOneUser } from '../lib/query/userQuery';

export default {
  async upDateUser({ commit }: { commit: Commit }, userId: string) {
    const newUserData = await getOneUser(userId);
    commit('logInUser', newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  },
};
