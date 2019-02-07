<style>
.m-tabs-line .m-tabs__item {
  margin-right: 5px;
}
.m-tabs-line .m-tabs__item a {
  padding-right: 15px;
}
.m-tabs__link > .fa {
  font-size: 1.5rem !important;
}
.m-tabs-line .m-tabs__item a .close-tab {
  margin-left: 4px;
  margin-right: -6px;
  font-size: 14px !important;
  background-color: white;
  color: #7b7e8a;
}
.m-tabs-line .m-tabs__item a > * {
  margin-left: 3px;
  padding-left: 3px;
  border-left: 1.2px solid #7b7e8a;
}
.m-tabs__link,
.m-tabs__link > * {
  cursor: pointer;
  display: inline-block;
}
.m-tabs-line.m-tabs-line--2x .m-tabs__link.active,
.m-tabs-line.m-tabs-line--2x .m-tabs__link:hover {
  border-bottom-width: 4px !important;
}
.m-tabs__item {
  height: 49px;
}
.close-tab {
  position: relative;
  top: -16px;
  left: -12px;
  font-size: 11px !important;
}
</style>
<template>
  <content-m :navigation="[{title:'Assistance'}]">
    <template slot="title">Assistance</template>
    <template slot="body">
      <ul class="nav nav-tabs m-tabs-line m-tabs-line--success m-tabs-line--2x" role="tablist">
        <li class="nav-item m-tabs__item">
          <a
            class="nav-link m-tabs__link"
            :class="{active:tabShow=='List'}"
            @click.prevent="showTab('List')"
          >
            <i class="fa fa-life-ring" aria-hidden="true"></i>
            List
          </a>
        </li>
        <li class="nav-item m-tabs__item" v-for="assist in assistances" :key="assist.codeAssist">
          <span>
            <Flag :iso="assist.isoCountry" height="18"></Flag>
            <a
              @click.prevent="showTab(assist.codeAssist)"
              class="nav-link m-tabs__link"
              :class="{active:tabShow==assist.codeAssist}"
            >
              <strong>{{ assist.codeAssist }}</strong>
              <small v-html="assist.fisrtName+' '+assist.lastName"></small>
              <small>{{ assist.codigo }}</small>
            </a>
            <i class="fa fa-window-close close-tab" @click="removeAssist(assist)"></i>
          </span>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane" :class="{active:tabShow=='List'}">
          <ListAsistencia v-on:addAssist="addAssist" :open-asist='assistances'></ListAsistencia>
        </div>
        <div
          class="tab-pane"
          v-for="assist in assistances"
          :key="assist.codeAssist"
          :class="{active:tabShow==assist.codeAssist}"
        >{{assist}}</div>
      </div>
    </template>
  </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListAsistencia from "./ListAsistencia.vue";
import Flag from "../Element/Flag.vue";
export default {
  components: {
    contentM,
    ListAsistencia,
    Flag
  },
  data() {
    return {
      assistances: [],
      tabShow: "List"
    };
  },
  methods: {
    addAssist: function(assist) {
      let tab = this.assistances.filter(function(v) {
        return v.codeAssist == assist.codeAssist;
      });
      if (tab.length == 0) {
        this.assistances.push(assist);
      } else {
        this.showTab(tab[0].codeAssist);
      }
    },
    removeAssist: function({ codeAssist }) {
      if (codeAssist == this.tabShow) {
        this.showTab("List");
      }
      this.assistances = this.assistances.filter(function(v) {
        return v.codeAssist != codeAssist;
      });
    },
    showTab(tab) {
      this.tabShow = tab;
    }
  }
};
</script>