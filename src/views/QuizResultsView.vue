<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  formattingDate,
  formattingHours,
  calculateTime,
} from "../utils/dateFormatting";
import { useCandidateStore } from "../stores/candidates";
import { useResultsStore } from "../stores/results";
import { ref, watch } from "vue";
import { Candidate } from "../dto/candidates";
import { ISingleCandidateResult } from "../dto/results";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import EasyDropdown from "../components/common/EasyDropdown.vue";

const router = useRouter();
const { getCandidatesByUsername } = useCandidateStore();
const { getResultsForCandidate } = useResultsStore();

const selectedCandidate = ref("");
const isCandidatesVisible = ref(false);
const choosedCandidates = ref<Candidate[]>([]);
const quizResults = ref<ISingleCandidateResult[]>([]);
const isLoaderVisible = ref(true);

async function getResultsForCandidateData(candidateId: number) {
  try {
    isLoaderVisible.value = true;
    quizResults.value = await getResultsForCandidate(candidateId);
    isLoaderVisible.value = false;
  } catch (e) {
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}

watch(selectedCandidate, async newCandidate => {
  choosedCandidates.value = await getCandidatesByUsername(newCandidate);
});

function setCandidate(user: Candidate) {
  quizResults.value = [];
  isCandidatesVisible.value = false;
  selectedCandidate.value = user.username;
  getResultsForCandidateData(user.id);
}

function pushRoute(candidateId: number, resultId: number) {
  router.push({
    name: "singleResult",
    params: {
      candidateId,
      resultId,
    },
  });
}
</script>

<template>
  <h2 class="text-primary text-center text-md-start mb-md-2">Quiz Results</h2>
  <div
    class="alert alert-primary"
    role="alert"
  >
    <font-awesome-icon
      icon="fa-solid fa-circle-info"
      class="fs-6"
    />
    Quiz results are grouped by Candidates. For displaying results, please,
    choose candidate from list
  </div>
  <div class="col-12 w-100 position-relative">
    <h2 class="text-primary text-center text-md-start mt-2">
      Choose candidate
    </h2>
    <EasyDropdown
      id="candadidateInput"
      v-model:dropdown-input="selectedCandidate"
      :dropdown-data="choosedCandidates"
      :selected-item="selectedCandidate"
      @set-dropdown-obj="setCandidate"
    />

    <div v-if="quizResults.length">
      <h2 class="text-primary text-center text-md-start mt-4">Results List</h2>
      <ul class="list-unstyled">
        <li
          v-for="oneResult in quizResults"
          :key="oneResult.id"
          class="border border-light mt-3 mb-4 p-2 rounded-3 text-secondary mx-auto shadow ps-4 pe-auto"
          role="button"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Click for showing full report"
          @click="pushRoute(oneResult.candidates_id, oneResult.id)"
        >
          <div class="row">
            <div class="col-12 col-md-10 col-lg-11">
              <h5 class="text-primary text-center text-md-start mb-1">
                Quiz Result {{ oneResult.id }}
              </h5>
              <span class="text-secondary text-center text-md-start d-block">
                <font-awesome-icon
                  icon="fa-regular fa-clock"
                  class="text-primary"
                />
                {{
                  calculateTime(
                    new Date(oneResult.started_at).getTime(),
                    new Date(oneResult.ended_at).getTime(),
                  )
                }}
                minutes
              </span>
              <span class="d-block text-secondary text-center text-md-start">
                <font-awesome-icon
                  icon="fa-solid fa-calendar-days"
                  class="text-primary fs-6"
                />
                Ended at:
                {{ formattingDate(new Date(oneResult.ended_at).getTime()) }},
                {{ formattingHours(new Date(oneResult.ended_at).getTime()) }}
              </span>
            </div>
            <div class="col-md-2 col-lg-1 text-center">
              <font-awesome-icon
                icon="fa-solid fa-chevron-down"
                class="text-secondary fs-4 pt-4 text-opacity-25"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-else-if="
        selectedCandidate && quizResults.length === 0 && !isLoaderVisible
      "
    >
      <h5 class="text-primary text-center mt-5">
        Sorry, this candidate has not passed any quiz yet
        <font-awesome-icon
          class="pt-4"
          icon="fa-regular fa-face-frown"
        />
      </h5>
    </div>
  </div>
</template>

<style scoped>
.overflow-scroll {
  max-height: 245px;
}
</style>
