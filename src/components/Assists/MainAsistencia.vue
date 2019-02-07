<style>
  .m-tabs-line .m-tabs__item {
    margin-right: 5px;
  }
  .m-tabs-line .m-tabs__item a{
    padding-right: 15px;
    font-size: 1.3rem;
  }
  .m-tabs-line .m-tabs__item .fa{
    font-size: 1.5rem !important;
  }
</style>
<template>
  <content-m :navigation="[{title:'list'}]">
    <template slot="title">Assistance</template>
    <!-- <template slot="header">Assistance</template> -->
    <template slot="body">
      <ul class="nav nav-tabs m-tabs-line m-tabs-line--success m-tabs-line--2x" role="tablist">
        <li class="nav-item m-tabs__item">
          <a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_tab_list">
            <i class="fa fa-briefcase-medical" aria-hidden="true"></i>
            List
          </a>
        </li>
        <li class="nav-item m-tabs__item" v-for="assist in assistances" :key="assist.code" :data-assist="assist">
          <a class="nav-link m-tabs__link" data-toggle="tab" :href="'#m_tab_assit'+assist.code">{{ assist.code }}</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="m_tab_list" role="tabpanel">
          <ListAsistencia></ListAsistencia>
        </div>
        <div v-for="assist in assistances" :key="assist.code" class="tab-pane" :id="'m_tab_assit'+assist.code" role="tabpanel">
          {{assist}}
        </div>
      </div>
    </template>
  </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListAsistencia from "./ListAsistencia.vue";
import func from './vue-temp/vue-editor-bridge';
export default {
  components: {
    contentM,
    ListAsistencia
  },
  data(){
      return{
          assistances: [{code:''}]
      }
  },
  mounted(){
    let _self = this;
    $(_self.$el).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
      console.log(e,this,$(this).data('assist'));
    });
  },
  methods:{
    addAssist:function (code) {
      
    },
    removeAssist:function(code){

    }
  }
};
</script>