<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
// import { useAuth0 } from "@auth0/auth0-vue";
// import SpinnerLoader from "@/components/ui/SpinnerLoader.vue";

// const auth0 = useAuth0();
// let isLoading = auth0.isLoading.value;
// console.log(isLoading);
</script>

<template>
  <Header />
  <!-- <RouterLink to="/dashboard">Dashboard</RouterLink>
  <RouterLink to="/categories">Categories</RouterLink> -->
  <!-- <SpinnerLoader v-if="isLoading" /> -->
  <RouterView />
</template>

<style scoped></style>
