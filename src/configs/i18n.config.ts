import { createI18n } from 'vue-i18n'

//Translations
import * as en from '../locales/en.json'
import * as tr from '../locales/tr.json'
import * as de from '../locales/de.json'
import * as ja from '../locales/ja.json'

const options = {
  legacy: false,
  globalInjection: true,
  allowComposition: true,
  locale: localStorage.getItem('locale') ?? 'tr',
  fallbackLocale: localStorage.getItem('fallbacklocale') ?? 'tr',
  messages: { tr: tr.default, en: en.default, de: de.default, ja: ja.default }
}

export const i18n = createI18n<false>(options)
