<template>
  <div class="dropdown user-options">
    <div data-bs-toggle="dropdown" aria-expanded="false">
      <div class="d-flex align-items-center justify-content-center">
        <img
          v-if="user.profileImage != null"
          class="profile-icon"
          :src="user.profileImage"
          alt="user icon"
        />
        <img
          src="@/assets/images/profile-man.png"
          alt="profile-man"
          class="profile-icon"
          v-else-if="user.gender == 2"
        />
        <img
          src="@/assets/images/profile-woman.png"
          alt="profile-woman"
          class="profile-icon"
          v-else-if="user.gender == 1"
        />
        <img src="@/assets/images/user.png" alt="profile" class="profile-icon" v-else />
      </div>
    </div>

    <ul class="dropdown-menu dropdown-menu-end z-3">
      <li v-for="link in links" :key="link.id">
        <RouterLink :to="{ name: link.routeName }" class="dropdown-item">
          <i :class="link.icon"></i>
          <span class="mx-2">{{ t(link.content) }}</span>
        </RouterLink>
      </li>
      <li class="dropdown-item text-danger" @click="$emit('logout')">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span class="mx-2">{{ t('header.logout') }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import type { IAuthUser } from '@/models/auth_user_model'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<IAuthUser>,
      required: true
    }
  },
  emits: ['logout'],
  setup() {
    const { t } = useI18n()

    const links = ref<Array<any>>([
      {
        id: 1,
        routeName: 'profile',
        content: 'header.profile',
        icon: 'fa-solid fa-user'
      },
      {
        id: 2,
        routeName: 'profileSettings',
        content: 'header.settings',
        icon: 'fa-solid fa-gear'
      }
    ])

    return {
      links,
      t
    }
  }
})
</script>

<style scoped>
.user-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 16px;
}
</style>
