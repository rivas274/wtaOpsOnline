<template>
    <img @error="imgUrlAlt" :src="srcFlag" :height='height' :width='width'>
</template>
<script>
export default {
    props:["iso","f-height","f-width"],
    data:function () {
        return{
            flag: this.iso,
            height: (this.fHeight||30),
            width: (this.fWidth||40),
        }
    },
    computed:{
        srcFlag:function() {
            return this.axios.defaults.baseURL.split('/app/')[0]+"/app/images/flags_iso/svg/"+this.flag.toString().toLowerCase()+".svg";
        }
    },
    methods:{
        imgUrlAlt:function (event) {
            this.flag='_unknown';
            event.target.src=this.srcFlag;
        }
    }
}
</script>
