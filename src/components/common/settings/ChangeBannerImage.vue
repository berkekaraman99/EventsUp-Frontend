<template>
  <div class="collapse" id="collapseBannerImage">
    <div class="card card-body">
      <FormKit
        type="form"
        @submit="changeBannerImage"
        :actions="false"
        :config="{
          classes: {
            outer: 'mx-auto',
            wrapper: 'mx-auto',
            messages: 'text-center'
          }
        }"
      >
        <FormKit
          type="file"
          :label="t('settings.file')"
          accept=".png,.jpg,.jpeg"
          multiple="true"
          v-on:change="onFileChangeBanner"
        />
        <div class="d-flex align-items-center justify-content-center">
          <FormKit
            type="submit"
            :label="t('settings.changebanner')"
            wrapper-class="text-center"
            :classes="{ input: 'rounded-5' }"
          />
          <FormKit
            type="button"
            :label="
              loading
                ? t('settings.removing')
                : statusCode !== 200
                ? t('settings.removebanner')
                : t('settings.success')
            "
            @click="removeBannerImage"
            wrapper-class="text-center"
            :classes="{ input: 'bg-danger rounded-5' }"
            :disabled="loading || statusCode === 200"
          />
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const userStore = useUserStore()
const { _statusCode: statusCode } = storeToRefs(userStore)

const loading = ref(false)
const changeLoadingState = () => {
  loading.value = !loading.value
}

const bannerImage: any = ref(null)
const onFileChangeBanner = (e: any) => {
  let files = e.target.files || e.dataTransfer.files
  bannerImage.value = files[0]
}

const changeBannerImage = async () => {
  const body: FormData = new FormData()
  body.append('File', bannerImage.value)
  try {
    await userStore.changeBannerImage(body).then(() => {})
  } catch (error: any) {
    console.log(error.response.data)
  }
}

const removeBannerImage = async () => {
  changeLoadingState()
  await userStore.removeBannerImage().then(async () => {
    await userStore.getUserById(props.id)
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
