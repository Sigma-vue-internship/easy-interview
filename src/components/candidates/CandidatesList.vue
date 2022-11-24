<script setup>
import CandidateForm from "./CandidateForm.vue";
import { useCandidateStore } from "../../stores/candidates";
import { ref } from "vue";

const { getAllCandidates } = useCandidateStore();
const candidatesList = ref([]);
async function getCandidates() {
  try {
    const { data } = await getAllCandidates();
    candidatesList.value = data;
  } catch (e) {
    console.log(e);
  }
}
getCandidates();
</script>
<template>
  <div class="container pt-4">
    <div class="row mb-3 align-items-center">
      <h1
        class="col-md-3 col-lg-2 me-md-4 mb-lg-0 align-self-center text-center text-md-start text-primary"
      >
        Candidates
      </h1>
      <button
        type="button"
        class="btn btn-primary mx-auto mx-md-0 col-5 my-2 my-md-0 col-md-3 ms-md-5 col-lg-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add candidate
      </button>
      <CandidateForm
        class="col-lg-2 my-xs-4 my-lg-0 ms-lg-5 ms-xl-4 ms-xxl-0 text-center text-md-start"
      />
    </div>
    <ul class="list-unstyled row g-md-4 g-lg-4 g-2">
      <li
        v-for="candidate in candidatesList"
        :key="candidate.id"
        class="col-8 col-md-4 col-lg-3 mx-auto mx-md-0 mb-3 mb-md-0 text-center text-primary candidate__item"
      >
        <div class="card rounded-3">
          <img
            class="card-img-top"
            :src="candidate.avatarUrl"
            alt="candidateAvatar"
          />

          <div class="card-body">
            <h2 class="card-title fs-3">{{ candidate.username }}</h2>
          </div>
          <div>
            <p class="card-footer border-secondary fs-5 m-0">
              Position: {{ candidate.position }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
