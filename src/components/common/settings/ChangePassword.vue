<template>
  <div class="collapse" id="collapsePassword">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="changePassword"
        :actions="false"
        :config="{
          classes: {
            outer: 'mx-auto',
            wrapper: 'mx-auto',
            messages: 'text-center',
            help: 'text-center'
          }
        }"
      >
        <FormKit
          type="password"
          name="old_password"
          :label="t('settings.oldpassword')"
          :help="t('settings.oldpasswordinfo')"
          validation="required"
          v-model="userInfo.oldPassword"
        />
        <FormKit
          type="password"
          name="password"
          :label="t('settings.newpassword')"
          :help="t('settings.newpasswordinfo')"
          validation="required"
          v-model="userInfo.newPassword"
        />
        <FormKit
          type="submit"
          :label="
            loading
              ? t('settings.changing')
              : statusCode !== 200
              ? t('settings.changepasswordnow')
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
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import type { ChangePassword } from '@/models/change_password_model'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const authStore = useAuthStore()
const { _statusCode: statusCode } = storeToRefs(authStore)

const loading = ref(false)
const changeLoadingState = () => {
  loading.value = !loading.value
}

const userInfo = reactive({
  oldPassword: '',
  newPassword: ''
})

const changePassword = async () => {
  console.log(userInfo)
  const model: ChangePassword = {
    oldPassword: userInfo.oldPassword,
    newPassword: userInfo.newPassword
  }
  changeLoadingState()
  await authStore.changePassword(model).then(() => {
    changeLoadingState()
    setTimeout(() => {
      authStore.$patch({
        statusCode: 0
      })
    }, 2000)
  })
}
</script>

<style scoped></style>
