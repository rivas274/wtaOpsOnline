<style scoped src="./Assist.css"></style>
<template>
  <div class="content-tabs-left">
    <ul class="nav nav-tabs tabs-left">
      <li :class="{active:tabShow=='General'}">
        <a class="nav-link" :class="{'m--font-success':tabShow=='General'}" @click.prevent="showTab('General')">
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          General
        </a>
      </li>
      <li :class="{active:tabShow=='Bills'}">
        <a class="nav-link" :class="{'m--font-success':tabShow=='Bills'}" @click.prevent="showTab('Bills')">
          <i class="fa fa-money-bill" aria-hidden="true"></i>
          Bills
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane" :class="{active:tabShow=='General'}">
          General
        <pre>{{ $data }}</pre>
      </div>
      <div class="tab-pane" :class="{active:tabShow=='Bills'}">
          Bills
        <pre>{{ $data }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["assist"],
  data() {
    return {
      assistBase: this.assist,
      tabShow: "General"
    };
  },
  methods: {
    showTab(tab) {
      console.log(tab);
      this.tabShow = tab;
    }
  }
};
</script>