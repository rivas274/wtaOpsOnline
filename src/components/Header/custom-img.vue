<style>
img[alt]:after {  
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  content: attr(alt);
}
</style>
<template>
    <img v-show="imgUrlAlt"
        @error="imgUrlAlt"
        :src="srcFlag" 
        :class="{ class: true }" 
        :style="{ maxHeight: cssActivePx(height), maxWidth: cssActivePx(width)}"
        alt>
</template>
<script>
export default {
    props:["path","src","default","height","width",'class'],
    data:function () {
        return{
            image: this.src,
        }
    },
    computed:{
        srcFlag:function() {
            return this.axios.defaults.baseURL.split('/app/')[0]+this.image;
        }
    },
    methods:{
        imgUrlAlt:function (event) {
            this.image=this.default;
        },
        cssActivePx:function(val){
            val=parseInt(val);
            return val>0?val+'px':false;
        }
    }
}
</script>
