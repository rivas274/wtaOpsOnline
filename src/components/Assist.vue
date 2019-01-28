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
        mounted(){
            console.log('aca obtendria la asistencia')
        }
    }
</script>