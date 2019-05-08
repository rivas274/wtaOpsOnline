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
      <li v-if="permission.bills" :class="{active:tabShow=='Note'}" v-tooltip:top="'Note'">
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='Note'}"
          @click.prevent="showTab('Note')"
        >
          <i class="fa fa-sticky-note" aria-hidden="true"></i>
          <span>Note</span>
        </a>
      </li>
    </ul>
    <div class="tab-content container">
      <div class="tab-pane" :class="{active:tabShow=='General'}">
        <AssistDetail :id-assist="assistBase.idAsist" ></AssistDetail>
      </div>
      <div v-if="permission.bills" class="tab-pane" :class="{active:tabShow=='Bills'}">
        <list-bill :id-assist="assistBase.idAsist"></list-bill>
      </div>
      <div class="tab-pane" :class="{active:tabShow=='Note'}">
        <list-note :id-assist="assistBase.idAsist"></list-note>
      </div>
    </div>
  </div>
</template>
<script>
import ListBill from "../Bill/ListBill.vue";
import ListNote from "../Note/ListNote.vue";
import AssistDetail from "./AssistDetail.vue";
export default {
  components: { ListBill, AssistDetail, ListNote },
  props: ["assist"],
  data() {
    return {
      assistBase: this.assist,
      tabShow: "General",
      permission:{
        bills:this.middleware('bills','read')
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