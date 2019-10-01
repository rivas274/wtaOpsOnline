export default {
    install(Vue) {
        Vue.directive('tooltip', function (el, binding) {
            if (binding.value) {
                $(el).attr('title', binding.value).tooltip({
                    title: binding.value,
                    placement: (binding.arg || 'top'),
                    trigger: 'hover',
                    html:true
                }).attr('data-original-title', binding.value);
            }
        })
    }
}