import { defineStore } from 'pinia';
import { ref } from 'vue';

const assistanceTabs = defineStore('countries', () => {
  const assistances = ref([]);
  const tabShow = ref('List');
  const addAssist = (assist) => {
    let tab = assistances.value.filter(function (v) {
      return v.codeAssist == assist.codeAssist;
    });
    if (tab.length == 0) {
      assistances.value.push(assist);
      tabShow.value = assist.codeAssist;
    } else {
      tabShow.value = tab[0].codeAssist;
    }
  }
  const removeAssist = (assist) => {
    if (assist.codeAssist == tabShow.value) {
      tabShow.value = "List";
    }
    assistances.value = assistances.value.filter(v => v.codeAssist !== assist.codeAssist);
  }
  const updateTabShow = (tab) => {
    tabShow.value = tab;
  }
  return {
    assistances,
    tabShow,
    addAssist,
    removeAssist,
    updateTabShow
  }
});
export default assistanceTabs;