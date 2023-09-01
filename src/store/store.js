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

      console.log('addAssist',{state, assist});
     
      let tab = state.assistances.filter(function(v) {
        return v.codeAssist == assist.codeAssist;
      });
      if (tab.length == 0) {
          state.assistances.push(assist);
          console.log('codigo_Asistencia', assist.codeAssista)
          state.tabShow = assist.codeAssist;
          // state.updateTabShow(assist.codeAssist);
      } else {
        state.tabShow = tab[0].codeAssist;
        //state.updateTabShow(tab[0].codeAssist);
      }
    },
    removeAssist(state, assist) {
      if (assist.codeAssist == state.tabShow) {
        state.tabShow = "List";
       // this.updateTabShow("List");
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