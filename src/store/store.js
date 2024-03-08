import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    assistances: [],
    tabShow: 'List'
  },
  mutations: {
    addAssist(state, assist) {
      let tab = state.assistances.filter(function(v) {
        return v.codeAssist == assist.codeAssist;
      });
      if (tab.length == 0) {
          state.assistances.push(assist);
          state.tabShow = assist.codeAssist;
      } else {
        state.tabShow = tab[0].codeAssist;
      }
    },
    removeAssist(state, assist) {
      if (assist.codeAssist == state.tabShow) {
        state.tabShow = "List";
    }
      state.assistances = state.assistances.filter(v => v.codeAssist !== assist.codeAssist);
    },
    updateTabShow(state, tab) {
      state.tabShow = tab;
    }
  },
  // Puedes agregar aquí más opciones como actions y getters si es necesario
});

export default store;