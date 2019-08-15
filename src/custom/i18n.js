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

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
});
