<template>
  <div class="collapse" id="collapseEditProfile">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="updateProfile"
        :actions="false"
        :config="{
          classes: {
            outer: 'mx-auto',
            wrapper: 'mx-auto',
            messages: 'text-center'
          }
        }"
      >
        <FormKit type="text" :label="t('settings.fullName')" v-model="userObject.fullName" />
        <FormKit type="text" :label="t('settings.username')" v-model="userObject.userName" />
        <FormKit type="textarea" :label="t('settings.bio')" rows="3" v-model="userObject.bio" />
        <FormKit
          type="email"
          :label="t('settings.email')"
          validation="required|email|ends_with:.com"
          placeholder="example@mail.com"
          v-model="userObject.email"
        />
        <FormKit
          type="date"
          :label="t('settings.dateofbirth')"
          :validation="`required|date_before:${new Date()}`"
          v-model="userObject.birthdayDate"
        />

        <FormKit
          type="select"
          :label="t('settings.gender')"
          placeholder="Select a gender"
          :options="[
            { label: t('settings.woman'), value: '1' },
            { label: t('settings.man'), value: '2' },
            { label: t('settings.other'), value: '3' }
          ]"
          validation="required"
          v-model="userObject.gender"
        />

        <FormKit
          type="text"
          :label="t('settings.title')"
          v-model="userObject.title"
          placeholder="Title"
        />

        <FormKit
          type="submit"
          :label="
            loading
              ? t('settings.saving')
              : statusCode !== 200
              ? t('settings.savechanges')
              : t('settings.success')
          "
          wrapper-class="text-center"
          :classes="{ input: 'w-100 rounded-5' }"
          :disabled="loading || statusCode === 200"
        />
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import type { UpdateProfileModel } from '../../../models/update_profile_model'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
const userStore = useUserStore()
const { _statusCode: statusCode } = storeToRefs(userStore)

const loading = ref(false)
const changeLoadingState = () => {
  loading.value = !loading.value
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  // console.log(`${day}-${month}-${year}`);

  return `${year}-${month}-${day}`
}

const userObject = reactive({
  fullName: user.value.fullName,
  userName: user.value.userName,
  bio: user.value.bio as string,
  email: user.value.email,
  birthdayDate: formatDate(user.value.birthdayDate!),
  gender: String(user.value.gender),
  title: ''
})

const updateProfile = async () => {
  const updateProfileModel: UpdateProfileModel = {
    fullName: userObject.fullName,
    userName: userObject.userName,
    bio: userObject.bio!,
    email: userObject.email,
    birthdayDate: new Date(userObject.birthdayDate),
    gender: Number(userObject.gender),
    title: userObject.title
  }
  changeLoadingState()
  await userStore.updateProfile(updateProfileModel).then(() => {
    changeLoadingState()
    setTimeout(() => {
      userStore.$patch({
        statusCode: 0
      })
    }, 2000)
  })
}
</script>

<style scoped></style>
