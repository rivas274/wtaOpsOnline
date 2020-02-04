<style scoped src="./Assist.css"></style>
<template>
  <div class="content-tabs-left">
    <ul class="nav nav-tabs tabs-left">
      <li :class="{active:tabShow=='General'}" v-tooltip:top="'General'">
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='General'}"
          @click.prevent="showTab('General')"
        >
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          <span>General</span>
        </a>
      </li>
      <li v-if="permission.bills" :class="{active:tabShow=='Bills'}" v-tooltip:top="'Bills'">
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='Bills'}"
          @click.prevent="showTab('Bills')"
        >
          <i class="fa fa-money-bill" aria-hidden="true"></i>
          <span>Bills</span>
        </a>
      </li>
      <li v-if="permission.notes" :class="{active:tabShow=='Note'}" v-tooltip:top="'Note'">
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='Note'}"
          @click.prevent="showTab('Note')"
        >
          <i class="fa fa-sticky-note" aria-hidden="true"></i>
          <span>Note</span>
        </a>
      </li>
      <li
        v-if="permission.provider"
        :class="{active:tabShow=='Providers'}"
        v-tooltip:top="'Providers'"
      >
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='Providers'}"
          @click.prevent="showTab('Providers')"
        >
          <i class="fa fa-ambulance" aria-hidden="true"></i>
          <span>Providers</span>
        </a>
      </li>
      <li
       v-if="permission.time_line"
        :class="{active:tabShow=='time_line'}"
        v-tooltip:top="'time_line'"
      >
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='time_line'}"
          @click.prevent="showTab('time_line')"
        >
          <i class="fa fa-clock" aria-hidden="true"></i>
          <span>Time_line</span>
        </a>
      </li>
    </ul>
    <div class="tab-content container">
      <div class="tab-pane" :class="{active:tabShow=='General'}">
        <AssistDetail :id-assist="assistBase.idAssist"></AssistDetail>
      </div>
      <div v-if="permission.bills" class="tab-pane" :class="{active:tabShow=='Bills'}">
        <list-bill :id-assist="assistBase.idAssist"></list-bill>
      </div>
      <div v-if="permission.notes" class="tab-pane" :class="{active:tabShow=='Note'}">
        <list-note :id-assist="assistBase.idAssist"></list-note>
      </div>
      <div v-if="permission.provider" class="tab-pane" :class="{active:tabShow=='Providers'}">
        <Providers :id-assist="assistBase.idAssist"></Providers>
      </div>
      <div v-if="permission.time_line" class="tab-pane" :class="{active:tabShow=='time_line'}">
        <TimeLine :id-assist="assistBase.idAssist"></TimeLine>
      </div>
    </div>
  </div>
</template>
<script>
import ListBill from "../Bill/ListBill.vue";
import Providers from "../Provider/ListProviders.vue";
import ListNote from "../Note/ListNote.vue";
import TimeLine from "../timeline/TimeLine.vue";
import AssistDetail from "./AssistDetail.vue";
export default {
  components: { Providers, ListBill, AssistDetail, ListNote, TimeLine },
  props: ["assist"],
  data() {
    return {
      assistBase: this.assist,
      tabShow: "General",
      permission: {
        bills: this.middleware("bills", "read"),
        notes: this.middleware("notes", "read"),
        provider: this.middleware("provider", "read"),
        time_line: this.middleware("time_line", "read"),
      }
    };
  },
  methods: {
    showTab(tab) {
      this.tabShow = tab;
    }
  }
};
</script>