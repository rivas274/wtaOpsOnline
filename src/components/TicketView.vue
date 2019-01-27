<template>
    <div class="container">
        <h1>Tickets</h1>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Email ID</td>
                <td>Description</td>
            </tr>
            </thead>
            <tbody>
               <tr v-for="ticket in tickets" :key="ticket.id">
                    <td>{{ ticket.id }}</td>
                    <td>{{ ticket.firstname }}</td>
                    <td>{{ ticket.lastname }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                tickets: []
            }
        },

        created: function()
        {
           this.fetchData('http://apilayer.net/api/historical?access_key=3da0e9a1d2bb1bee46cb1dc1b2302aa7&date=2018-09-19&source=USD&currencies=COP')
        },

        
    }
</script>