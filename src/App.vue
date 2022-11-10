<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import SpinnerLoader from "@/components/ui/SpinnerLoader.vue";
import QuestionForm from "./components/Questions/QuestionForm.vue";

const auth0 = useAuth0();
const isLoading = auth0.isLoading;
</script>

<template>
  <Header
    class="border border-top-0 border-start-0 border-end-0 border-secondary"
  />
  <SpinnerLoader v-if="isLoading" />
  <RouterView v-else />
  <QuestionForm />
</template>

<style scoped></style>
