<style scoped>
.m-timeline-1__item-time {
    right: 0 !important;
    left: 3.57rem;
}
.m-timeline-1__items {
  padding: 0;
}
.inner-circle {
  width: 30px !important; 
  height: 30px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer-circle {
  left: -1.5rem !important;
  width: 40px !important; 
  height: 40px !important; 
}
.icon_assist {
    color: white;
}
</style>
<style src="../Element/custom-m-loader.css"></style>
<template>
  <div class="tab-content">
    <div class="tab-pane active" id="m_widget2_tab1_content" aria-expanded="true">
      <div class="m-timeline-1 m-timeline-1--fixed">
        <div class="m-timeline-1__items">
          <div class="m-timeline-1__marker"></div>
          <div v-for="dates in this.events " :key="dates">
            <div v-for="date in dates" :key="date">
              <div class="m-timeline-1__item m-timeline-1__item--left m-timeline-1__item--first">
                <div class="m-timeline-1__item-circle outer-circle">
                  <div class="m--bg-success inner-circle">
                    <i :class="date.class" class="icon_assist"></i>
                  </div>
                </div>
                <div class="m-timeline-1__item-arrow"></div>
                <span class="m-timeline-1__item-time m--font-brand">
                  {{date.date}}
                  <span>
                    AM
                  </span>
                </span>
                <div class="m-timeline-1__item-content m--margin-top-40">
                  <div class="m-timeline-1__item-title">
                    <strong>{{date.title}}</strong>
                    <br>
                    {{date.user.name}} ({{date.user.user}})
                  </div>
                  <div v-if="date.detaill" class="m-timeline-1__item-body">
                    <div class="m-timeline-1__item-body m--margin-top-15" v-html="date.detaill">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-timeline-1__marker"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id-assist"],
  data: function() {
    return {
      events: {},
      assist: this.idAssist,
    };
  },
  methods: {
    getTimeLine: function() {
      this.showLoader = true;
      this.axios
        .post("getTimeLine", {
          idAssist: this.assist
        })
        .then(response => {
          this.showLoader = false;
          this.events = response.data.RESPONSE;
        });
    },
  },
  computed: {
  },
  mounted() {
    this.getTimeLine();
  }
};
</script>