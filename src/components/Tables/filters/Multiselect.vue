<template slot="tag" slot-scope="props">
  <div class="col-md-4">
    
        <div class="form-control m-input" >
          <Moultiselect
            v-model="value"
            class="multiselect__single"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :placeholder="watermark"
            ></Moultiselect>
        </div>
    
  </div>
</template>
<script>
import Moultiselect from "vue-multiselect";
export default {
  props: ["watermark"],
  components: {
    Moultiselect
  },
  data: function() {
    return {
      value: [],
      options: ["list", "of", "options"]
    };
  }
};
</script>