export default {
    install(Vue) {
        Vue.directive('tooltip', function (el, binding) {
            if (binding.value) {
                $(el).tooltip({
                    title: binding.value,
                    placement: (binding.arg || 'top'),
                    trigger: 'hover'
                });
            }
        })
    }
}