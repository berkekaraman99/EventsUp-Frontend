<template>
  <div>
    <div class="row">
      <div class="col-12 my-4">
        <div class="card border shadow-sm">
          <div class="card-header">
            <h1>{{ t('event.ucomment') }}</h1>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div v-if="user.profileImage != null">
                <img
                  v-if="user.profileImage != null"
                  class="post-profile-image me-3"
                  :src="user.profileImage"
                  alt="profile Image"
                />
              </div>
              <img
                src="@/assets/images/profile-man.png"
                alt="profile-man"
                class="post-profile-image me-4"
                v-else-if="user.gender == 2"
              />
              <img
                src="@/assets/images/profile-woman.png"
                alt="profile-woman"
                class="post-profile-image me-4"
                v-else-if="user.gender == 1"
              />
              <img
                src="@/assets/images/user.png"
                alt="profile"
                class="post-profile-image me-4"
                v-else
              />
              <textarea
                class="form-control rounded-3 px-2"
                id="message"
                rows="4"
                placeholder="Your message"
                v-model="message"
              ></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <FormKit
                type="button"
                :label="
                  isPosting
                    ? t('event.sending')
                    : statusCode !== 200
                    ? t('event.createcomment')
                    : t('event.success')
                "
                wrapper-class="mx-auto text-center"
                @click="createComment"
                :disabled="message.length === 0 || isPosting || statusCode === 200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="eventComments != null">
      <h4 class="col-12 mb-2 fw-medium">
        {{ t('event.comments') }} (<span>{{ eventComments.length }}</span
        >)
      </h4>
    </div>

    <!-- COMMENTS CARD -->
    <div class="my-2" v-for="comment in eventComments" :key="comment.id">
      <div v-if="eventComments.length !== 0" class="row">
        <div class="col-12 my-2">
          <div class="card shadow-sm">
            <div class="card-header">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div
                    class="post-profile-image"
                    :style="{
                      'background-image': 'url(' + comment.user.profileImage + ')',
                      'background-color': 'grey'
                    }"
                  ></div>
                  <div class="mx-3">
                    <div>
                      <div class="fw-bold">{{ comment.user.fullName }}</div>
                      <div class="tw-text-sm text-secondary">@{{ comment.user.userName }}</div>
                      <!-- <small>
                        {{ formatTime(comment.createdAt) }}
                      </small> -->
                    </div>
                  </div>
                </div>
                <!-- <div v-if="comment.userId === user.id" class="delete">
                  <img
                    src="@/assets/images/ic_delete.png"
                    alt="delete"
                    height="24"
                    @click="deleteComment(comment.id, id)"
                  />
                </div> -->
                <div>
                  <div class="dropup">
                    <i
                      class="fa-solid fa-ellipsis fa-2xl"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li class="dropdown-item" v-if="comment.user.id === user.id">
                        <i class="fa-solid fa-pen-to-square"></i>
                        {{ t('event.editcomment') }}
                      </li>
                      <li
                        class="dropdown-item text-danger"
                        @click="deleteComment(comment.id, currentEvent.id)"
                        v-if="comment.user.id === user.id"
                      >
                        <i class="fa-regular fa-trash-can"></i>
                        {{ t('event.deletecomment') }}
                      </li>
                      <li class="dropdown-item text-danger">
                        <i class="fa-regular fa-flag"></i>
                        {{ t('event.report') }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              {{ comment.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    // const emit = defineEmits(['updateComments'])
    const updateComments = inject('updateComments') as Function

    const authStore = useAuthStore()
    const { _user: user } = storeToRefs(authStore)
    const message = ref('')

    const isPosting = ref(false)
    const changePostingState = () => {
      isPosting.value = !isPosting.value
    }

    const eventStore = useEventStore()
    const {
      _statusCode: statusCode,
      _eventComments: eventComments,
      _currentEvent: currentEvent
    } = storeToRefs(eventStore)

    eventStore.getEventComments(currentEvent.value.id)

    const createComment = async () => {
      changePostingState()
      await eventStore
        .createComment({
          message: message.value,
          eventId: currentEvent.value.id
        })
        .then(() => {
          updateComments
          changePostingState()
          setTimeout(() => {
            eventStore.$patch({
              statusCode: 0
            })
          }, 2000)
        })
    }

    const deleteComment = async (commentId: string, eventId: string) => {
      await eventStore.deleteComment(commentId, eventId)
    }
    return {
      t,
      user,
      createComment,
      deleteComment,
      statusCode,
      eventComments,
      eventStore,
      currentEvent,
      message,
      isPosting
    }
  },
  beforeUnmount() {
    this.eventStore.$patch({
      statusCode: 0
    })
  }
})
</script>

<style scoped lang="scss">
#message {
  width: 100%;
  box-sizing: border-box;
  direction: ltr;
  display: block;
  max-width: 100%;
  line-height: 1.5;
  letter-spacing: 1px;
  padding: 15px 15px 30px;
  border-radius: 3px;
  border: 1px solid grey;
  font:
    13px Tahoma,
    cursive;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* background: linear-gradient(#f9efaf, #f7e98d);
  background: -o-linear-gradient(#f9efaf, #f7e98d);
  background: -ms-linear-gradient(#f9efaf, #f7e98d);
  background: -moz-linear-gradient(#f9efaf, #f7e98d);
  background: -webkit-linear-gradient(#f9efaf, #f7e98d); */

  &:focus {
    border-color: var(--color-primary);
  }
}
</style>
