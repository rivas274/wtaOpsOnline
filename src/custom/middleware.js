var Middleware = {
    permission: {},
    access: function (action, option) {
        if (!action) {
            return false;
        }
        if (!option) {
            return false;
        }
        return this.permission[action][option];
    }
}
Middleware.install = function (Vue, options) {
    this.permission = options;
    Vue.prototype.$canSee = Vue.$canSee = function (userType) {
        if (!Vue._session.exists() || !Array.isArray(userType)) {
            return false;
        }
        return userType.includes(parseInt(Vue._session.get('idUserType')));
    }
    Vue.prototype.middleware = Vue.$middleware = function (action, option) {
        /*Obtenemos los permisos personalizados por usuario */
        let permission = Vue._session.get('permission');
        if (permission) {
            if (action in permission) {
                return permission[action][option] ? permission[action][option] == 'Y' : false;
            }
        }
        return Vue.$canSee(Middleware.access(action, option));
    }
}
export default Middleware;