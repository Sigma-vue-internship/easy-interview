<script setup lang="ts">
import { useResultsStore } from "../stores/results";
import { Result } from "../dto/results";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { getLastResult } = useResultsStore();
const isLoaderVisible = ref(true);
const lastResult = ref<Result>({
  answerArray: [],
  startedAt: 0,
  endedAt: 0,
  title: "",
  _id: "",
  resultPoints: "",
  candidateId: {
    position: "",
    username: "",
    linkedinUrl: "",
    feedback: "",
    avatarUrl: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
  },
  createdAt: "",
  updatedAt: "",
});

async function getAllResults() {
  isLoaderVisible.value = true;
  lastResult.value = await getLastResult();
  pushRoute(lastResult.value._id);
}

function pushRoute(resultId: string) {
  router.push({
    name: "singleResult",
    params: {
      resultId,
    },
  });
}

getAllResults();
</script>

<template>
  <SpinnerLoader v-if="isLoaderVisible" />
</template>
