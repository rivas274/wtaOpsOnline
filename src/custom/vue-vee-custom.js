import VeeValidate from 'vee-validate';

VeeValidate.Validator.extend('verify_password', {
    getMessage: field => {
        return `The ${field} must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`;
    },
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*[!@#$%^&*])(?=.{8,}))?");
        return strongRegex.test(value);
    }
});
VeeValidate.Validator.extend('recaptcha', {
    getMessage: () => `Please complete the captcha`,
    validate: value => {
        return value.toString().split('').length > 0;
    }
});
VeeValidate.Validator.extend('alpha_numeric_space', {
    getMessage: field => {
        return `The ${field} may only contain alphabetic characters, numbers and spaces`;
    },
    validate: value => {
        var strongRegex = new RegExp("^[a-zA-Z0-9ÑÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖßÙÚÛÜÝñàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s]+$");
        return strongRegex.test(value);
    }
});
VeeValidate.Validator.extend('zip_code', {
    getMessage: field => {
        return `Enter a valid zip code (Ex. 12345-1234 or 12345)`;
    },
    validate: value => {
        var strongRegex = new RegExp("^[0-9]{4,5}([- ]?[0-9]{0,4})?$");
        return strongRegex.test(value);
    }
});
export default VeeValidate;