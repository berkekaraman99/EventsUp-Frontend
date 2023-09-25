<template>
  <div class="container-fluid d-flex">
    <Background />
    <Transition name="fade" mode="out-in">
      <Login v-if="authtype === 'login'" @changetype="changetype" />
      <SignupVue v-else-if="authtype === 'signup'" @changetype="changetype" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/common/auth/LogIn.vue";
import SignupVue from "@/components/common/auth/SignupVue.vue";
import Background from "@/components/common/auth/BackgroundVue.vue";
import { ref } from "vue";

const authtype = ref("login");
const changetype = (type: string) => {
  authtype.value = type;
};
</script>

<style scoped>
.container-fluid {
  padding: 0px;
  height: 100vh;
}
</style>
