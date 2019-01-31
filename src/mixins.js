export default {
    methods: {
        fetchData : function(url)
        {
            let uri = url;
            return this.axios.get(uri).then((response) => {
                return response.data;
                
            });
        }
    }
}