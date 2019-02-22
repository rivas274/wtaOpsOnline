export default {
    install(Vue) {
        Vue.filter('ucwords',  str => {
            return (typeof forma === 'string')?str.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
                function (s) {
                    return s.toUpperCase();
                }):str;
        });
        Vue.filter("lower", str => {
            return (typeof forma === 'string')? str.toLowerCase(): str;
        });
        Vue.filter("currency", (amount,currency) => {
            let formatter=new Intl.NumberFormat('es', {
                style: 'currency',
                currency: (currency||'USD'),
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            return formatter.format(amount);
        });
    }
}