<template>
  <div class="m-datatable__pager m-datatable--paging-loaded clearfix">
    <ul class="m-datatable__pager-nav">
      <li>
        <a
          title="First"
          class="m-datatable__pager-link m-datatable__pager-link--first m-datatable__pager-link--disabled"
          data-page="1"
          disabled="disabled">
          <i class="la la-angle-double-left"></i>
        </a>
      </li>
      <li>
        <a
          title="Previous"
          class="m-datatable__pager-link m-datatable__pager-link--prev m-datatable__pager-link--disabled"
          data-page="1"
          disabled="disabled">
          <i class="la la-angle-left"></i>
        </a>
      </li>
      <li style="display: none;">
        <a
          title="More pages"
          class="m-datatable__pager-link m-datatable__pager-link--more-prev"
          data-page="1">
          <i class="la la-ellipsis-h"></i>
        </a>
      </li>
      <li style="display: none;">
        <input type="text" class="m-pager-input form-control" title="Page number">
      </li>
      <li>
        <a
          class="m-datatable__pager-link m-datatable__pager-link-number m-datatable__pager-link--active"
          data-page="1"
          title="1"
        >1</a>
      </li>
      <li>
        <a class="m-datatable__pager-link m-datatable__pager-link-number" data-page="2" title="2">2</a>
      </li>
      <li>
        <a class="m-datatable__pager-link m-datatable__pager-link-number" data-page="3" title="3">3</a>
      </li>
      <li>
        <a class="m-datatable__pager-link m-datatable__pager-link-number" data-page="4" title="4">4</a>
      </li>
      <li>
        <a class="m-datatable__pager-link m-datatable__pager-link-number" data-page="5" title="5">5</a>
      </li>
      <li>
        <a class="m-datatable__pager-link m-datatable__pager-link-number" data-page="6" title="6">6</a>
      </li>
      <li>
        <a
          title="More pages"
          class="m-datatable__pager-link m-datatable__pager-link--more-next"
          data-page="7"
        >
          <i class="la la-ellipsis-h"></i>
        </a>
      </li>
      <li>
        <a title="Next" class="m-datatable__pager-link m-datatable__pager-link--next" data-page="2">
          <i class="la la-angle-right"></i>
        </a>
      </li>
      <li>
        <a
          title="Last"
          class="m-datatable__pager-link m-datatable__pager-link--last"
          data-page="15">
          <i class="la la-angle-double-right"></i>
        </a>
      </li>
    </ul>
    <div class="m-datatable__pager-info">
      <div class="dropdown bootstrap-select m-datatable__pager-size" style="width: 70px;">
        <select
          class="selectpicker m-datatable__pager-size"
          title="Select page size"
          data-width="70px"
          data-selected="10"
          tabindex="-98"
        >
        <option class="bs-title-option">Select page size</option>
          <option v-for="(row, index) in content" :value="index">{{ index }}}</option>
        </select>
        <button
          type="button"
          class="btn dropdown-toggle btn-light"
          data-toggle="dropdown"
          role="button">
          <div class="filter-option">
            <div class="filter-option-inner">10</div>
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
  props: ["start", "limit", "size","range-size"],
  data: function() {
    return {
      init: (this.start||0),
      max: (this.limit||0),
      total: (this.size||0),
      ranges:(this.rangeSize||[10,20,30,50,100])
    };
  },
  computed: {
    totalPage: function() {
      return Math.ceil(this.total / this.max);
    }
  },
  watch: {
    start: function(newVal, oldVal) {
      this.init = newVal;
    },
    limit: function(newVal, oldVal) {
      this.max = newVal;
    },
    total: function(newVal, oldVal) {
      this.total = newVal;
    }
  }
};
</script>
