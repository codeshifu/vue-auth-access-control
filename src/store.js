import Vue from 'vue';
import Vuex from 'vuex';
import { register, login } from './controllers/authController';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isLoggedIn: state => {
      return state.user;
    }
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload.email;
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
    }
  }
});
