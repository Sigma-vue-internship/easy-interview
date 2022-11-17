<script setup>
import EditButton from "../common/EditButton.vue";
import DeleteButton from "../common/DeleteButton.vue";

import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useCandidateStore } from "../../stores/candidates";
const { params } = useRoute();
const currentCandidate = ref({});
onMounted(async () => {
  try {
    const { getCandidateById } = useCandidateStore();
    const { data } = await getCandidateById(params.id);
    if (data.length > 1) {
      currentCandidate.value = data.filter((candidate) => {
        return candidate.id === params.id;
      })[0];
      return;
    }
    currentCandidate.value = data[0];
  } catch (e) {
    console.log(e);
  }
});

let candidateResults = [
  {
    questionAnswer: [],
    startedAt: 1666948101,
    endedAt: 1666948101,
    title: "title 1",
    id: "1",
    candidateId: "1",
  },
  {
    questionAnswer: [],
    startedAt: 1666958718,
    endedAt: 1666958718,
    title: "title 5",
    id: "5",
    candidateId: "1",
  },
  {
    questionAnswer: [],
    startedAt: 1666958718,
    endedAt: 1666958718,
    title: "title 8",
    id: "5523",
    candidateId: "1",
  },
];
function resultsID(id) {
  console.log(id);
}
function editProfile() {
  console.log("edit button");
}
function deleteProfile() {
  console.log("delete button");
}
</script>

<template>
  <div class="container border border-2 border-light mt-3 rounded-3 p-4">
    <div class="row">
      <div class="col-12 col-lg-5 d-flex justify-content-center">
        <img
          id="avatarUrl"
          :src="currentCandidate.avatarUrl"
          alt="candidateAvatar"
          class="img-fluid"
        />
      </div>
      <div class="col-12 col-lg-7 text-center text-lg-start">
        <h2 id="username" class="text-primary">
          {{ currentCandidate.username }}
        </h2>
        <h3 id="position" class="text-secondary">
          {{ currentCandidate.position }}
        </h3>
        <div
          class="text-secondary my-4 d-flex align-items-center justify-content-center justify-content-lg-start"
        >
          <font-awesome-icon
            icon="fa-brands fa-linkedin"
            class="text-primary me-2 fs-3"
          />
          {{ currentCandidate.linkedinUrl }}
        </div>
        <EditButton @click="editProfile" />
        <DeleteButton @click="deleteProfile" />
        <p id="feedback" class="text-secondary mt-4">
          <span class="text-primary">Feedback:</span>
          {{ currentCandidate.feedback }}
        </p>
      </div>
    </div>
    <div class="text-center mt-4">
      <h3 class="text-primary mb-3">Quiz results</h3>
      <ul class="list-unstyled row">
        <li
          class="my-2 text-secondary col-12 col-md-6 col-lg-4"
          v-for="result in candidateResults"
          :key="result.id"
        >
          {{ result.title }}
          <button
            class="btn btn-outline-secondary rounded-pill ms-3 opacity-75 show-more"
            @click="resultsID(result.id)"
          >
            show full
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
