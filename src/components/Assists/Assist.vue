<template>
    <div class="container">
        <pre>{{ codigoAssist }}</pre>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                codigoAssist: this.$route.params.code
            }
        },
       
    }
</script>