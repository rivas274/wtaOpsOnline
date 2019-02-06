<template>
    <img @error="imgUrlAlt" 
        :src="srcFlag" 
        :class="{ class: true }" 
        :style="{ maxHeight: cssActivePx(fHeight), maxWidth: cssActivePx(fWidth)}">
</template>
<script>
export default {
    props:["path","src","default","f-height","f-width",'class'],
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
