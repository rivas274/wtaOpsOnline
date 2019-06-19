import VeeValidate from 'vee-validate';

VeeValidate.Validator.extend('verify_password', {
    getMessage: field => `The ${field} must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`,
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*[!@#$%^&*])(?=.{8,}))?");
        return strongRegex.test(value);
    }
});
VeeValidate.Validator.extend('recaptcha', {
    getMessage: () => `Please complete the captcha`,
    validate: value => {
        return value.toString().split('').length>0;
    }
});

export default VeeValidate;