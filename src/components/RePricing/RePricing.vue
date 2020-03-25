<style scoped src="../Assists/Assist.css"></style>
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
    </ul>
    <div class="tab-content container">
      <div class="tab-pane" :class="{active:tabShow=='General'}">
        <pre>{{ $data }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["re-pricing"],
  data() {
    return {
      rePricingBase: this.rePricing,
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