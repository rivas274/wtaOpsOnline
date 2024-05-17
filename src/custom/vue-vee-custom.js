import  VeeValidate, { Validator } from 'vee-validate';

Validator.extend('verify_password', {
    getMessage: field => {
        return `The ${field} must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`;
    },
    validate: value => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongRegex.test(value);
    }
});
Validator.extend('recaptcha', {
    getMessage: () => `Please complete the captcha`,
    validate: value => {
        return value.toString().split('').length > 0;
    }
});
Validator.extend('alpha_numeric_space', {
    getMessage: field => {
        return `The ${field} may only contain alphabetic characters, numbers and spaces`;
    },
    validate: value => {
        const strongRegex = /^[a-zA-Z0-9ÑÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖßÙÚÛÜÝñàáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s]+$/;
        return strongRegex.test(value);
    }
});
Validator.extend('numeric_space', {
    getMessage: field => {
        return `he ${field} may only contain numbers, spaces, and hyphens (-).`;
    },
    validate: value => {
        console.log('numeric_space', value);
        const regex = /^\d+(?:\s*-?\d+)*$/;
        return regex.test(value);
    }
});
Validator.extend('zip_code', {
    getMessage: field => {
        return `Enter a valid zip code (Ex. 12345-1234 or 12345)`;
    },
    validate: value => {
        const strongRegex = /^\d{4,5}(-?\d{0,4})$/;
        return strongRegex.test(value);
    }
});
export default VeeValidate;