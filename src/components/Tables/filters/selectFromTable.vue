<template>
  <div class="col-md-4" v-if="options.length>0">
    <div class="m-form__group m-form__group--inline">
      <div class="m-form__label">
        <label><slot></slot></label>
      </div>
      <div class="m-form__control">
        <div class="dropdown bootstrap-select form-control m-bootstrap-select">
          <select class="form-control m-bootstrap-select" 
                  v-model="selected" 
                  :id="'m_form_'+name" 
                  @change="input" 
                  tabindex="-98">
            <option>All</option>
            <option v-for="opt in options" :value="opt.id">{{ opt.name }}</option>
          </select>
          <button
            type="button"
            class="btn dropdown-toggle bs-placeholder btn-light"
            data-toggle="dropdown"
            role="button"
            :data-id="'m_form_'+name"
            title="All"
          >
            <div class="filter-option">
              <div class="filter-option-inner">All</div>
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
      </div>
    </div>
    <div class="d-md-none m--margin-bottom-10"></div>
  </div>
</template>
<script>
export default {
  props: ["options", "name","selected"],
  data: function () {
        return {
            name: this.name,
            options: (this.options||[]),
            selected: (this.selected||''),
        }
    },
    methods: {
        input: function () {
            this.$emit('input', this.name, this.selected);
        }
    },
};
</script>