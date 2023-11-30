<template>
  <div class="container-fluid">
    <Transition name="scaleInOut" mode="out-in">
      <LoadingSpinner v-if="loading" />
      <div class="row mt-3" v-else>
        <!-- Sidebar -->
        <div class="col-md-12 col-lg-2 mb-4 mb-md-2 mb-lg-0 my-2">
          <div
            id="sidebar"
            class="col-12 d-flex align-items-start justify-content-start flex-column flex-sm-row flex-lg-column"
          >
            <div
              v-for="sidebarLink in sidebarLinks"
              :key="sidebarLink.id"
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              @click="changeComponent(sidebarLink.name)"
              :class="{ selected: component === sidebarLink.name }"
            >
              <input
                type="radio"
                name="group-radio"
                :id="sidebarLink.radio"
                class="radio"
                :value="sidebarLink.value"
                :checked="component === sidebarLink.name"
              />
              <label :for="sidebarLink.radio">
                <span class="fw-bold" id="about">{{ t(sidebarLink.text) }}</span>
              </label>
            </div>

            <div
              class="nav-link d-flex align-items-center justify-content-center justify-content-lg-start"
              v-if="currentEvent.user.id === user.id"
              @click="changeComponent('EventSettings')"
              :class="{ selected: component === 'EventSettings' }"
            >
              <input
                type="radio"
                name="group-radio"
                id="radio-4"
                class="radio"
                value="radio4"
                :checked="component === 'EventSettings'"
              />
              <label for="radio-4">
                <span class="fw-bold" id="posts">{{ t('event.settings') }}</span>
              </label>
            </div>
          </div>
          <!-- <div class="col-12">
              <div class="card bg-dark my-2 rounded-3 w-100">
                <div class="card-body text-light">
                  <i class="fa-solid fa-calendar-days"></i>
                  <div>
                    <p class="fw-bold mb-0 mt-3">Start Date</p>
                    <span>
                      {{ formatTime(currentEvent.startDate) }}
                    </span>
                  </div>
                  <div>
                    <p class="fw-bold mb-0 mt-3">End Date</p>
                    <span>
                      {{ formatTime(currentEvent.endDate) }}
                    </span>
                  </div>
                </div>
                
              </div>
            </div> -->
        </div>

        <!-- Event View -->
        <div class="col-12 col-md-12 offset-md-0 col-lg-10">
          <div class="card border shadow-sm my-2">
            <div class="card-body">
              <div class="card-text mb-3">
                <h2 class="fw-bold text-center">{{ currentEvent.title }}</h2>
              </div>
              <div>
                <div
                  :id="`carousel${currentEvent.id}`"
                  class="carousel slide mx-auto"
                  v-if="currentEvent.images?.length > 0"
                  style="max-width: 600px"
                >
                  <div class="carousel-inner rounded-3">
                    <div
                      class="carousel-item bg-black"
                      :class="{ active: currentEvent.images[0] === image }"
                      style="transition: 0.35s ease-in-out; max-height: 300px; max-width: 600px"
                      v-for="image in currentEvent.images"
                      :key="image"
                    >
                      <img
                        :src="image"
                        class="d-block img-fluid w-100 object-fit-contain"
                        style="height: 300px"
                        alt="image"
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    :data-bs-target="`#carousel${currentEvent.id}`"
                    data-bs-slide="prev"
                    v-if="currentEvent.images?.length !== 1"
                  >
                    <i class="fa-solid fa-circle-chevron-left fa-lg"></i>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    :data-bs-target="`#carousel${currentEvent.id}`"
                    data-bs-slide="next"
                    v-if="currentEvent.images?.length !== 1"
                  >
                    <i class="fa-solid fa-circle-chevron-right fa-lg"></i>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
                <div
                  v-else
                  class="rounded-4"
                  style="
                    background-image: url('https://picsum.photos/1600');
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    height: 320px;
                  "
                ></div>
              </div>
            </div>
            <div class="card-footer">
              <!-- <Transition mode="out-in" name="scaleInOut">
                <EventAbout :currentEvent="currentEvent" v-if="component === 'About'" />
                <EventAttendees :attendees="eventAttendees" v-else-if="component === 'Attendees'" />
                <EventComments
                  @update-comments="updateComments"
                  :id="id"
                  v-else-if="component === 'Comments'"
                />
                <EventSettings
                  :id="id"
                  :currentEvent="currentEvent"
                  v-else-if="component === 'Settings'"
                />
              </Transition> -->
              <Transition name="scaleInOut" mode="out-in">
                <component :is="component" />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoadingSpinner from '@/components/shared/TheLoading.vue'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import EventAbout from '@/components/common/event/EventAbout.vue'
import EventAttendees from '@/components/common/event/EventAttendees.vue'
import EventComments from '@/components/common/event/EventComments.vue'
import EventSettings from '@/components/common/event/EventSettings.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    EventAbout,
    EventAttendees,
    EventComments,
    EventSettings,
    LoadingSpinner
  },
  setup(props) {
    const { t } = useI18n()

    const sidebarLinks = [
      {
        id: 1,
        radio: 'radio-1',
        value: 'radio1',
        name: 'EventAbout',
        text: 'event.about'
      },
      {
        id: 3,
        radio: 'radio-3',
        value: 'radio3',
        name: 'EventAttendees',
        text: 'event.attendees'
      },
      {
        id: 2,
        radio: 'radio-2',
        value: 'radio2',
        name: 'EventComments',
        text: 'event.comments'
      }
    ]

    const eventStore = useEventStore()
    const loading = ref(true)
    const changeLoadingState = () => {
      loading.value = !loading.value
    }

    const authStore = useAuthStore()
    const { _user: user } = storeToRefs(authStore)

    eventStore.getEventById(props.id).then(changeLoadingState)
    eventStore.getEventAttendees(props.id)
    const { _currentEvent: currentEvent, _eventAttendees: eventAttendees } = storeToRefs(eventStore)

    const updateComments = async () => {
      await eventStore.getEventComments(props.id)
    }

    const component = ref<string>('EventAbout')
    const changeComponent = (name: string) => {
      component.value = name
    }
    return {
      t,
      eventStore,
      loading,
      user,
      currentEvent,
      eventAttendees,
      updateComments,
      component,
      changeComponent,
      sidebarLinks
    }
  },
  provide() {
    return {
      updateComments: this.updateComments
    }
  },
  unmounted() {
    this.eventStore.$patch({
      currentEvent: {}
    })
  }
})
</script>

<style scoped lang="scss">
.fs-4 {
  transition: 0.4s all ease;
}
.radio {
  appearance: none;
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
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
}

.selected {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  box-shadow: inset 8px 0px 0px -2px var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: 0 0.5rem 0.5rem 0;
}

#eventAction {
  transition: 0.3s ease;
  height: 60px;
}
</style>
