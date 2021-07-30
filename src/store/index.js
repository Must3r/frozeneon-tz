import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const api = process.env.VUE_APP_API_URL;

export default new Vuex.Store({
  state: {
    packages: [],
    currentPackage: {},
    isError: false,
    errorMessage: '',
    dev: {
      name: 'Stanislav',
      surname: 'Kushnir',
      socials: [
        {
          title: 'LinkedIn',
          icon: 'linkedin',
          link: 'https://www.linkedin.com/in/staskushnir/',
        },
      ],
    },
  },
  mutations: {
    setPackages(state, payload) {
      state.packages = payload;
    },
    setPackage(state, payload) {
      state.currentPackage = payload;
    },
    clearCurrentPackage(state) {
      state.currentPackage = {};
    },
    errorHandler(state, bool) {
      state.isError = bool;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    getPackages({ commit }) {
      return fetch(`${api}/stats/packages`)
        .then((response) => {
          if (!response.ok) throw Error(response.status);
          return response;
        })
        .then((res) => res.json())
        .then((json) => commit('setPackages', json))
        .catch((err) => {
          commit('errorHandler', true);
          commit('setErrorMessage', err);
          setTimeout(() => {
            commit('errorHandler', false);
            commit('setErrorMessage', '');
          }, 5000);
        });
    },
    getPackage({ commit }, item) {
      return fetch(`${api}/package/${item.type}/${item.name}/stats`)
        .then((response) => {
          if (!response.ok) throw Error(response.status);
          return response;
        })
        .then((res) => res.json())
        .then((json) => commit('setPackage', json))
        .catch((err) => {
          commit('errorHandler', true);
          commit('setErrorMessage', err);
          setTimeout(() => {
            commit('errorHandler', false);
            commit('setErrorMessage', '');
          }, 5000);
        });
    },
  },
  modules: {
  },
});
