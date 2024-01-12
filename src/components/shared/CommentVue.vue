<template>
  <div>
    <div class="row">
      <div class="col-12 my-4">
        <div class="card shadow-sm rounded-4">
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div>
                  <img
                    class="comment-profile-image"
                    v-if="comment.user.profileImage != null"
                    :src="comment.user.profileImage"
                    :alt="comment.user.fullName"
                  />
                  <img
                    src="@/assets/images/profile-man.png"
                    alt="profile-man"
                    class="comment-profile-image"
                    v-else-if="comment.user.gender == 2"
                  />
                  <img
                    src="@/assets/images/profile-woman.png"
                    alt="profile-woman"
                    class="comment-profile-image"
                    v-else-if="comment.user.gender == 1"
                  />
                  <img
                    src="@/assets/images/user.png"
                    alt="profile"
                    class="comment-profile-image"
                    v-else
                  />
                </div>
                <div class="mx-3">
                  <div>
                    <div class="fw-bold tw-text-sm">
                      {{ comment.user.fullName }}
                    </div>
                    <div class="tw-text-xs">
                      @{{ comment.user.userName }} -
                      {{ formatTime(comment.createdAt) }}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="dropup">
                  <i
                    class="fa-solid fa-ellipsis fa-2xl"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li
                      class="dropdown-item"
                      v-if="comment.user.id === userId"
                      @click="editComment()"
                    >
                      <i class="fa-solid fa-pen-to-square"></i> Yorumu Düzenle
                    </li>
                    <li
                      class="dropdown-item text-danger"
                      @click="deleteComment(comment.id, postId)"
                      v-if="comment.user.id === userId"
                    >
                      <i class="fa-regular fa-trash-can"></i>
                      Yorumu Sil
                    </li>
                    <li class="dropdown-item text-danger">
                      <i class="fa-regular fa-flag"></i> Raporla
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body py-2" v-if="!isCommentEditable">
            <p class="mb-0">
              <span class="tw-text-sm">{{ comment.message }}</span>
              <span v-if="comment.isEdited" class="text-secondary-emphasis fst-italic tw-text-xs">
                ( Düzenlendi )
              </span>
            </p>
          </div>
          <div class="card-body" v-else>
            <div class="d-flex">
              <textarea
                class="form-control rounded-3 px-2"
                id="message"
                rows="4"
                v-model="message"
                :disabled="loading"
              ></textarea>
              <div class="d-flex flex-column px-2">
                <FormKit
                  type="submit"
                  :label="loading ? 'Loading' : statusCode !== 200 ? 'Edit' : 'Success'"
                  :disabled="loading || statusCode === 200"
                  :classes="{ input: 'w-100' }"
                  @click="updateComment(props.comment)"
                />
                <FormKit
                  type="submit"
                  label="Cancel"
                  :classes="{ input: 'w-100 bg-secondary' }"
                  @click="cancelEditing()"
                />
              </div>
            </div>
          </div>
          <div class="card-footer border-0">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center justify-content-center">
                <div class="tw-text-lg mx-1">
                  {{ comment.interactionCounts != null ? comment.interactionCounts.likeCount : 0 }}
                </div>
                <div
                  class="rounded-3 py-1 hover:tw-bg-orange-500 hover:tw-text-white tw-transition tw-ease-in-out tw-duration-300 pointer"
                >
                  <i class="fa-solid fa-arrow-up fa-lg mx-2"></i>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div class="tw-text-lg mx-1">
                  {{
                    comment.interactionCounts != null ? comment.interactionCounts.dislikeCount : 0
                  }}
                </div>
                <div
                  class="rounded-3 py-1 hover:tw-bg-purple-500 hover:tw-text-white tw-transition tw-ease-in-out tw-duration-300 pointer"
                >
                  <i class="fa-solid fa-arrow-down fa-lg mx-2"></i>
                </div>
              </div>

              <div class="d-flex align-items-center">
                <div class="tw-text-lg mx-1">{{ comment.replyCount }}</div>
                <RouterLink
                  :to="{
                    name: 'CommentReplies',
                    params: { postid: postId, commentid: comment.id }
                  }"
                  @click="setComment(comment)"
                >
                  <div
                    class="rounded-3 py-1 hover:tw-bg-blue-500 hover:tw-text-white tw-transition tw-ease-in-out tw-duration-300 pointer"
                  >
                    <i class="fa-regular fa-comment fa-lg mx-2"></i>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import type { IComment } from '@/models/comment_model'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { usePostStore } from '@/stores/post'
import { storeToRefs } from 'pinia'

const props = defineProps({
  comment: {
    type: Object as PropType<IComment>,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['deleteComment'])

const deleteComment = (commentId: String, postId: string) => {
  emit('deleteComment', commentId, postId)
}

const postStore = usePostStore()
const { _statusCode: statusCode } = storeToRefs(postStore)

const setComment = (comment: IComment) => {
  postStore.$patch({
    comment: comment,
    commentReplies: []
  })
  postStore.commentNode.push(comment)
}

const message = ref(props.comment.message)
const loading = ref(false)
const changeLoadingState = () => {
  loading.value = !loading.value
}

const isCommentEditable = ref(false)

const editComment = () => {
  isCommentEditable.value = true
}

const cancelEditing = () => {
  isCommentEditable.value = false
}

const updateComment = async (comment: IComment) => {
  changeLoadingState()
  await postStore.editComment(props.comment.id, message.value).then(() => {
    changeLoadingState()
    if (statusCode.value === 200) {
      comment.message = message.value
      comment.isEdited = true
    }
    isCommentEditable.value = false
    setTimeout(() => {
      postStore.$patch({
        statusCode: 0
      })
    }, 3000)
  })
}

const formatTime = (time: any) => {
  return moment(time).fromNow()
}
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

  &:focus {
    border-color: var(--color-primary);
  }
}

.dropdown-menu {
  padding: 0.5rem;
}

.dropdown-item {
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
}
</style>
