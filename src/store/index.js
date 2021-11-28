import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import bus from './bus';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    bus,
  },
});
