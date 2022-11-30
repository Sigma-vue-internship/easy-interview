<script setup lang="ts">
import { useCandidateStore } from "../../stores/candidates";
import { ref } from "vue";
import { Candidate } from "../../../dto/candidates";

interface Emit {
  (e: "choosedCandidateId", id: number): void;
}

defineProps({
  candidate: {
    type: Object as () => Candidate,
    default: () => ({
      position: "",
      username: "",
      linkedinUrl: "",
      feedback: "",
      avatarUrl: "",
      id: "",
    }),
  },
});

const emit = defineEmits<Emit>();
const candidatesList = ref<Candidate[]>([]);
const { getAllCandidates } = useCandidateStore();
const selectCandidate = ref();

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

function choosedCandidateId(candidate: string) {
  const splitArray = candidate.split(", ");
  const choosedCandidate = candidatesList.value.find(
    quizCandidate =>
      quizCandidate.username == splitArray[0] &&
      quizCandidate.position == splitArray[1],
  );
  if (choosedCandidate) {
    const candidateId = ref(choosedCandidate.id);
    emit("choosedCandidateId", candidateId.value);
  }
}
</script>

<template>
  <h2 class="text-primary text-center text-md-start">Choose Candidate</h2>
  <div class="col-12 col-lg-6">
    <input
      id="dataList"
      v-model="selectCandidate"
      class="form-control"
      list="datalistOptions"
      placeholder="Type to search..."
      @change="choosedCandidateId(selectCandidate)"
    />
    <datalist id="datalistOptions">
      <option
        v-for="oneCandidate in candidatesList"
        :key="oneCandidate.id"
      >
        {{ oneCandidate.username }}, {{ oneCandidate.position }}
      </option>
    </datalist>
  </div>
</template>
