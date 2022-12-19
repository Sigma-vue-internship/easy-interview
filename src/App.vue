<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const auth0 = useAuth0();
const isLoading = auth0.isLoading;
</script>

<template>
  <Header />
  <div class="container mt-3 text-secondary">
    <SpinnerLoader v-if="isLoading" />
    <RouterView
      v-else
      :key="$route.path"
    />
  </div>
</template>

<style lang="scss">
img {
  object-fit: cover;
  object-position: center;
}
</style>
