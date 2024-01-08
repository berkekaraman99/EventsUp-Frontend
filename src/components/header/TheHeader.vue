<template>
  <nav class="container-lg p-0 sticky-top z-1">
    <div
      id="navbar"
      class="navbar-expand-lg bg-transparent glass-effect border shadow-sm navbar m-0 mx-sm-2 mx-lg-0 my-sm-3"
    >
      <div class="container-fluid d-flex">
        <div class="d-flex align-items-center justify-content-center">
          <span
            class="pointer rounded-3 p-2 tw-transition tw-ease-in-out tw-duration-350 bars"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            ><i class="fa-solid fa-bars-staggered fa-lg"></i
          ></span>
          <span
            class="navbar-brand pointer fw-bold px-2 fs-4"
            @click="router.push({ name: 'home' })"
          >
            {{ t('header.title') }}
            <span class="fw-light tw-text-base"> (Beta) </span>
          </span>
        </div>

        <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->

        <div class="">
          <div class="d-flex align-items-center justify-content-end">
            <template v-if="userIsAuthorized">
              <div class="d-flex align-items-center justify-content-center" v-if="user">
                <div class="dropdown create-nav">
                  <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ t('header.create') }}
                  </button>
                  <CreateLink />
                </div>

                <!-- <div class="pointer">
              <RouterLink :to="{ name: 'chat' }">
                <i
                  class="fa-regular fa-xl fa-comments mx-2 position-relative"
                >
                  <span
                    class="position-absolute bottom-100 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                  >
                    <span class="visually-hidden">New alerts</span>
                  </span>
                </i>
              </RouterLink>
              </div> -->

                <div class="dropdown ms-2">
                  <div class="pointer" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="position-relative">
                      <img src="@/assets/images/ic_notification.png" height="24" alt="bell" />
                      <span
                        class="position-absolute start-100 bottom-50 translate-middle p-1 bg-danger border border-light rounded-circle"
                      >
                        <span class="visually-hidden">New alerts</span>
                      </span>
                    </div>
                  </div>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><h6 class="dropdown-header">Notifications</h6></li>
                  </ul>
                </div>

                <ProfileIcon :user="user" @logout="logout" />
              </div>
              <div class="d-flex" v-else>
                <RouterLink :to="{ name: 'login' }" class="btn btn-primary me-3">{{
                  t('header.login')
                }}</RouterLink>
                <RouterLink :to="{ name: 'signup' }" class="btn btn-warning">{{
                  t('header.signup')
                }}</RouterLink>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import CreateLink from './CreateLink.vue'
import ProfileIcon from './ProfileIcon.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    CreateLink,
    ProfileIcon
  },
  setup() {
    const { t } = useI18n()

    const router = useRouter()
    const authStore = useAuthStore()
    const { _user: user, _userIsAuthorized: userIsAuthorized } = storeToRefs(authStore)

    const logout = async () => {
      await authStore.logout()
    }

    return {
      logout,
      router,
      user,
      userIsAuthorized,
      t
    }
  }
})
</script>

<style scoped lang="scss">
#navbar {
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  border-radius: 0.5rem;
  // backdrop-filter: blur(20px);
  // -webkit-backdrop-filter: blur(20px);
  // background-color: rgba(255, 255, 255, 0.5);
  // @media (min-width: 992px) {
  //   left: 192px;
  // }
  // @media (max-width: 992px) {
  //   left: 64px;
  // }
}

.create-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  text-decoration: none;
}

.create-nav button {
  background-color: var(--color-primary);
  color: white;
  border-radius: 6px;
  border: none;
  padding: 12px;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  margin: 0px 4px;
  height: 48px;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    background-color: var(--color-primary);
  }
}
</style>
