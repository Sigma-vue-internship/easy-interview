<script setup lang="ts">
import { useCandidateStore } from "../../stores/candidates";
import debounce from "lodash/debounce";

import { ref, watch } from "vue";
import { Candidate } from "../../../dto/candidates";
import EasyDropdown from "../common/EasyDropdown.vue";

interface Emit {
  (e: "choosedCandidate", id: number, name: string): void;
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
const { getCandidatesByUsername } = useCandidateStore();
const selectCandidate = ref(""); // v-model input
const choosedCandidate = ref(""); // emitted candidate
const isCandidatesVisible = ref(false);
const choosedCandidates = ref<Candidate[]>([]);

watch(selectCandidate, async newCandidate => {
  const {
    data: { candidates },
  } = await getCandidatesByUsername(newCandidate);

  choosedCandidates.value = candidates;
});
function setCandidate(user: Candidate) {
  isCandidatesVisible.value = false;
  emit("choosedCandidate", user.id, user.username);
  choosedCandidate.value = user.username;
}
</script>

<template>
  <h2 class="text-primary text-center text-md-start">Choose Candidate</h2>
  <div class="col-12 position-relative">
    <EasyDropdown
      v-model:dropdown-input="selectCandidate"
      :dropdown-data="choosedCandidates"
      @set-dropdown-obj="setCandidate"
    />
    <h3 class="fs-5 text-start pt-2">
      Choosed candidate:
      <span class="fw-normal">{{
        choosedCandidate.length ? choosedCandidate : "none"
      }}</span>
    </h3>
  </div>
</template>
