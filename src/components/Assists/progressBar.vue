<style>
.step {
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
}
.step li {
  display: flex;
  position: relative;
  align-items: center;
}
.progress-bar {
  width: 3rem;
  height: 0.3rem;
}
.step li figure {
  margin: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.progress-container{
  margin-top: -15px;
}
</style>
<template>
  <div class="text-center progress-container">
    <ul class="step mb-3">
      <li v-for="(st,stkey) in statusShow" :key="stkey">
        <span class="progress-bar" :class="st.color" v-if="stkey>0"></span>
        <figure v-tooltip:top="st.label" class="m--img-rounded" :class="st.color">
          <i :class="st.icon" class="m--icon-font-size-lg1"></i>
        </figure>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["id-assist"],
  data: function() {
    return {
      status: []
    };
  },
  methods: {
    getStatus: function() {
      this.axios
        .post("progressBarAssist", {
          idAssist: this.idAssist
        })
        .then(response => {
          this.status = response.data.RESPONSE;
        });
    }
  },
  computed: {
    statusShow:function(){
      let color={
        'old':'m--bg-fill-success',
        'current':'m--bg-fill-success',
        'new':'m--bg-fill-metal',
      };
      return this.status.map(function(value) {
        let label=[value.label];
        if(value.date!==null){
          label.push(value.date.date);
        }
        return {
          label:label.join('</br>'),
          icon:value.icon,
          color:color[value.current],
        };
      });
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>