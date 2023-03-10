<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
</script>

<template>
  <Header />
  <div class="container mt-3 text-secondary">
    <!-- <SpinnerLoader v-if="isLoading" /> -->
    <RouterView key="$route.path" />
  </div>
</template>

<style lang="scss">
img {
  object-fit: cover;
  object-position: center;
}
</style>
