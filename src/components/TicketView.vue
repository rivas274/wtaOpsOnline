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
            this.fetchItems();
        },

        methods: {
            fetchItems()
            {
              let uri = 'http://localhost:8081/api/customers';
              this.axios.get(uri).then((response) => {
                  this.tickets = response.data;
                  console.log(response)
              });
            }
        }
    }
</script>