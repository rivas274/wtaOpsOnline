export default {
    install(Vue) {
        Vue.filter('ucwords',  str => {
            return str.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
                function (s) {
                    return s.toUpperCase();
                });
        });
        Vue.filter("lower", str => {
            return str.toLowerCase();
        })
    }
}