<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center justify-content-start">
        <div class="card-text fw-bold tw-text-2xl">
          {{ t('event.general') }}
        </div>
        <!-- <div class="card-text fw-bold">Tab</div> -->
      </div>
    </div>
    <div class="card-body">
      <div v-if="currentEvent.user.id === user.id" class="tile">
        <div disabled v-if="loading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Deleting...
        </div>
        <div class="text-danger" @click="!loading ? deleteEvent() : null" v-else>
          <i class="fa-solid fa-trash-can"></i>
          <span class="ms-2">{{
            loading ? t('event.deleteprogress') : t('event.deleteevent')
          }}</span>
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const router = useRouter()
    const loading = ref(false)
    const changeLoadingState = () => {
      loading.value = !loading.value
    }

    const authStore = useAuthStore()
    const { _user: user } = storeToRefs(authStore)

    const eventStore = useEventStore()
    const { _statusCode: statusCode, _currentEvent: currentEvent } = storeToRefs(eventStore)

    const deleteEvent = async () => {
      changeLoadingState()
      await eventStore.deleteEvent(currentEvent.value.id).then(() => {
        changeLoadingState()
        if (statusCode.value === 200) {
          router.back()
        }
      })
    }

    return { t, loading, eventStore, user, deleteEvent, currentEvent }
  },
  beforeUnmount() {
    this.eventStore.$patch({
      statusCode: 0
    })
  }
})
</script>

<style scoped></style>
