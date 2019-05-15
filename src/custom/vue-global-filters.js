export default {
    install(Vue) {
        Vue.filter('ucwords', str => {
            return (typeof str === 'string') ? str.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
                function (s) {
                    return s.toUpperCase();
                }) : str;
        });
        Vue.filter("lower", str => {
            return (typeof str === 'string') ? str.toLowerCase() : str;
        });
        Vue.filter("firstLetter", str => {
            return str.toString().split('')[0].toUpperCase();
        });
        Vue.filter("genreDetaill", str => {
            var genreDetaill = {
                'M': 'Male',
                'F': 'Female',
                'I': 'Indefined',
            }
            str = (typeof str === 'string') ? str.toUpperCase() : str;
            return genreDetaill[str] || genreDetaill['I'];
        });
        Vue.filter("currency", (amount, currency) => {
            currency = currency instanceof String && currency.length==3 ? currency : 'USD';
            let formatter = new Intl.NumberFormat('es', {
                style: 'currency',
                currency: (currency || 'USD'),
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            return formatter.format(amount);
        });
        Vue.filter("toFixed", (amount, decimal) => {
            amount = parseFloat(amount);
            return (typeof decimal === 'number')?parseFloat(amount.toFixed(decimal)):amount;
        });
    }
}