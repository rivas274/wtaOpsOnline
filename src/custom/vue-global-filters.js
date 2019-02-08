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
        });
        Vue.filter("currency", amount => {
            let formatter=new Intl.NumberFormat('es', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            return formatter.format(amount);
        });
    }
}