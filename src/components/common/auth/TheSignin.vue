<template>
  <div class="col-12 col-sm-12 col-md-6">
    <Teleport to="body">
      <the-toast :show-toast="showToast" :status-code="statusCode" :header="header" :content="content"></the-toast>
    </Teleport>
    <div class="container-fluid d-flex align-items-center justify-content-center overflow-auto min-vh-100">
      <div class="row w-100 h-100 align-items-center mx-3">
        <div class="col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
          <p class="fw-bold text-center fs-2 py-4">
            {{ t("login.header") }}
          </p>

          <div class="shadow-sm p-4">
            <FormKit
              type="form"
              @submit="handleLogin"
              :actions="false"
              :config="{
                classes: {
                  outer: 'mx-auto',
                  wrapper: 'mx-auto w-100',
                  messages: 'text-center',
                  input: 'w-100',
                },
              }"
            >
              <FormKit
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                validation="required|length:6"
                v-model="userObject.userName"
                :wrapper-class="{
                  'formkit-wrapper': false,
                }"
                :classes="{
                  inner: 'rounded-1',
                  prefixIcon: 'rounded-1',
                }"
              />
              <FormKit
                type="password"
                name="password"
                placeholder="Şifre"
                validation="required|length:6"
                minlength="6"
                suffix-icon="eyeClosed"
                @suffix-icon-click="handleIconClick"
                v-model="userObject.password"
                :wrapper-class="{
                  'formkit-wrapper': false,
                }"
                :classes="{
                  inner: 'rounded-1',
                  prefixIcon: 'rounded-1',
                }"
              />
              <div class="d-flex justify-content-between align-items-center my-3">
                <FormKit
                  type="checkbox"
                  :label="t('login.rememberme')"
                  name="terms"
                  :value="false"
                  :outer-class="{
                    'mx-auto': false,
                    'd-flex': true,
                    'align-items-center': true,
                    'm-0': true,
                  }"
                  :classes="{ decorator: 'rounded-1' }"
                  @click="toggleRememberMe"
                />
                <RouterLink :to="{ name: 'forgetpassword' }" class="text-decoration-none">
                  <span>{{ t("login.forgotpassword") }}</span>
                </RouterLink>
              </div>
              <FormKit
                type="submit"
                :label="loading ? t('login.loginprogress') : t('login.login')"
                :classes="{ input: 'w-100 rounded-3' }"
                :disabled="loading || statusCode === 200"
                :wrapper-class="{
                  'formkit-wrapper': false,
                  'mx-auto text-center': true,
                }"
                :outer-class="{
                  'mb-0': true,
                }"
              />
            </FormKit>
          </div>

          <!-- PUSH SIGN UP -->
          <div class="text-center mt-4">
            <p>
              {{ t("login.donthaveaccount") }}
              <span class="text-primary pointer" @click="changeType('the-signup')">{{ t("login.signup") }}</span>
            </p>
          </div>

          <!-- ALTERNATIVE LOGINS -->
          <div class="alternative-logins my-4">
            <div class="shadow-sm mt-3 rounded-3 w-100 d-flex align-items-center justify-content-center pointer py-2">
              <i class="fa-brands fa-apple fa-lg me-2"></i>
              <span class="fw-bold">{{ t("login.apple") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ILogInModel } from "@/models/login_model";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { inject } from "vue";

const { t } = useI18n();
const emit = defineEmits(["changetype"]);
const changetype = inject("change-type") as Function;

const changeType = (name: string) => {
  changetype(name);
};

const handleIconClick = (node: any, e: any) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};

const error = ref(null);
const authStore = useAuthStore();
const router = useRouter();
const { _statusCode: statusCode } = storeToRefs(authStore);

const loading = ref(false);
const changeLoadingState = () => {
  loading.value = !loading.value;
};

const isRemembered = ref(false);
const toggleRememberMe = () => {
  isRemembered.value = !isRemembered.value;
};

const showToast = ref(false);
const header = ref("");
const content = ref("");
const handleToast = () => {
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};

let rememberedUser = { userName: "", password: "" };
rememberedUser = JSON.parse(localStorage.getItem("rememberMe") || "{}");

const userObject = reactive({
  userName: "",
  password: "",
});

userObject.userName = rememberedUser.userName;
userObject.password = rememberedUser.password;

const handleLogin = async () => {
  if (userObject.userName.length >= 6 && userObject.password.length >= 6) {
    const loginObject: ILogInModel = {
      userName: userObject.userName,
      password: userObject.password,
      provider: 0,
    };
    changeLoadingState();
    try {
      await authStore.login(loginObject).then(() => {
        console.log(statusCode.value);
        if (statusCode.value === 10401) {
          header.value = "Giriş Başarısız";
          content.value = "Kullanıcı adı veya şifre hatalı.";
          handleToast();
        } else if (statusCode.value === 200) {
          if (isRemembered.value || localStorage.getItem("rememberMe") == null) {
            localStorage.setItem("rememberMe", JSON.stringify(loginObject));
          }
          header.value = "Giriş Başarılı";
          content.value = "Ana sayfaya yönlendiriliyorsunuz.";
          handleToast();
          setTimeout(() => {
            router.push({ name: "home" });
          }, 2500);
        }
        changeLoadingState();
      });
    } catch (err: any) {
      error.value = err.message;
      changeLoadingState();
    }
  }
};
</script>

<style scoped lang="scss">
div .row {
  max-width: 600px;
  min-width: 300px;
}

input[type="password"] {
  &:hover {
    box-shadow: inset none !important;
  }
  &:focus {
    box-shadow: inset none !important;
  }
}

.alternative-logins {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
