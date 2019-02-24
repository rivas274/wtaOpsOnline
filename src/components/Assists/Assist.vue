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
          <span class="m--hidden-mobile">General</span>
        </a>
      </li>
      <li v-if="permission.bills" :class="{active:tabShow=='Bills'}" v-tooltip:top="'Bills'">
        <a
          class="nav-link"
          :class="{'m--font-success':tabShow=='Bills'}"
          @click.prevent="showTab('Bills')"
        >
          <i class="fa fa-money-bill" aria-hidden="true"></i>
          <span class="m--hidden-mobile">Bills</span>
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
    </div>
  </div>
</template>
<script>
import ListBill from "../Bill/ListBill.vue";
import AssistDetail from "./AssistDetail.vue";
export default {
  components: { ListBill, AssistDetail },
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