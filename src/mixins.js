export default {
    methods: {
        fetchData : function(url)
        {
            let uri = url;
            return this.axios.get(uri).then((response) => {
                console.log(response.data);
                return response.data;
            });
        }
    }
}