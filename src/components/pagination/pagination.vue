<template>
  <div class="m-datatable__pager m-datatable--paging-loaded clearfix" v-if="showPages.length>1">
    <ul class="m-datatable__pager-nav">
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
      <li v-for="page in showPages">
        <a
          class="m-datatable__pager-link m-datatable__pager-link-number"
          :class="{'m-datatable__pager-link--active':(currentPage==page)}"
          :data-page="page"
          :title="page"
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
    <div class="m-datatable__pager-info">
      <div class="dropdown bootstrap-select m-datatable__pager-size" style="width: 70px;">
        <select
          class="selectpicker m-datatable__pager-size"
          data-width="70px"
          tabindex="-98">
          <option class="bs-title-option" v-model="max" @change="changeSize">Select page size</option>
          <option v-for="(row, index) in content" :value="index">{{ index }}</option>
        </select>
        <button
          type="button"
          class="btn dropdown-toggle btn-light"
          data-toggle="dropdown"
          role="button">
          <div class="filter-option">
            <div class="filter-option-inner">{{ max }}</div>
          </div>&nbsp;
          <span class="bs-caret">
            <span class="caret"></span>
          </span>
        </button>
        <div class="dropdown-menu" role="combobox">
          <div class="inner show" role="listbox" aria-expanded="false" tabindex="-1">
            <ul class="dropdown-menu inner show"></ul>
          </div>
        </div>
      </div>
      <span class="m-datatable__pager-detail">Displaying {{ init }} - {{ max*init }} of {{ total }} records</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["start", "limit", "size"],
  data: function() {
    return {
      init: (this.start||0),
      max: (this.limit||10),
      total: (this.size||0),
      ranges:[10,20,30,50,100],
    };
  },
  methods: {
    paginate: function(value) {
      this.$emit("paginate", 'start', (value-1)*this.max);
    },
    changeSize:function(){
      this.$emit("paginate", 'size', this.max);
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
    start: function(newVal, oldVal) {
      this.init = newVal;
    },
    limit: function(newVal, oldVal) {
      this.max = newVal;
    },
    size: function(newVal, oldVal) {
      this.total = newVal;
    },
  }
};
</script>
