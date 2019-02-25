var permission = null;
var Middleware = {
    permission: function (action, option) {
        if (!action) {
            console.log("permission no register",action);
            return false;
        }
        if (!option) {
            console.log("Option no register",option);
            return false;
        }
        return permission[action][option];
    }
}
Middleware.install = function (Vue, options) {
    permission = options;
    Vue.prototype.$canSee = Vue.$canSee = function (userType) {
        if (!Vue._session.exists() || !Array.isArray(userType)) {
            return false;
        }
        return userType.includes(parseInt(Vue._session.get('idUserType')));
    }
    Vue.prototype.middleware = Vue.$middleware = function (action,option) {
        return Vue.$canSee(Middleware.permission(action,option));
    }
}
export default Middleware;