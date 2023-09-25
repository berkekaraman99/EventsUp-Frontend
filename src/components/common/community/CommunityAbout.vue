<template>
  <div>
    <div>
      <p class="fw-medium tw-text-xl">{{ t('community.description') }}</p>
      <p class="description">{{ community.description }}</p>
    </div>

    <div class="d-flex align-items-center justify-content-between mt-5">
      <div>
        <p class="fw-medium">{{ t('community.owner') }}</p>
        <div class="d-flex align-items-center my-3">
          <img
            v-if="community.adminImage != null"
            class="post-profile-image"
            :src="community.adminImage"
            alt="admin profile"
          />
          <img
            src="@/assets/images/profile-man.png"
            alt="profile-man"
            class="post-profile-image"
            v-else-if="community.adminGender == 2"
          />
          <img
            src="@/assets/images/profile-woman.png"
            alt="profile-woman"
            class="post-profile-image"
            v-else-if="community.adminGender == 1"
          />
          <img src="@/assets/images/user.png" alt="profile" class="post-profile-image" v-else />
          <div class="mx-3">{{ community.adminName }} {{ community.adminLastName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const communityStore = useCommunityStore()
const { _community: community } = storeToRefs(communityStore)
</script>

<style scoped>
.description {
  letter-spacing: 1px;
}
</style>
