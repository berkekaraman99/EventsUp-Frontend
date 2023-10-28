<template>
  <div class="container-fluid d-flex">
    <Background />
    <Transition name="fade" mode="out-in">
      <component :is="authtype"></component>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheSignin from '@/components/common/auth/TheSignin.vue'
import TheSignup from '@/components/common/auth/TheSignup.vue'
import Background from '@/components/common/auth/BackgroundVue.vue'

export default defineComponent({
  components: {
    'the-signin': TheSignin,
    'the-signup': TheSignup,
    Background
  },
  data() {
    return {
      authtype: 'the-signin'
    }
  },
  methods: {
    changetype(type: string) {
      this.authtype = type
    }
  },
  provide() {
    return {
      'change-type': this.changetype
    }
  }
})
</script>

<style scoped>
.container-fluid {
  padding: 0px;
  height: 100vh;
}
</style>
