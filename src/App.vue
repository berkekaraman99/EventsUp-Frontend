<template>
  <div class="vh-100">
    <!-- NAVBAR -->
    <Transition name="fade">
      <NavBar
        v-if="
          $route.name !== 'auth' &&
          $route.name !== 'signup' &&
          $route.name !== 'forgetpassword' &&
          $route.path !== '/'
        "
        @toggle-bar="togglebar"
      />
    </Transition>
    <!-- LEFT SIDE BAR -->
    <Transition name="fade">
      <LeftBar
        v-if="
          $route.name !== 'auth' &&
          $route.name !== 'signup' &&
          $route.name !== 'forgetpassword' &&
          $route.path !== '/'
        "
        @toggle-bar="togglebar"
      />
    </Transition>

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
  </div>
</template>

<script setup lang="ts">
import SidebarRight from './components/Sidebar/Right/SidebarRight.vue'
import NavBar from './components/header/NavBar.vue'
import LeftBar from '@/components/Sidebar/Left/LeftBar.vue'
import { ref } from 'vue'

const leftBarToggle = ref(true)

const togglebar = () => {
  const leftBar: HTMLElement = document.getElementById('left-bar')!
  const main: HTMLElement = document.querySelector('.main')!
  // const navbar: HTMLElement = document.getElementById("navbar")!;

  const x = window.matchMedia('(max-width: 991px)')

  if (!leftBarToggle.value) {
    if (x.matches) {
      leftBar.style.left = '-224px'
      // main.style.paddingLeft = '0px'
      // navbar.style.left = "0px";
      leftBarToggle.value = !leftBarToggle.value
    } else {
      leftBar.style.left = '-224px'
      // main.style.paddingLeft = '0px'
      // navbar.style.left = "0px";
      leftBarToggle.value = !leftBarToggle.value
    }
  } else {
    if (x.matches) {
      leftBar.style.left = '0px'
      // main.style.paddingLeft = '64px'
      // navbar.style.left = "64px";
      leftBarToggle.value = !leftBarToggle.value
    } else {
      leftBar.style.left = '0px'
      // navbar.style.left = "208px";
      // main.style.paddingLeft = '224px'
      leftBarToggle.value = !leftBarToggle.value
    }
  }
}
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
