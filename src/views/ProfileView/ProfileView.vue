<template>
  <div class="container-fluid">
    <div class="container-md">
      <div class="row">
        <div class="col-12 mt-3" v-if="loading">
          <div class="profile-header position-relative placeholder-glow">
            <div class="profile-banner rounded-4 placeholder"></div>
            <div class="profile-image placeholder bg-black"></div>
            <div class="profile-details">
              <div class="col-4">
                <h2 class="fw-bold">
                  <span class="placeholder col-12"></span>
                </h2>
                <h5 class="placeholder col-12"></h5>
                <div>
                  <h3 class="placeholder col-3 me-1"></h3>
                  <h3 class="placeholder col-3 me-1"></h3>
                  <h3 class="placeholder col-3"></h3>
                  <p class="placeholder col-12 h2 my-3"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-3 mb-sm-0 mb-md-3 mb-lg-0" v-else>
          <div class="profile-header position-relative card shadow-sm rounded-4">
            <img
              v-if="currentUser.bannerImage != null"
              class="profile-banner rounded-top-4"
              :src="currentUser.bannerImage"
              alt="banner"
            />
            <div v-else class="profile-banner rounded-top-4 tw-bg-slate-100"></div>

            <img
              class="profile-image shadow"
              :src="currentUser.profileImage"
              v-if="currentUser.profileImage != null"
            />
            <img
              src="@/assets/images/profile-man.png"
              alt="profile-man"
              class="profile-image me-4"
              v-else-if="currentUser.gender == 2"
            />
            <img
              src="@/assets/images/profile-woman.png"
              alt="profile-woman"
              class="profile-image me-4"
              v-else-if="currentUser.gender == 1"
            />
            <img src="@/assets/images/user.png" alt="profile" class="profile-image me-4" v-else />
            <div class="img-plus border">
              <i class="fa-solid fa-plus fa-xl"></i>
            </div>

            <div class="profile-details">
              <div>
                <h2 class="fw-bold">{{ currentUser.fullName }}</h2>
                <h5 class="fw-normal">@{{ currentUser.userName }}</h5>
                <div class="d-flex flex-column flex-sm-row">
                  <div
                    class="me-3 pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#followers"
                    @click="getFollowers"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ followerCount }}
                    </h3>
                    {{ t('profile.followers') }}
                  </div>
                  <div
                    class="me-3 pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#followings"
                    @click="getFollowings"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ followingCount }}
                    </h3>
                    {{ t('profile.followings') }}
                  </div>
                  <div
                    class="me-3 pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#followerRequests"
                  >
                    <h3 class="fw-bold d-inline-block">
                      {{ followersRequests.length }}
                    </h3>
                    {{ t('profile.followrequests') }}
                  </div>
                </div>
                <!-- Bio -->
                <p v-if="user.bio != null" class="my-3">
                  {{ currentUser.bio }}
                </p>
              </div>
            </div>

            <div id="suggestion" class="d-none d-sm-none d-md-none d-lg-block">
              <UserSuggestions />
            </div>
          </div>

          <!-- Followers Modal -->
          <FollowersModal :id="userId" @decrement-follower-count="() => (followerCount -= 1)" />

          <!-- Followings Modal -->
          <FollowingsModal :id="userId" />

          <!-- Follower Requests Modal -->
          <FollowerRequestsModal :id="userId" @update-follower-count="() => (followerCount += 1)" />
        </div>
        <!-- <div
          class="col-lg-4 col-xl-3 d-none d-sm-none d-lg-flex align-items-center justify-content-center mt-3"
        >
          <UserSuggestions />
        </div> -->
      </div>
    </div>
    <div id="options" class="container-fluid my-4 placeholder-glow" v-if="loading">
      <div class="row">
        <div class="col-sm-12 col-md-3 text-center my-2">
          <span class="placeholder col-8 h3"></span>
        </div>

        <div class="col-sm-12 col-md-2 text-center my-2">
          <span class="placeholder col-8 h3"></span>
        </div>

        <div class="col-sm-12 col-md-2 text-center my-2">
          <span class="placeholder col-8 h3"></span>
        </div>

        <div class="col-sm-12 col-md-3 text-center my-2">
          <span class="placeholder col-8 h3"></span>
        </div>

        <div class="col-sm-12 col-md-2 text-center my-2">
          <span class="placeholder col-8 h3"></span>
        </div>
      </div>
    </div>

    <div id="options" class="w-100" v-else>
      <div class="card shadow-sm flex-column flex-sm-column flex-md-row">
        <div class="text-center my-2">
          <input
            type="radio"
            name="group-radio"
            id="radio-1"
            class="radio"
            value="radio1"
            :checked="component === 'activities'"
          />
          <label for="radio-1">
            <span
              class="fw-bold category"
              :class="{ selected: component === 'activities' }"
              id="activities"
              @click="changeCategory('activities')"
              >{{ t('profile.activities') }}</span
            >
          </label>
        </div>

        <div class="text-center my-2">
          <input
            type="radio"
            name="group-radio"
            id="radio-2"
            class="radio"
            value="radio2"
            :checked="component === 'UserPosts'"
          />
          <label for="radio-2">
            <span
              class="fw-bold category"
              :class="{ selected: component === 'UserPosts' }"
              id="posts"
              @click="changeCategory('UserPosts')"
              >{{ t('profile.posts') }}</span
            >
          </label>
        </div>

        <div class="text-center my-2">
          <input
            type="radio"
            name="group-radio"
            id="radio-3"
            class="radio"
            value="radio3"
            :checked="component === 'UserEvents'"
          />
          <label for="radio-3">
            <span
              class="fw-bold category"
              :class="{ selected: component === 'UserEvents' }"
              id="events"
              @click="changeCategory('UserEvents')"
              >{{ t('profile.events') }}</span
            >
          </label>
        </div>

        <div class="text-center my-2">
          <input
            type="radio"
            name="group-radio"
            id="radio-4"
            class="radio"
            value="radio4"
            :checked="component === 'UserCommunities'"
          />
          <label for="radio-4">
            <span
              class="fw-bold category"
              :class="{ selected: component === 'UserCommunities' }"
              id="communities"
              @click="changeCategory('UserCommunities')"
              >{{ t('profile.communities') }}</span
            >
          </label>
        </div>

        <div class="text-center my-2">
          <input
            type="radio"
            name="group-radio"
            id="radio-5"
            class="radio"
            value="radio5"
            :checked="component === 'UserSavedPosts'"
          />
          <label for="radio-5">
            <span
              class="fw-bold category"
              :class="{ selected: component === 'UserSavedPosts' }"
              id="saved"
              @click="changeCategory('UserSavedPosts')"
              >{{ t('profile.saved') }}</span
            >
          </label>
        </div>
      </div>
    </div>
    <div>
      <Transition name="scaleInOut" mode="out-in">
        <component :is="component" />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserCommunities from '@/components/common/profile/UserCommunities.vue'
import UserPosts from '@/components/common/profile/UserPosts.vue'
import FollowingsModal from '@/components/shared/FollowingsModal.vue'
import FollowersModal from '@/components/shared/FollowersModal.vue'
import UserSuggestions from '@/components/shared/UserSuggestions.vue'
import UserEvents from '@/components/common/profile/UserEvents.vue'
import UserSavedPosts from '@/components/common/profile/UserSavedPosts.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import FollowerRequestsModal from '@/components/shared/FollowerRequestsModal.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    UserCommunities,
    UserPosts,
    UserEvents,
    UserSavedPosts,
    FollowingsModal,
    FollowersModal,
    UserSuggestions,
    FollowerRequestsModal
  },
  setup() {
    const { t } = useI18n()

    const followerCount = ref(0)
    const followingCount = ref(0)

    const authStore = useAuthStore()
    const { _user: user } = storeToRefs(authStore)
    const userId = user.value.id

    const userStore = useUserStore()

    const component = ref('UserCommunities')
    const loading = ref(true)
    const changeLoadingState = () => {
      loading.value = !loading.value
    }
    const { _currentUser: currentUser, _userFollowersRequests: followersRequests } =
      storeToRefs(userStore)

    userStore.getUserById(user.value.id).then(() => {
      changeLoadingState()
      followerCount.value = currentUser.value.followersCount
      followingCount.value = currentUser.value.followingCount
    })

    const changeCategory = (tab: string) => {
      component.value = tab
    }

    const getFollowers = async () => {
      await userStore.getUserFollowers(userId, '')
    }

    const getFollowings = async () => {
      await userStore.getUserFollowings(userId, '')
    }
    return {
      t,
      loading,
      component,
      changeCategory,
      getFollowers,
      getFollowings,
      followersRequests,
      userId,
      userStore,
      currentUser,
      followerCount,
      followingCount,
      user
    }
  },
  beforeUnmount() {
    this.userStore.$patch({
      currentUser: {}
    })
  }
})
</script>

<style scoped lang="scss">
#options {
  padding: 0px 0.75rem;
  margin: 16px 0px;
  z-index: 9;

  & div {
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media (min-width: 768px) and (max-width: 992px) {
      border-radius: 0px;
    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    border-top: 1px solid grey;
  }
}
.profile-details {
  margin: 72px 16px 0px 16px;
  padding: 0.5rem 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) and (max-width: 992px) {
  }
}

.profile-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.follow {
  background-color: #24a0ed;
  color: white;
  border-radius: 99px;
}

.follow:hover {
  background-color: #1b74ac;
}

label span {
  transition: 0.4s all ease;
}

.radio {
  appearance: none;
}

.category {
  transition: 0.3s;
  color: #83818c;
  padding: 20px;
  margin: 0 6px;
  z-index: 1;
  position: relative;
  font-size: 1.25rem;

  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 0.9rem;
  }

  @media (max-width: 767px) {
    font-size: 1.25rem;
  }

  &:hover {
    color: #111;
    letter-spacing: 1px;
  }
}

.selected {
  transition: 0.3s all ease;
  color: var(--color-primary);
  padding: 20px;
  margin: 0 6px;
  z-index: 2;
  position: relative;
  letter-spacing: 1px;
}

.img-plus {
  background-color: white;
  border-radius: 99px;
  padding: 2px;
  color: var(--color-primary);
  position: absolute;
  left: 144px;
  top: 272px;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--color-secondary);
  }
}

#suggestion {
  position: absolute;
  right: 2rem;
}
</style>
