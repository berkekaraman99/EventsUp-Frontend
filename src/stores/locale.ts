import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('localeStore', {
  state: () => ({
    locale: localStorage.getItem('locale') != null ? localStorage.getItem('locale') : 'tr'
  }),
  getters: {
    _locale: (state: any) => state.locale
  },
  actions: {
    async updateLocale(locale: string) {
      this.locale = locale
    }
  }
})
