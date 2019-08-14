import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate';
import validationMessagesEn from 'vee-validate/dist/locale/en';
import validationMessagesEs from 'vee-validate/dist/locale/es';
import validationMessagesPt from 'vee-validate/dist/locale/pt_BR';

Vue.use(VueI18n);

Vue.use(VeeValidate, {
    i18nRootKey: 'validations',
    VueI18n,
    dictionary: {
        en: validationMessagesEn,
        es: validationMessagesEs,
        pt: validationMessagesPt,
    }
});

function loadLocaleMessages() {
  /* eslint-disable no-undef */
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([a-z0-9]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}
const $i18n=new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
});
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
      return value.toString().split('').length>0;
  }
});
export default $i18n;
