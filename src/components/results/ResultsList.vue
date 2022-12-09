<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  formattingDate,
  formattingHours,
  calculateTime,
} from "../../utils/dateFormatting";
import { useCandidateStore } from "../../stores/candidates";
import { useResultsStore } from "../../stores/results";
import { ref, watch } from "vue";
import { Candidate } from "../../../dto/candidates";
import { Result } from "../../../dto/results";
import _debounce from "lodash/debounce";

const router = useRouter();
const { getAllCandidates } = useCandidateStore();
const { getResultsForCandidate } = useResultsStore();

const candidatesList = ref<Candidate[]>([]);
const selectCandidate = ref("");
const isCandidatesVisible = ref(false);
const choosedCandidates = ref<Candidate[]>([]);
const quizResults = ref<Result[]>([]);
const isLoaderVisible = ref(true);

async function getAllCandidatesData() {
  try {
    isLoaderVisible.value = true;
    const {
      data: { candidates },
    } = await getAllCandidates();
    candidatesList.value = candidates;
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    console.log(e);
  }
}
getAllCandidatesData();

async function getResultsForCandidateData(candidateId: number) {
  try {
    isLoaderVisible.value = true;
    const { data } = await getResultsForCandidate(candidateId);
    quizResults.value = data;
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    console.log(e);
  }
}

watch(selectCandidate, newCandidate => {
  choosedCandidates.value = candidatesList.value.filter(candidate =>
    candidate.username.includes(newCandidate),
  );
});
function setCandidate(user: Candidate) {
  quizResults.value = [];
  isCandidatesVisible.value = false;
  selectCandidate.value = user.username;
  getResultsForCandidateData(user.id);
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
</script>

<template>
  <div class="container mt-3">
    <h2 class="text-primary text-center text-md-start mb-md-2">Quiz Results</h2>
    <div
      class="alert alert-warning"
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
      <input
        id="candadidateInput"
        v-model="selectCandidate"
        class="form-control"
        placeholder="Enter username to search..."
        @focusin="isCandidatesVisible = true"
      />
      <div
        v-if="selectCandidate.length >= 1 && isCandidatesVisible"
        class="list-group overflow-scroll w-100 position-absolute"
      >
        <a
          v-for="singleCandidate in choosedCandidates"
          :key="singleCandidate.id"
          class="list-group-item list-group-item-action p-0 px-2"
        >
          <div
            class="d-flex w-100 align-items-center gap-3"
            @click="setCandidate(singleCandidate)"
          >
            <img
              :src="singleCandidate.avatarUrl"
              class="rounded-circle"
              height="50"
              alt="avatar"
            />
            <div class="flex-column text-start">
              <p class="m-1 me-3">{{ singleCandidate.username }}</p>
              <p class="m-1 me-3">{{ singleCandidate.position }}</p>
            </div>
          </div>
        </a>
      </div>
      <SpinnerLoader
        v-if="isLoaderVisible"
        class="mt-5"
      />
      <div v-if="quizResults.length && !isLoaderVisible">
        <h2 class="text-primary text-center text-md-start mt-4">
          Results List
        </h2>
        <ul class="list-unstyled">
          <li
            v-for="oneResult in quizResults"
            :key="oneResult.id"
            class="border border-light mt-3 mb-4 p-2 rounded-3 text-secondary mx-auto shadow ps-4 pe-auto"
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Click for showing full report"
            @click="pushRoute(oneResult.parent.id, oneResult.id)"
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
                  {{ calculateTime(oneResult.startedAt, oneResult.endedAt) }}
                  minutes
                </span>
                <span class="d-block text-secondary text-center text-md-start">
                  <font-awesome-icon
                    icon="fa-solid fa-calendar-days"
                    class="text-primary fs-6"
                  />
                  Ended at: {{ formattingDate(oneResult.endedAt) }},
                  {{ formattingHours(oneResult.endedAt) }}
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
          selectCandidate.length >= 1 &&
          quizResults.length === 0 &&
          !isLoaderVisible
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
  </div>
</template>

<style scoped>
.overflow-scroll {
  max-height: 245px;
}
</style>
