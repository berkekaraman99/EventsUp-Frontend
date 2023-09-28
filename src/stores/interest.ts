import { instance } from '@/utils/network_manager'
import { defineStore } from 'pinia'

export const useInterestStore = defineStore('interestStore', {
  state: () => ({
    interests: []
  }),
  getters: {
    _interests: (state: any) => state.interests as Array<any>
  },
  actions: {
    async getAllInterest() {
      try {
        const res = await instance.get('/Interest/all')
        console.log(res)
      } catch (error: any) {
        console.log(error)
      }
    }
  }
})
