<template>
  <div id="left-bar" class="border-end shadow">
    <!-- OFFCANVAS -->
    <div
      class="offcanvas offcanvas-start overflow-y-auto shadow"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="my-3 w-100">
          <div class="d-flex align-items-center mb-3">
            <TabVue>
              <template v-slot:icon>
                <span
                  class="pointer rounded-3 p-2 tw-transition tw-ease-in-out tw-duration-350 bars"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                  ><i class="fa-solid fa-bars-staggered fa-lg"></i
                ></span>
              </template>
              <template v-slot:name>
                <span class="navbar-brand pointer fw-bold px-2 fs-4">{{ t('header.title') }} </span>
              </template>
            </TabVue>
          </div>
          <!-- <div
            id="bar"
            :style="{
              transform: 'translateY(' + barY + 'px)'
            }"
          ></div> -->
          <RouterLink
            :to="{ name: 'home' }"
            class="text-body sidebar-link bg-body-tertiary border"
            :data-text="t('leftbar.feed')"
          >
            <TabVue
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <template v-slot:icon>
                <i class="fa-solid fa-bolt"></i>
              </template>
              <template v-slot:name> {{ t('leftbar.feed') }} </template>
            </TabVue>
          </RouterLink>
          <RouterLink
            :to="{ name: 'events' }"
            class="text-body sidebar-link bg-body-tertiary border"
            :data-text="t('leftbar.myevents')"
          >
            <TabVue
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <template v-slot:icon>
                <i class="fa-solid fa-calendar-days"></i>
              </template>
              <template v-slot:name> {{ t('leftbar.myevents') }} </template>
            </TabVue>
          </RouterLink>
          <RouterLink
            :to="{ name: 'communities' }"
            class="text-body sidebar-link bg-body-tertiary border"
            :data-text="t('leftbar.communities')"
          >
            <TabVue
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <template v-slot:icon>
                <i class="fa-solid fa-people-group"></i>
              </template>
              <template v-slot:name> {{ t('leftbar.communities') }} </template>
            </TabVue>
          </RouterLink>
          <RouterLink
            :to="{ name: 'search' }"
            class="text-body sidebar-link bg-body-tertiary border"
            :data-text="t('leftbar.search')"
          >
            <TabVue
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <template v-slot:icon>
                <i class="fa-solid fa-magnifying-glass d-block"></i>
              </template>
              <template v-slot:name> {{ t('leftbar.search') }} </template>
            </TabVue>
          </RouterLink>
        </div>
        <div class="bg-body-secondary w-100 text-center py-2 mb-1" v-if="communities.length > 0">
          <i class="fa-solid fa-people-group"></i>
          <span class="ms-2 fw-bold">{{ t('leftbar.communities') }}</span>
        </div>

        <!-- <RouterLink
          :to="{ name: 'communities' }"
          class="my-2 text-decoration-none w-100 tw-text-gray-600 ctooltip ctooltip-left sidebar-link"
          :data-text="t('leftbar.explore')"
        >
          <TabVue>
            <template v-slot:icon>
              <div class="my-1 explore pointer">
                <i class="fa-solid fa-compass fa-xl"></i>
              </div>
            </template>
            <template v-slot:name>
              <span class="fw-medium"> {{ t('leftbar.explore') }} </span>
            </template>
          </TabVue>
        </RouterLink> -->
        <div class="w-100" v-for="community in communities" :key="community.id">
          <RouterLink
            :to="{
              name: 'communitydetails',
              params: { id: community.id }
            }"
            class="d-flex align-items-center text-body community-link bg-body-tertiary border"
            :data-text="community.title"
          >
            <TabVue
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <template v-slot:icon>
                <img
                  v-if="community.coverImage != null"
                  class="cover-preview tw-bg-slate-200"
                  :src="community.coverImage"
                  alt=""
                />
                <img
                  v-else
                  class="cover-preview"
                  src="@/assets/images/ic_community_avatar.png"
                  alt=""
                />
              </template>
              <template v-slot:name>
                <span class="fw-medium">{{ community.title }}</span>
              </template>
            </TabVue>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCommunityStore } from '@/stores/community'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import TabVue from '@/components/Sidebar/Left/TabVue.vue'
import { watch } from 'vue'
import { useTailwindConfig } from '@/composables/useTailwindConfig'

const { defaultTransition } = useTailwindConfig()

const { t } = useI18n()

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)

const communityStore = useCommunityStore()
if (user.value) {
  communityStore.getAuthUserCommunities(user.value.id)
}

watch(user, async () => {
  await communityStore.getAuthUserCommunities(user.value.id)
})

const { _authUserCommunities: communities } = storeToRefs(communityStore)
</script>

<style lang="scss" scoped>
#left-bar {
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  bottom: 0;
  top: 0;
  left: -240px;
  border-radius: 8px;
  margin: 0.75rem 0.5rem;
  z-index: 99;
}

.offcanvas {
  max-width: 240px;
  border-radius: 0 0.5em 0.5em 0;
  // margin: 0.75rem 0;
  // background-color: rgba($color: #ffffff, $alpha: 0.8);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}

.explore {
  transition: all 0.2s ease;
  width: 48px;
  height: 48px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  &:hover {
    background-color: var(--color-primary-h);
    color: var(--color-text);
  }
}

.cover-preview {
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  border-radius: 99px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}

.sidebar-link {
  font-weight: normal;
  height: 40px;
  width: calc(100% - 12px);
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  margin: 4px 6px;
  padding: 0 4px;
  display: flex;
  border-radius: 0.5rem;
  border: 1px solid rgba($color: #f0f0f0, $alpha: 0.67) !important;
  text-decoration: none;
  // color: rgb(27, 27, 27);
  // background-color: rgba($color: #ffffff, $alpha: 0.67);

  &:hover {
    &:not(a.router-link-exact-active) {
      color: var(--color-primary-h) !important;
      // box-shadow: inset 8px 0px 0px -2px grey;
      border-color: var(--color-secondary-h) !important;
      // border-radius: 0 0.5rem 0.5rem 0;
      // background-color: rgba($color: #ffffff, $alpha: 1);
    }
  }
}

.community-link {
  font-weight: normal;
  height: 48px;
  width: calc(100% - 12px);
  transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  margin: 4px 6px;
  padding: 4px 4px;
  display: flex;
  border-radius: 0.5rem;
  // border: 1px solid rgba($color: #ffffff, $alpha: 0.67);
  text-decoration: none;
  // color: rgb(27, 27, 27);
  // background-color: rgba($color: #ffffff, $alpha: 0.67);

  &:hover {
    &:not(a.router-link-exact-active) {
      color: var(--color-primary-h) !important;
      // box-shadow: inset 8px 0px 0px -2px grey;
      border: 1px solid grey;
      border-color: var(--color-secondary-h) !important;
      // background-color: rgba($color: #ffffff, $alpha: 1);
    }
  }
}

a {
  // transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  background-color: white;

  &:hover {
    color: var(--color-primary-h);
    background-color: #f5f5f5;
    // box-shadow: inset -6px 0px 0px -2px grey;
  }
}

a.router-link-exact-active {
  color: var(--color-primary-h) !important;
  background-color: #f5f5f5;
  font-weight: bold;
  // box-shadow: inset 8px 0px 0px -2px var(--color-primary-h);
  border: 1px solid var(--color-primary-h) !important;
  // border-radius: 0 0.5rem 0.5rem 0;
}

// .ctooltip {
//   position: relative; /* making the .tooltip span a container for the tooltip text */

//   &::before {
//     content: attr(data-text); /* here's the magic */
//     position: absolute;

//     /* vertically center */
//     top: 50%;
//     transform: translateY(-50%);

//     /* move to right */
//     left: 100%;
//     margin-left: 15px; /* and add a small left margin */

//     /* basic styles */
//     width: 200px;
//     padding: 10px;
//     border-radius: 0.5rem;
//     background: #000000d0;
//     color: #fff;
//     text-align: center;

//     display: none;

//     opacity: 0;
//     transition: 0.3s opacity;
//   }

//   &:hover::before {
//     display: block;
//     opacity: 1;
//   }

//   .ctooltip-left::before {
//     left: initial;
//     margin: initial;

//     /* set new values */
//     right: 100%;
//     margin-right: 15px;
//   }

//   &:after {
//     content: '';
//     position: absolute;

//     /* position tooltip correctly */
//     left: 100%;
//     margin-left: -1px;

//     /* vertically center */
//     top: 50%;
//     transform: translateY(-50%);

//     /* the arrow */
//     border: 0.5rem solid #000000d0;
//     border-color: transparent #000000d0 transparent transparent;

//     display: none;
//     opacity: 0;
//     transition: 0.3s;
//   }
//   &:hover::after {
//     opacity: 1;
//   }

//   &:hover::before,
//   &:hover::after {
//     display: block;
//   }
// }

// #bar {
//   position: absolute;
//   transition: 0.3s ease;
//   height: 24px;
//   width: 6px;
//   margin: 0.5rem 0.25rem;
//   border-radius: 99px;
//   z-index: 1;
//   background-color: var(--color-primary);
// }
</style>
