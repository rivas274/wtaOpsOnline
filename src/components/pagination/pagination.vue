<template>
  <div class="m-datatable__pager m-datatable--paging-loaded clearfix" >
    <ul class="m-datatable__pager-nav" v-show="showPages.length>1">
      <li v-show="currentPage!=1">
        <a
          title="First"
          class="m-datatable__pager-link m-datatable__pager-link--first"
          @click="paginate(1)">
          <i class="la la-angle-double-left"></i>
        </a>
      </li>
      <li v-show="currentPage!=1">
        <a
          title="Previous"
          class="m-datatable__pager-link m-datatable__pager-link--prev"
          @click="paginate(currentPage-1)">
          <i class="la la-angle-left"></i>
        </a>
      </li>
      <li style="display: none;">
        <input type="text" class="m-pager-input form-control" title="Page number">
      </li>
      <li v-for="page in showPages" :key="page">
        <a
          class="m-datatable__pager-link m-datatable__pager-link-number"
          :class="{'m-datatable__pager-link--active':(currentPage==page)}"
          :data-page="page"
          @click="paginate(page)"
        >{{ page }}</a>
      </li>
      <li v-show="currentPage!=totalPage">
        <a  title="Next" 
            class="m-datatable__pager-link m-datatable__pager-link--next"
            :class="{'m-datatable__pager-link--disabled':(currentPage==totalPage)}"
            :disabled="(currentPage==totalPage)>0"
            @click="paginate(currentPage+1)">
          <i class="la la-angle-right"></i>
        </a>
      </li>
      <li v-show="currentPage!=totalPage">
        <a
          title="Last"
          class="m-datatable__pager-link m-datatable__pager-link--last"
          @click="paginate(totalPage)">
          <i class="la la-angle-double-right"></i>
        </a>
      </li>
    </ul>
    <div class="m-datatable__pager-info" v-show="typeof init=='number'">
      <div class="dataTables_length">
        <label v-show="total>15">
          <select
            class="custom-select custom-select-sm form-control form-control-sm"
            v-model="max"
            title="Select page size"
            @change="changeSize"
            tabindex="-98">
            <option v-for="range in ranges" :value="range" :key="range">{{ range }}</option>
          </select>
        </label>
        &nbsp;&nbsp;<b>{{ init+1 }}</b> - <b>{{ max*currentPage }}</b> of <b>{{ total }}</b> records
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["start", "limit", "size"],
  data: function() {
    return {
      init: parseInt(this.start||0),
      max: parseInt(this.limit||15),
      total: parseInt(this.size||0),
      ranges:[15,30,50,70,100],
    };
  },
  methods: {
    paginate: function(value) {
      this.$emit("paginate", 'start', (value-1)*this.max);
    },
    changeSize:function(){
      this.$emit("paginate", 'limit', this.max);
    },
    getPages(init,final){
      var A = [init],step = 1;
      while(init+step<= final){
        A[A.length]= init+= step;
      }
      return A;
    }
  },
  computed: {
    totalPage: function() {
      return Math.ceil(this.total / this.max);
    },
    currentPage:function(){
      return Math.floor(this.init / this.max)+1;
    },
    showPages:function(){
      var init=(this.currentPage-3),fin=(this.currentPage+3);
      if(init<1){
        fin=fin+Math.abs(init);
        init=1;
      }
      if(fin>this.totalPage){
        fin=this.totalPage;
      }
      return (this.getPages(init,fin)||[]);
    }
  },
  watch: {
    start: function(newVal) {
      this.init = newVal;
    },
    limit: function(newVal) {
      this.max = newVal;
    },
    size: function(newVal) {
      this.total = newVal;
    },
  }
};
</script>
