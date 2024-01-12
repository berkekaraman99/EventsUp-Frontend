import { instance } from '../utils/network_manager'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import type { IUser } from '@/models/user_model'
import type { IUserSuggestions } from '@/models/user_suggestions_model'
import type { IUserFollowers } from '@/models/user_followers_model'
import type { IUserFollowings } from '@/models/user_followings_model'
import type { IFollowSuggestion } from '@/models/follow_suggestion_model'
import type { IUserFollowerRequest } from '@/models/user_follower_request'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    currentUser: {} as IUser,
    userFollowings: [] as Array<IUserFollowings>,
    userFollowers: [] as Array<IUserFollowers>,
    userFollowersRequests: [] as Array<IUserFollowerRequest>,
    userSuggestions: [] as Array<IUserSuggestions>,
    followSuggestions: [] as Array<IFollowSuggestion>,
    statusCode: 0 as number
  }),
  getters: {
    _currentUser: (state: any) => state.currentUser as IUser,
    _userFollowings: (state: any) => state.userFollowings as Array<IUserFollowings>,
    _userFollowers: (state: any) => state.userFollowers as Array<IUserFollowers>,
    _userSuggestions: (state: any) => state.userSuggestions as Array<IUserSuggestions>,
    _followSuggestions: (state: any) => state.followSuggestions as Array<IFollowSuggestion>,
    _userFollowersRequests: (state: any) =>
      state.userFollowersRequests as Array<IUserFollowerRequest>,
    _statusCode: (state: any) => state.statusCode as number
  },
  actions: {
    //FOLLOW
    async followUser(targetId: String) {
      try {
        const res = await instance.post('/User/follow', { targetId })
        // console.log(res)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //UNFOLLOW
    async unfollowUser(targetId: string) {
      try {
        const res = await instance.post('/User/unfollow', { targetId })
        // console.log(res)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET USER BY ID
    async getUserById(id: string) {
      try {
        const res = await instance.get(`/User/GetUserById?userid=${id}`)
        // console.log(res.data)
        this.currentUser = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET USER BY NAME
    async getUserByUsername(name: string) {
      try {
        const res = await instance.get(`/User/${name}`)
        // console.log(res.data)
        this.currentUser = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET USER SUGGESTIONS
    async getUserSuggestions() {
      try {
        const res = await instance.get('/User/suggestions')
        // console.log(res.data)
        this.userSuggestions = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET FOLLOW SUGGESTIONS
    async getFollowSuggestions() {
      try {
        const res = await instance.get('/User/follow-suggestions')
        // console.log(res.data)
        this.followSuggestions = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //BLOCK USER
    async blockUser(targetId: FormData) {
      try {
        const res = await instance.post('/User/Block', targetId)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //UNBLOCK USER
    async unblockUser(targetId: FormData) {
      try {
        const res = await instance.post('/User/Unblock', targetId)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //DELETE USER
    async deleteUser(password: string) {
      try {
        const res = await instance.post('/User/Delete', { password })
        this.statusCode = res.data.statusCode
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
        if (this.statusCode === 200) {
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('userToken')
          localStorage.removeItem('user')
          location.reload()
        }
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //CHANGE PRIVACY
    async changeUserPrivacy(info: any) {
      try {
        const res = await instance.post('/User/privacy-change', info)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //CHANGE USER PROFILE IMAGE
    async changeProfileImage(image: any) {
      try {
        const res = await instance.post('/User/ChangeProfileImage', image)
        // console.log(res.data)
        this.statusCode = res.data.statusCode
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
        await useAuthStore().getUserAfterLogin()
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //REMOVE PROFILE IMAGE
    async removeProfileImage() {
      try {
        const res = await instance.post('/user/remove-profile-image', {})
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //CHANGE USER BANNER IMAGE
    async changeBannerImage(image: FormData) {
      try {
        const res = await instance.post('/User/ChangeBannerImage', image)
        // console.log(res.data)
        this.statusCode = res.data.statusCode
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
        await useAuthStore().getUserAfterLogin()
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //REMOVE BANNER IMAGE
    async removeBannerImage() {
      try {
        const res = await instance.post('/user/remove-banner-image', {})
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET FOLLOWINGS
    async getUserFollowings(userId: string, query: string) {
      try {
        const res = await instance.get(`/user/${userId}/followings?query=${query}`)
        // console.log(res.data)
        this.userFollowings = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET FOLLOWERS
    async getUserFollowers(userId: string, query: string) {
      try {
        const res = await instance.get(`/user/${userId}/followers?query=${query}`)
        // console.log(res.data)
        this.userFollowers = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //GET FOLLOWERS REQUESTS
    async getFollowersRequests(userId: string) {
      try {
        const res = await instance.get(`/user/incoming-requests/${userId}`)
        // console.log(res.data)
        this.userFollowersRequests = res.data.data
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //ACCEPT FOLLOW REQUEST
    async acceptFollowRequest(targetId: string) {
      try {
        const res = await instance.post(`/User/accept-follow-request/${targetId}`)
        this.statusCode = res.data.statusCode
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //DECLINE FOLLOW REQUEST
    async declineFollowRequest(targetId: string) {
      try {
        const res = await instance.post(`/user/decline-follow-request/${targetId}`)
        this.statusCode = res.data.statusCode
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //DECLINE FOLLOW REQUEST
    async removeFollowRequest(targetId: String) {
      try {
        const res = await instance.post(`/User/remove-follow-request/${targetId}`)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //REMOVE USER FROM FOLLOWERS
    async removeUserFromFollowers(targetId: string) {
      try {
        const res = await instance.post('/user/remove-follower', { targetId })
        // console.log(res.data)
        this.statusCode = res.data.statusCode
        this.userFollowers = this.userFollowers.filter((t: any) => {
          return t.id !== targetId
        })
      } catch (error: any) {
        console.error(error.message)
      }
    },

    //UPDATE PROFILE
    async updateProfile(updatedInformations: object) {
      try {
        const res = await instance.post('/user/update-profile', updatedInformations)
        this.statusCode = res.data.statusCode
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
        // console.log(res.data)
      } catch (error: any) {
        console.error(error.message)
      }
    }
  }
})
