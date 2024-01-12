<template>
  <div class="col-12 col-sm-12 col-md-6">
    <Teleport to="body">
      <the-toast
        :show-toast="showToast"
        :status-code="statusCode"
        :header="header"
        :content="content"
      ></the-toast>
    </Teleport>
    <div class="container-fluid d-flex justify-content-center overflow-auto vh-100">
      <div class="row w-100 align-items-center mt-4">
        <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
          <p class="fw-bold text-center fs-2 py-4">{{ t('signup.header') }}</p>
          <FormKit type="form" submit-label="Hesap Oluştur" @submit="handleSignUp" :actions="false">
            <FormKit
              type="multi-step"
              tab-style="progress"
              valid-step-icon="star"
              :allow-incomplete="false"
              :hide-progress-labels="true"
              :classes="{
                outer: 'mx-auto',
                wrapper: 'mx-auto',
                steps: 'border-0 rounded-4 bg-body-tertiary shadow-none'
              }"
            >
              <FormKit type="step" name="Step One">
                <FormKit
                  type="text"
                  :label="t('signup.name')"
                  validation="required"
                  v-model="userObject.fullName"
                  :classes="{
                    inner: 'rounded-1'
                  }"
                />
                <FormKit
                  type="email"
                  :label="t('signup.email')"
                  validation="required|email"
                  v-model="userObject.email"
                  :classes="{
                    inner: 'rounded-1',
                    prefixIcon: 'rounded-1'
                  }"
                />
              </FormKit>

              <FormKit type="step" name="Step Two">
                <FormKit
                  type="text"
                  :label="t('signup.username')"
                  validation="required"
                  v-model="userObject.userName"
                  :classes="{
                    inner: 'rounded-1',
                    prefixIcon: 'rounded-1'
                  }"
                />
                <FormKit
                  type="password"
                  :label="t('signup.password')"
                  validation="required"
                  v-model="userObject.password"
                  :classes="{
                    inner: 'rounded-1',
                    prefixIcon: 'rounded-1'
                  }"
                />
                <FormKit
                  type="select"
                  :label="t('signup.gender')"
                  :placeholder="t('signup.genderplaceholder')"
                  :options="[
                    { label: t('signup.woman'), value: '1' },
                    { label: t('signup.man'), value: '2' },
                    { label: t('signup.other'), value: '3' }
                  ]"
                  validation="required"
                  v-model="userObject.gender"
                  :classes="{
                    inner: 'rounded-1'
                  }"
                />
              </FormKit>
            </FormKit>
            <FormKit
              type="checkbox"
              :label="t('signup.terms')"
              :help="t('signup.agreeterms')"
              name="terms"
              :value="isAccepted"
              @click="handleCheckbox"
              validation="accepted"
              validation-visibility="dirty"
              wrapper-class="justify-content-center mx-auto"
              outer-class="text-center"
            />
            <div class="text-center mt-4 tw-text-sm">
              <p>
                {{ t('signup.haveanaccount') }}
                <span class="text-primary pointer" @click="changetype('the-signin')">{{
                  t('signup.login')
                }}</span>
              </p>
            </div>
            <FormKit
              type="submit"
              :label="t('signup.signup')"
              :disabled="!isAccepted"
              :wrapper-class="{
                'formkit-wrapper': false,
                'mx-auto text-center': true
              }"
              :classes="{
                input: 'rounded-1'
              }"
            />
          </FormKit>
          <!-- PUSH LOGIN -->

          <div class="d-flex justify-content-center align-items-center my-4">
            <span class="text-secondary">{{ t('signup.or') }}</span>
          </div>

          <!-- ALTERNATIVE SIGNUPS -->
          <div class="alternative-logins my-4">
            <div
              class="shadow-sm mt-3 rounded-3 w-100 d-flex align-items-center justify-content-center tw-bg-black hover:tw-bg-slate-900 pointer py-2 text-white"
            >
              <i class="fa-brands fa-apple fa-lg me-2"></i>
              <span class="fw-bold">{{ t('login.apple') }}</span>
            </div>

            <div
              class="d-flex align-items-center justify-content-center shadow-sm rounded-3 my-3 w-100 tw-bg-white hover:tw-bg-slate-200 pointer py-2 text-black"
              :disabled="!isReady"
              @click="() => login()"
            >
              <img
                src="@/assets/images/logos/ic_google.png"
                height="16"
                width="16"
                alt="Google"
                class="me-2"
              />
              <span class="fw-bold text-dark">{{ t('login.google') }}</span>
            </div>

            <!-- <div class="d-flex align-items-center justify-content-center w-100">
              <GoogleLogin class="my-3" :callback="callback" />
            </div> -->
          </div>

          <!-- <div
            id="back"
            class="btn mt-2 text-black d-inline-block position-fixed top-0 start-0 ms-2 mt-1"
            @click="router.back()"
          >
            <i class="fa-solid fa-angle-left"></i>
            <span class="ps-2">{{ t("signup.return") }}</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ISignUpModel } from '@/models/signup_model'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse
} from 'vue3-google-signin'

const { t } = useI18n()

const emit = defineEmits(['changetype'])

const changetype = inject('change-type') as Function

// const changetype = () => {
//   emit('changetype', 'login')
// }

const isAccepted = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const { _statusCode: statusCode } = storeToRefs(authStore)

const loading = ref(false)
const changeLoadingState = () => {
  loading.value = !loading.value
}

const showToast = ref(false)
const header = ref('')
const content = ref('')
const handleToast = () => {
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const userObject = reactive({
  fullName: '',
  userName: '',
  email: '',
  password: '',
  gender: '0'
})

const handleSignUp = async () => {
  if (userObject.userName.length >= 6 && userObject.password.length >= 6) {
    const signUpObject: ISignUpModel = {
      fullName: userObject.fullName,
      userName: userObject.userName,
      email: userObject.email,
      password: userObject.password,
      gender: Number(userObject.gender)
    }
    changeLoadingState()
    try {
      await authStore
        .signup(signUpObject)
        .then(changeLoadingState)
        .then(() => {
          switch (statusCode.value) {
            case 10001:
              header.value = 'Kayıt Başarısız'
              content.value =
                'Kullanıcı adı kullanılmaktadır. Lütfen başka bir kullanıcı adı giriniz'
              handleToast()
              break
            case 10002:
              header.value = 'Kayıt Başarısız'
              content.value = 'Email adresi kullanılmaktadır. Lütfen başka bir email adresi giriniz'
              handleToast()
              break
            case 200:
              header.value = 'Kayıt Başarılı'
              content.value = 'Başarıyla kayıt oldunuz. Ana sayfaya yönlendiriliyorsunuz.'
              handleToast()
              setTimeout(() => {
                router.push({ name: 'home' })
              }, 2500)
              break
            default:
              header.value = 'Kayıt Başarısız'
              content.value = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz'
              handleToast()
              break
          }
        })
      console.log(userObject)
    } catch (err: any) {
      console.log(err.response.data)
      changeLoadingState()
    }
  }
}

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  console.log('Access Token: ', response.access_token)
}

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log('Error: ', errorResponse)
}

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError
  // other options
})

const handleCheckbox = () => {
  isAccepted.value = !isAccepted.value
}
</script>

<style scoped lang="scss">
div {
  transition: 0.4s;
}

div .row {
  min-width: 300px;
}

#password-icon,
#user-icon,
#mail-icon,
#gender-icon {
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#back {
  background-color: rgba(255, 255, 255, 0.85);
  height: 40px;
  width: 160px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  margin-top: 12px;
  margin-left: 12px;

  &:hover {
    box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.47);
    border: 1px solid rgb(143, 143, 143);
    background-color: rgba(255, 255, 255, 1);
  }

  &:active {
    transition: 0.3s;
    border: 1px solid rgb(90, 90, 90);
    background-color: rgba(215, 215, 215, 0.34);
  }
}

.alternative-signups {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
