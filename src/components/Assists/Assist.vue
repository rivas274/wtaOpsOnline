<template>
    <div class="container">
        <h1>{{ codigoAssist }}</h1>
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