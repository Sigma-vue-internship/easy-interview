<script setup lang="ts">
import { useRouter } from "vue-router";
import formattingDate from "../../utils/dateFormatting";
import { useCandidateStore } from "../../stores/candidates";
import { useResultsStore } from "../../stores/results";
import { ref, watch } from "vue";
import { Candidate } from "../../../dto/candidates";
import { Result } from "../../../dto/results";

defineProps({
  candidate: {
    type: Object as () => Candidate,
    default: () => ({
      position: "",
      username: "",
      linkedinUrl: "",
      feedback: "",
      avatarUrl: "",
      id: 0,
    }),
  },
  result: {
    type: Object as () => Result,
    default: () => ({
      questionAnswer: [],
      startedAt: 0,
      endedAt: 0,
      id: 0,
      title: "",
    }),
  },
});

const router = useRouter();
const candidatesList = ref<Candidate[]>([]);
const { getAllCandidates } = useCandidateStore();
const { getResultsForCandidate } = useResultsStore();
const selectCandidate = ref("");
const isCandidatesVisible = ref(false);
const choosedCandidates = ref<Candidate[]>([]);
const quizResults = ref<Result[]>([]);
async function getAllCandidatesData() {
  try {
    const {
      data: { candidates },
    } = await getAllCandidates();
    candidatesList.value = candidates;
  } catch (e) {
    console.log(e);
  }
}
getAllCandidatesData();

async function getResultsForCandidateData(candidateId: number) {
  try {
    const { data } = await getResultsForCandidate(candidateId);
    quizResults.value = data;
  } catch (e) {
    console.log(e);
  }
}

watch(selectCandidate, newCandidate => {
  choosedCandidates.value = candidatesList.value.filter(candidate =>
    candidate.username.includes(newCandidate),
  );
  return newCandidate;
});
function setCandidate(user: Candidate) {
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
    <h2 class="text-primary text-center text-md-start">Quiz Results</h2>
    <div class="col-12">
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
        style="max-height: 245px"
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
              alt=""
            />
            <div class="flex-column text-start">
              <p class="m-1 me-3">{{ singleCandidate.username }}</p>
              <p class="m-1 me-3">{{ singleCandidate.position }}</p>
            </div>
          </div>
        </a>
      </div>
      <div v-if="quizResults.length">
        <ul class="list-unstyled">
          <li
            v-for="oneResult in quizResults"
            :key="oneResult.id"
            class="border border-light mt-4 p-2 rounded-3 text-secondary mx-auto shadow-sm ps-4"
            @click="pushRoute(oneResult.id, oneResult.parent.id)"
          >
            <div class="row">
              <h4 class="text-center text-lg-start">{{ oneResult.title }}</h4>
            </div>
            <div class="row text-center text-lg-start">
              <div class="col-12 col-lg-6">
                {{ oneResult.parent.username }}
              </div>
              <div class="col-12 col-lg-3">
                {{ oneResult.parent.position }}
              </div>
              <div class="col-12 col-lg-3 text-lg-end pe-4">
                {{ formattingDate(oneResult.endedAt) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="selectCandidate.length >= 1 && quizResults.length === 0">
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
