<template>
  <Transition name="toast">
    <div class="position-absolute end-0 bottom-0 m-3" style="width: 300px" v-if="showToast">
      <div class="glass-effect overflow-hidden">
        <div
          class="text-white py-2 px-3"
          :class="{ 'bg-success': statusCode === 200, 'bg-danger': statusCode !== 200 }"
        >
          <div class="d-flex align-items-center justify-content-between">
            <strong>{{ header }}</strong>
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-center p-2"
          style="min-height: 80px; max-height: 100px"
        >
          <div class="fw-medium">{{ content }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    statusCode: {
      type: Number,
      required: true
    },
    showToast: {
      type: Boolean,
      required: true
    },
    header: {
      type: String
    },
    content: {
      type: String
    }
  }
})
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  /* transform: translateY(-20px); */
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}
</style>
