<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import SpinnerLoader from "@/components/common/SpinnerLoader.vue";

const auth0 = useAuth0();
const isLoading = auth0.isLoading;
</script>

<template>
  <Header />
  <SpinnerLoader v-if="isLoading" />
  <RouterView v-else />
</template>
