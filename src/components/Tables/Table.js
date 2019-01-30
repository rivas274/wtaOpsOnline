export default {
    data: function () {
        return {
            resp: []
        }
    },
    methods: {
        getAssistance: function () {
            this.axios.post("getAssistance", {'prefix':'RC','start':'1','limit':'11'}).then(response => {
                this.resp = response.data;
                console.log(this.resp.results)
            });
        }
        
    },
    mounted: function () {
        this.getAssistance()
        
    },

}