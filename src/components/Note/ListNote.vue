<style scoped>
.options-btn {
  display: inline-flex;
}
iframe {
  height: 360px;
  width: 100%;
}
</style>
<template>
  <section>
    <pre v-for="note in results" :key="note.id">{{note}}</pre>
  </section>
</template>
<script>
export default {
  props: ["id-assist"],
  data: function() {
    return {
      assist: this.idAssist,
      results: [],
      showLoader: false,
    };
  },
  methods: {
    getNote: function(pg) {
      console.log(this.assist);
      this.showLoader = true;
      this.axios
        .post("getNote", {
          idAssist: this.assist,
        })
        .then(response => {
          this.showLoader = false;
          this.results = response.data.RESPONSE.RESULTS;
        });
    }
  },
  mounted() {
    this.getNote();
  }
};
</script>