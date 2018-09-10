import Vue from 'vue';
import Vuex from 'vuex';
import { register, login, currentUser } from './controllers/authController';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload.email;
    },
    LOGOUT(state) {
      state.user = null;
    }
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then(data => {
            commit('LOGIN', data);
            window.localStorage.setItem('token', data.token);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    register({ commit }, payload) {
      return new Promise((resolve, reject) =>
        register(payload)
          .then(() => resolve())
          .catch(err => reject(err))
      );
    },
    logout({ commit }) {
      window.localStorage.removeItem('token');
      commit('LOGOUT');
    },
    refreshUser({ commit }) {
      const token = window.localStorage.getItem('token');
      if (!token) return;

      currentUser(token).then(user => {
        if (user) commit('LOGIN', user);
      });
    }
  }
});
