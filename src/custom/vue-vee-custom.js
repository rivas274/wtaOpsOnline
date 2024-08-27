import VeeValidate, { Validator } from 'vee-validate';
import customAxios from './axios-custom';

Validator.extend('verify_password', {
    getMessage: field => {
        return `The ${field} must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number`;
    },
    validate: value => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongRegex.test(value);
    }
});
const cacheCaptcha = {};

Validator.extend('recaptcha', {
    getMessage: () => `Please complete the captcha`,
    validate: async value => {
        console.log('recaptcha', value);
        //si esta vacío retornamos false
        if (value.toString().split('').length === 0) {
            return false;
        }
        if (value in cacheCaptcha) {
            return cacheCaptcha[value];
        }
        //validamos el captcha con axios llamando a por post a checkCaptcha
        try {
            const response = await customAxios.post('checkCaptcha', {
                'g-recaptcha': value
            });
            cacheCaptcha[value] = response.data.STATUS === 'OK';
        } catch (error) {
            console.error('Error:', error);
            cacheCaptcha[value] = false;
        }
        return cacheCaptcha[value];
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
        const strongRegex = /^[0-9A-Za-z]{3,5}[\s-]?[0-9A-Za-z]{0,4}$/;
        return strongRegex.test(value);
    }
});
Validator.extend('max_size', {
    getMessage:  field => `El archivo ${field} es demasiado grande. El tamaño máximo permitido es de 30 MB.`,
    validate: value => {
        if (!value || !value.length) {
            return true;
        }
        const file = value[0];
        const maxBytes = 30 * 1024 * 1024;
        return file.size <= maxBytes;
    }
});
export default VeeValidate;