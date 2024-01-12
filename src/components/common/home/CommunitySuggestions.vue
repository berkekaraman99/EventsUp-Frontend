<template>
  <div
    id="community-suggestion"
    class="mb-4 mb-md-4 mb-lg-0 d-none d-md-none d-lg-flex flex-column"
  >
    <div class="card rounded-4 border overflow-hidden">
      <div class="card-header px-md-4 px-xl-5">
        <div class="fw-bold text-start text-lg-center fs-5">
          {{ t('rightbar.community.suggestions') }}
        </div>
      </div>
      <div class="card-body p-0">
        <div
          v-if="communityList.length === 0"
          class="d-flex align-items-center justify-content-center py-5"
        >
          <p>Öneri bulunamadı</p>
        </div>
        <div
          v-else
          class="d-flex align-items-start p-3 community-suggest"
          v-for="community in communityList"
          :key="community.id"
        >
          <RouterLink
            :to="{
              name: 'communitydetails',
              params: {
                id: community.id
              }
            }"
            class="text-decoration-none"
          >
            <div class="d-flex align-items-center">
              <div v-if="community.coverImage != null">
                <div
                  :style="{ backgroundImage: `url(${community.coverImage})` }"
                  class="suggestion-profile-image me-4 shadow-sm border"
                ></div>
              </div>
              <img
                v-else
                class="me-4"
                src="@/assets/images/ic_community_avatar.png"
                alt="test"
                style="object-fit: cover; height: 48px; width: 48px"
              />
              <div>
                <div class="text-body">
                  <div class="fw-medium">{{ community.title }}</div>
                  <div>
                    <i class="fa-solid fa-users fa-sm"></i> {{ community.participiantsCount }}
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
        <div
          v-if="communityList.length"
          class="text-center more pointer py-2"
          @click="$router.push({ name: 'communities' })"
        >
          {{ t('rightbar.community.showmore') }}
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
communityStore.getCommunities()
const { _communityList: communityList } = storeToRefs(communityStore)
</script>

<style scoped lang="scss">
.community-suggest {
  transition: 0.3s ease;
}

.more {
  transition: 0.35s ease;
  color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary-hover);
    color: var(--color-text);
  }
}

.suggestion-bg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: -2;
  filter: blur(0.25rem);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
