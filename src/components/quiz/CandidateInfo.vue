<script setup lang="ts">
import { useCandidateStore } from "../../stores/candidates";
import { ref, watch } from "vue";
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
      id: 0,
    }),
  },
});

const emit = defineEmits<Emit>();
const candidatesList = ref<Candidate[]>([]);
const { getAllCandidates } = useCandidateStore();
const selectCandidate = ref("");
const isCandidatesVisible = ref(false);
const choosedCandidates = ref<Candidate[]>([]);
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
watch(selectCandidate, newCandidate => {
  choosedCandidates.value = candidatesList.value.filter(candidate =>
    candidate.username.includes(newCandidate),
  );
});
function setCandidate(user: Candidate) {
  isCandidatesVisible.value = false;
  emit("choosedCandidateId", user.id);
  selectCandidate.value = user.username;
}
</script>

<template>
  <h2 class="text-primary text-center text-md-start">Choose Candidate</h2>

  <div class="col-12 w-50 position-relative">
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
  </div>
</template>

<style scoped>
.overflow-scroll {
  max-height: 245px;
}
</style>
