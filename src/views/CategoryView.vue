<template>
  <Suspense>
    <template #default>
      <QuestionsList />
    </template>
    <template #fallback>
      <SpinnerLoader />
    </template>
  </Suspense>
</template>

<script setup>
import QuestionsList from "../components/questions/QuestionsList.vue";
</script>
