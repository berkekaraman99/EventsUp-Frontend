<template>
  <div class="vh-100">
    <!-- <div
      class="app-background"
      v-if="$route.name !== 'auth' && $route.name !== 'forgetpassword' && $route.path !== '/'"
    ></div> -->
    <BaseApp>
      <template #header>
        <Transition name="fade">
          <TheHeader
            v-if="
              $route.name !== 'auth' && $route.name !== 'signup' && $route.name !== 'forgetpassword'
            "
          />
        </Transition>
      </template>
      <template #sidebar>
        <Transition name="fade">
          <LeftBar
            v-if="
              $route.name !== 'auth' && $route.name !== 'signup' && $route.name !== 'forgetpassword'
            "
          />
        </Transition>
      </template>
      <template #main>
        <div
          class="main"
          :class="{
            'tw-w-screen tw-px-3': $route.name === 'auth' || $route.name === 'forgetpassword',
            'tw-max-w-screen-xl tw-mx-auto tw-px-3':
              $route.name !== 'auth' && $route.name !== 'forgetpassword'
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
                v-if="
                  $route.name === 'home' || $route.name === 'search' || $route.name === 'events'
                "
              >
                <SidebarRight />
              </div>
            </Transition>
          </div>
        </div>
      </template>
    </BaseApp>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import SidebarRight from './components/Sidebar/Right/SidebarRight.vue'
import TheHeader from './components/header/TheHeader.vue'
import LeftBar from '@/components/Sidebar/Left/LeftBar.vue'
import BaseApp from './components/UI/BaseApp.vue'

// const body = document.querySelector('body')

// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
//   if (matches) {
//     body?.setAttribute('data-bs-theme', 'dark')
//   } else {
//     body?.setAttribute('data-bs-theme', 'light')
//   }
// })

// watchEffect(() => {
//   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     body?.setAttribute('data-bs-theme', 'dark')
//   } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
//     body?.setAttribute('data-bs-theme', 'light')
//   }
// })
</script>

<style lang="scss">
.main {
  transition: 0.3s ease;
}
.app-background {
  opacity: 1;
  background-image: url('https://images.unsplash.com/photo-1578759525424-b2fd964ca5a2?ixid=M3w4ODczOHwwfDF8cmFuZG9tfHx8fHx8fHx8MTY5OTM1MTI2MHw&ixlib=rb-4.0.3&w=1920&h=1080&dpr=1&auto=format&q=75&fit=crop');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
