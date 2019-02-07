<template>
    <custom-img :src="path+flag" :default="path+'_unknown.svg'" :height='(height||30)' :width='(width||40)'>
    </custom-img>
</template>
<script>
import customImg from "../Element/custom-img.vue";
export default {
    components:{
        customImg
    },
    props:["iso","height","width"],
    data:function () {
        return{
            flag: this.iso.toString().toLowerCase()+".svg",
            path:'/app/images/flags_iso/svg/'
        }
    }
}
</script>
