<script setup lang="ts">
import { useResultsStore } from "../stores/results";
import { PercentsResult } from "../dto/results";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { getPercentageResults } = useResultsStore();
const isLoaderVisible = ref(true);
const lastResult = ref<PercentsResult>({
  candidateUsername: "",
  resultPoints: 0,
  candidateId: "",
  id: "",
});

async function getAllResults() {
  isLoaderVisible.value = true;
  const data = await getPercentageResults();
  lastResult.value = data[data.length - 1];
  pushRoute(lastResult.value.candidateId, lastResult.value.id);
  isLoaderVisible.value = false;
}

function pushRoute(candidateId: string, resultId: string) {
  router.push({
    name: "singleResult",
    params: {
      candidateId,
      resultId,
    },
  });
}

getAllResults();
</script>

<template>
  <SpinnerLoader v-if="isLoaderVisible" />
</template>
