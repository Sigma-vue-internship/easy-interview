<script setup lang="ts">
import { useCandidateStore } from "../../stores/candidates";

import { ref, watch, computed } from "vue";
import _isEmpty from "lodash/isEmpty";
import { Candidate } from "../../dto/candidates";
import EasyDropdown from "../common/EasyDropdown.vue";
import SubmitButton from "../common/SubmitButton.vue";

interface Emit {
  (e: "choosedCandidate", id: string, name: string): void;
  (e: "setCandidateSelected"): void;
}
const props = defineProps({
  isQuizAvailable: {
    type: Boolean,
    required: true,
    default() {
      return true;
    },
  },
});

const emit = defineEmits<Emit>();
const { getCandidatesByUsername } = useCandidateStore();
const selectCandidate = ref(""); // v-model input
const choosedCandidateObj = ref<Candidate>({}); // emitted candidate
const isCandidatesVisible = ref(false);
const choosedCandidates = ref<Candidate[]>([]);

watch(selectCandidate, async newCandidate => {
  choosedCandidates.value = await getCandidatesByUsername(newCandidate);
});
function setCandidate(user: Candidate) {
  isCandidatesVisible.value = false;
  emit("choosedCandidate", user.id, user.username);

  selectCandidate.value = user.username;
  choosedCandidateObj.value = choosedCandidates.value.find(
    candidate => candidate.id === user.id,
  );
}
const isCandidateEmpty = computed(() => _isEmpty(choosedCandidateObj.value));

const emitCandidateSelect = () => emit("setCandidateSelected");
</script>

<template>
  <h2 class="text-primary text-center text-md-start">Choose Candidate</h2>
  <div
    v-if="!choosedCandidateObj.id"
    class="alert alert-primary d-flex align-items-center text-start"
    role="alert"
  >
    <font-awesome-icon icon="fa-solid fa-circle-info" />
    <div class="ps-3">We didn't find any candidate by current name</div>
  </div>
  <div class="col-12 position-relative">
    <EasyDropdown
      v-model:dropdown-input="selectCandidate"
      :selected-item="selectCandidate"
      :dropdown-data="choosedCandidates"
      @set-dropdown-obj="setCandidate"
    />
  </div>
  <div
    v-if="!isCandidateEmpty"
    class="border rounded-2 border-light my-3 p-2 bg-body col-12 col-md-9"
  >
    <div class="row g-0 justfy-content-start">
      <div
        class="col-md-2 d-flex align-items-center justify-content-center justify-content-md-start ms-md-3 mb-3 mb-md-0"
      >
        <img
          v-if="choosedCandidateObj.avatarUrl"
          :src="choosedCandidateObj.avatarUrl"
          onerror="this.onerror=null; 
            this.src='../../assets/not-found-img.3ed597be.svg'
          "
          class="d-block rounded-circle p-2 border border-2 border-primary"
          width="150"
          height="150"
          alt="candidate avatar"
        />
        <img
          v-else
          src="../../../assets/not-found-img.svg"
          alt="singleCandidate image"
          class="text-primary text-center rounded-circle p-2 border-primary border border-3 candidate__img"
        />
      </div>
      <div class="col-md-6 offset-md-3 ms-lg-5">
        <div class="text-center text-md-start text-primary">
          <h5 class="">{{ choosedCandidateObj.username }}</h5>
          <p class="">
            {{ choosedCandidateObj.position }}
          </p>
          <p>
            <small class="text-muted">{{
              choosedCandidateObj.linkedinUrl
            }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center text-md-end">
    <SubmitButton
      v-if="!_isEmpty(choosedCandidateObj) && isQuizAvailable"
      id="stepToQuestions"
      @click="emitCandidateSelect"
      >Next step</SubmitButton
    >
  </div>
</template>
