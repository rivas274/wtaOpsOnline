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
            });
        }
        
    },
    mounted() {
        console.log(this.axios.defaults.headers.common['TOKEN'],this.axios.defaults.headers.common['USER']);
        this.getAssistance()
    },
}