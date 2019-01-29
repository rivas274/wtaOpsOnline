<template>
    <div class="container">
        <h1>Tickets</h1>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                tickets: []
            }
        },
        created()
        {
            console.log('created TOKEN',this.$session.get('TOKEN'));
            this.axios.post("getToken").then(response => { console.log(response)});
        },
    }
</script>