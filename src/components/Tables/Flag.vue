<style scoped>
    img{
        height:28px;
        width:37px;
    }
</style>
<template>
    <img :onerror="imgErrorFlag" :src="srcFlag">
</template>
<script>
export default {
    props:["iso"],
    data:function () {
        return{
            flag: this.iso
        }
    },
    mounted:{
        onerror:function () {
            this.flag='_unknown';
        }
    },
    computed:{
        srcFlag:function() {
            return this.axios.defaults.baseURL.split('/app/')[0]+"/app/images/flags_iso/svg/"+this.flag.toString().toLowerCase()+".svg";
        }
    }
}
</script>
