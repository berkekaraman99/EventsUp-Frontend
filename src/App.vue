<template>
  <BaseApp>
    <template #header>
      <Transition name="fade">
        <TheHeader
          v-if="
            $route.name !== 'auth' &&
            $route.name !== 'signup' &&
            $route.name !== 'forgetpassword' &&
            $route.path !== '/'
          "
        />
      </Transition>
    </template>
    <template #sidebar>
      <Transition name="fade">
        <LeftBar
          v-if="
            $route.name !== 'auth' &&
            $route.name !== 'signup' &&
            $route.name !== 'forgetpassword' &&
            $route.path !== '/'
          "
        />
      </Transition>
    </template>
    <template #main>
      <div
        class="main"
        :class="{
          'container-fluid': $route.name === 'auth' || $route.name === 'forgetpassword',
          'container-md': $route.name !== 'auth' && $route.name !== 'forgetpassword'
        }"
        :style="{
          'padding-top': $route.name === 'auth' || $route.name === 'forgetpassword' ? '0' : '80px'
        }"
      >
        <div class="row overflow-hidden h-100">
          <!-- MAIN - ROUTER.VIEW -->
          <main
            class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 px-2 px-sm-0 px-md-0"
            :class="{
              'col-md-12 col-lg-12 col-xl-12 px-0':
                $route.name !== 'home' && $route.name !== 'search' && $route.name !== 'events'
            }"
          >
            <RouterView v-slot="{ Component, route }">
              <Transition name="customAnimation" mode="out-in">
                <component :is="Component" :key="route.path" />
              </Transition>
            </RouterView>
          </main>

          <!-- SIDEBAR RIGHT -->
          <Transition name="scaleInOut" mode="out-in">
            <div
              class="d-none d-sm-none d-md-none d-lg-flex col-md-3 col-lg-3 justify-content-lg-center px-0"
              v-if="$route.name === 'home' || $route.name === 'search' || $route.name === 'events'"
            >
              <SidebarRight />
            </div>
          </Transition>
        </div>
      </div>
    </template>
  </BaseApp>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SidebarRight from './components/Sidebar/Right/SidebarRight.vue'
import TheHeader from './components/header/TheHeader.vue'
import LeftBar from '@/components/Sidebar/Left/LeftBar.vue'
import BaseApp from './components/UI/BaseApp.vue'

export default defineComponent({
  components: {
    TheHeader,
    SidebarRight,
    LeftBar,
    BaseApp
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.main {
  // transition: 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  transition: 0.3s ease;
  // padding-top: 112px;

  // @media (max-width: 991px) {
  //   padding-left: 64px;
  // }

  // @media (min-width: 992px) {
  //   padding-left: 200px;
  // }
}
</style>
