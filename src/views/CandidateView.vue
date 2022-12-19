<script setup lang="ts">
import SubmitButton from "../components/common/SubmitButton.vue";
import DeleteButton from "../components/common/DeleteButton.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useCandidateStore } from "../stores/candidates";
import { useResultsStore } from "../stores/results";
import CandidateForm from "../components/candidates/CandidateForm.vue";
import { Candidate } from "../../dto/candidates";
import { Result } from "../../dto/results";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const { params } = useRoute();
const router = useRouter();
const isLoaderVisible = ref(true);

const currentCandidate = ref<Candidate>({
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
});
async function getCandidateData() {
  try {
    isLoaderVisible.value = true;
    const { data } = await getCandidateById(params.id);
    currentCandidate.value = data;
    candidateInit = { ...data };
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}

const { getResultsForCandidate } = useResultsStore();
const candidateResults = ref<Result[]>([]);
async function getResultsForCandidateData() {
  try {
    const { data } = await getResultsForCandidate(params.id);
    candidateResults.value = data;
  } catch (e) {
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
getResultsForCandidateData();

const formType = ref("put");
const { getCandidateById, deleteCandidateById, editCandidate } =
  useCandidateStore();

let candidateInit = {
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
};

async function editSingleCandidate() {
  try {
    const { data } = await editCandidate(currentCandidate.value);
    candidateInit = { ...data };
    currentCandidate.value = data;
  } catch (e) {
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
async function deleteCandidate() {
  try {
    await deleteCandidateById(currentCandidate.value.id);
    router.push({
      name: "candidates",
    });
  } catch (e) {
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
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

function resetCandidate() {
  currentCandidate.value = { ...candidateInit };
}

getCandidateData();
</script>

<template>
  <SpinnerLoader v-if="isLoaderVisible" />
  <div
    v-if="!isLoaderVisible"
    class="shadow border border-2 border-light py-4 rounded-3"
  >
    <div class="row gx-0 justify-content-center justify-content-lg-between">
      <div
        class="col-12 col-lg-4 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start ps-lg-4"
      >
        <img
          id="avatarUrl"
          :src="currentCandidate.avatarUrl"
          alt="singleCandidate image"
          width="298"
          height="298"
          class="img-fluid rounded-4 border bg-light p-1"
        />
      </div>
      <div
        class="col-11 col-lg-7 text-center text-lg-start shadow border border-2 border-light p-3 me-lg-4 rounded-3"
      >
        <h2
          id="username"
          class="text-primary"
        >
          {{ currentCandidate.username }}
        </h2>
        <h3
          id="position"
          class="text-secondary"
        >
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
        <SubmitButton
          data-bs-toggle="modal"
          data-bs-target="#editCandidate"
          >Edit</SubmitButton
        >
        <DeleteButton
          data-bs-toggle="modal"
          data-bs-target="#alertCandidate"
        />
        <p
          id="feedback"
          class="text-secondary mt-4"
        >
          <span class="text-primary">Feedback:</span>
          {{ currentCandidate.feedback }}
        </p>
      </div>
    </div>
    <div class="text-center mt-4">
      <h3 class="text-primary mb-3">Quiz results</h3>
      <ul
        v-if="candidateResults.length"
        class="list-unstyled row"
      >
        <li
          v-for="result in candidateResults"
          :key="result.id"
          class="my-2 text-secondary col-12 col-lg-4"
        >
          {{ result.title }}
          <button
            class="btn btn-outline-secondary rounded-pill ms-3 opacity-75 show-more"
            @click="pushRoute(result.parent.id, result.id)"
          >
            show full
          </button>
        </li>
      </ul>
      <div v-if="!candidateResults.length">
        <p class="text-secondary">
          All results will be displayed here after passing quiz by candidate
        </p>
      </div>
    </div>
  </div>
  <EasyModal
    :title="'Edit candidate'"
    :modal-id="'editCandidate'"
    @close-modal="resetCandidate"
  >
    <CandidateForm
      v-model:candidate="currentCandidate"
      :form-type="formType"
      @edit-candidate="editSingleCandidate"
    />
  </EasyModal>
  <EasyModal
    :title="'Delete candidate'"
    :modal-id="'alertCandidate'"
    :modal-size="'modal-sm'"
  >
    <p class="text-secondary">
      Are you sure you want to delete this candidate ?
    </p>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-outline-secondary text-align-end me-2"
        data-bs-dismiss="modal"
      >
        Cancel
      </button>
      <button
        class="btn btn-danger text-align-end"
        data-bs-dismiss="modal"
        @click="deleteCandidate"
      >
        <font-awesome-icon icon="fa-solid fa-trash-can" />
      </button>
    </div>
  </EasyModal>
</template>
