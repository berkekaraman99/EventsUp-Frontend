<template>
  <div class="container-fluid">
    <Transition name="scaleInOut" mode="out-in">
      <LoadingSpinner v-if="isLoading" />
      <div class="row mt-3" v-else>
        <div class="col-md-12 col-lg-2 mb-4 mb-md-2 mb-lg-0 my-2">
          <!-- Sidebar -->
          <div
            id="sidebar"
            class="col-12 d-flex align-items-start justify-content-start flex-column flex-sm-row flex-lg-column"
          >
            <!-- <div class="position-absolute link-bar"></div> -->
            <RouterLink
              :to="{ name: 'community-details' }"
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-1"
                class="radio"
                value="radio1"
                :checked="category === 'details'"
              />
              <label for="radio-1">
                <span class="fw-bold" id="about">{{ t('community.about') }}</span>
              </label>
            </RouterLink>

            <RouterLink
              :to="{ name: 'community-posts' }"
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-2"
                class="radio"
                value="radio2"
                :checked="category === 'posts'"
              />
              <label for="radio-2">
                <span class="fw-bold" id="posts">{{ t('community.posts') }}</span>
              </label>
            </RouterLink>

            <RouterLink
              :to="{ name: 'community-participiants' }"
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-3"
                class="radio"
                value="radio3"
                :checked="category === 'participiants'"
              />
              <label for="radio-3">
                <span class="fw-bold" id="participiants">{{ t('community.members') }}</span>
              </label>
            </RouterLink>

            <RouterLink
              :to="{ name: 'community-settings' }"
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              v-if="community.adminId === user.id"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-4"
                class="radio"
                value="radio4"
                :checked="category === 'settings'"
              />
              <label for="radio-4">
                <span class="fw-bold" id="settings">{{ t('community.settings') }}</span>
              </label>
            </RouterLink>
          </div>
        </div>
        <!-- Community View -->
        <div class="col-12 col-md-12 offset-md-0 col-lg-10">
          <div class="card border rounded-4 my-2 p-3">
            <img
              class="banner-image tw-bg-slate-100 rounded-4"
              :src="community.bannerImage"
              v-if="community.bannerImage != null"
            />
            <div class="banner-image tw-bg-slate-100 rounded-4" v-else></div>
            <div class="px-3 mb-3">
              <div
                class="d-flex align-items-center justify-content-between position-relative flex-column flex-md-row"
              >
                <div class="d-flex align-items-center align-items-md-end flex-column flex-md-row">
                  <div
                    class="cover-image border p-2 mx-3 d-flex align-items-center justify-content-center shadow-sm"
                  >
                    <img
                      :src="community.coverImage"
                      alt="cover image"
                      class="img-fluid rounded-4"
                      v-if="community.coverImage != null"
                    />
                  </div>
                  <div class="my-3 my-sm-3 my-md-0 text-center text-md-start">
                    <h1 class="m-0 mb-2 tw-text-2xl">
                      {{ community.title }}
                    </h1>
                    <p class="tw-text-sm mb-0">
                      <i class="fa-solid fa-location-dot"></i>
                      {{ community.location }}
                    </p>
                    <p class="tw-text-sm mb-0">
                      <i class="fa-solid fa-users"></i>
                      {{ community.participiantsCount }}
                      {{ t('community.member') }}
                    </p>
                  </div>
                </div>
                <div
                  class="align-self-md-end align-self-sm-center align-self-center my-3 my-sm-3 my-md-0"
                >
                  <div v-if="community.adminId !== user.id">
                    <button class="btn btn-warning" type="button" disabled v-if="loading">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {{ loadingText }}
                    </button>
                    <button
                      class="btn btn-success"
                      v-else-if="!community.isParticipiant"
                      @click="join(community)"
                    >
                      {{ t('community.joincommunity') }}
                    </button>
                    <button class="btn btn-danger" v-else @click="leave(community)">
                      {{ t('community.leavecommunity') }}
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <RouterView v-slot="{ Component, route }">
                <Transition name="scaleInOut" mode="out-in">
                  <component :is="Component" :key="route.path" />
                </Transition>
              </RouterView>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeUnmount } from 'vue'

import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from '@/components/shared/LoadingVue.vue'

import type { ICommunity } from '@/models/community_model'

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const isLoading = ref(true)
const loading = ref(false)
const loadingText = ref('')
const changeloadingState = (state: Ref<boolean>) => {
  state.value = !state.value
}

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)

const communityStore = useCommunityStore()
communityStore.getCommunity(props.id).then(() => {
  changeloadingState(isLoading)
})
const { _community: community } = storeToRefs(communityStore)

const category = ref<string>('details')

const join = async (community: ICommunity) => {
  loadingText.value = 'Joining...'
  changeloadingState(loading)
  await communityStore.joinCommunity(props.id).then(async () => {
    community.isParticipiant = !community.isParticipiant
    community.participiantsCount++
    await communityStore.getCommunityParticipiants(props.id)
    changeloadingState(loading)
  })
}

const leave = async (community: ICommunity) => {
  loadingText.value = 'Leaving...'
  changeloadingState(loading)
  await communityStore.leaveCommunity(props.id).then(async () => {
    community.isParticipiant = !community.isParticipiant
    community.participiantsCount--
    await communityStore.getCommunityParticipiants(props.id)
    changeloadingState(loading)
  })
}

onBeforeUnmount(() => {
  communityStore.$patch({
    community: {},
    participiants: []
  })
})
</script>

<style scoped lang="scss">
.banner-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 224px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  object-fit: cover;
}

.cover-image {
  background-color: ghostwhite;
  border-radius: 1rem;
  height: 160px;
  width: 160px;
  position: relative;
}

.position-relative {
  top: -48px;
}

.fs-4 {
  transition: 0.4s all ease;
}
.radio {
  appearance: none;
}

.img-fluid {
  max-height: 144px;
  max-width: 144px;
}

#sidebar {
  border-radius: 12px;
  padding: 11px 8px;
  height: fit-content;
  margin-top: 0.5rem;
}

.nav-link {
  background-color: white;
  font-weight: 500;
  height: 40px;
  width: 100%;
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  padding: 0px 12px;
  margin: 3px 0px;
  border-radius: 0.5rem;
  border: 1px solid white;
  cursor: pointer;

  @media (max-width: 992px) {
    margin: 3px 4px;
  }

  @media (min-width: 993px) {
    padding-left: 1.2rem;
  }

  &:hover {
    &:not(.selected) {
      color: var(--color-primary);
      box-shadow: inset 8px 0px 0px -2px grey;
      border: 1px solid grey;
    }
  }
}

.selected {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  box-shadow: inset 8px 0px 0px -2px var(--color-primary);
  border: 1px solid var(--color-primary);
}

// .link-bar {
//   transition: 0.3s ease;
//   height: 24px;
//   width: 0.35rem;
//   background-color: var(--color-primary);
//   margin: 11px -2px;
//   border-radius: 8px;
//   transform: translateY(46px);
// }
</style>
