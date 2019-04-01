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
        :src="image" 
        :class="[classProp]"
        v-tooltip="title"
        :style="{ maxHeight: cssActivePx(height), maxWidth: cssActivePx(width)}"
        alt>
</template>
<script>
export default {
    props:["src","default","height","width","classProp","title"],
    data:function () {
        return{
            image: this.src,
        }
    },
    methods:{
        imgUrlAlt:function () {
            this.image=this.default;
        },
        cssActivePx:function(val){
            val=parseInt(val);
            return val>0?val+'px':false;
        }
    }
}
</script>
