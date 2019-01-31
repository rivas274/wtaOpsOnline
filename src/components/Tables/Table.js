export default {
    data: function () {
        return {
            resp: []
        }
    },
    methods: {
        getAssistance: function () {
            this.axios.post("getAssistance", {'start':'0','limit':'4'}).then(response => {
                this.resp = response.data;
                console.log(this.resp);
            });
        }
        
    },
    mounted: function () {
        this.getAssistance()
        
    },

}