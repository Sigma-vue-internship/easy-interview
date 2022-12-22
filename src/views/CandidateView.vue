<script setup lang="ts">
import SubmitButton from "../components/common/SubmitButton.vue";
import DeleteButton from "../components/common/DeleteButton.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useCandidateStore } from "../stores/candidates";
import { useResultsStore } from "../stores/results";
import CandidateForm from "../components/candidates/CandidateForm.vue";
import { Candidate } from "../dto/candidates";
import { Result } from "../dto/results";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { getRouterParam } from "../service/routerParam";
import { formattingDate } from "../utils/dateFormatting";

const { params } = useRoute();
const router = useRouter();
const isLoaderVisible = ref(true);

const currentCandidate = ref<Candidate>({
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: "",
});

async function getCandidateData() {
  try {
    isLoaderVisible.value = true;
    currentCandidate.value = await getCandidateById(getRouterParam(params.id));
    candidateInit = { ...currentCandidate.value };
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}

const { getResultsForCandidate, deleteResult, deletePercentageResult } =
  useResultsStore();
const candidateResults = ref<Result[]>([]);

async function getResultsForCandidateData() {
  try {
    candidateResults.value = await getResultsForCandidate(
      getRouterParam(params.id),
    );
  } catch (e) {
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
  id: "",
};

async function editSingleCandidate() {
  try {
    isLoaderVisible.value = true;
    candidateInit = await editCandidate(currentCandidate.value);
    currentCandidate.value = candidateInit;
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
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
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}

async function deleteQuizResult(candidateId: string, resultId: string) {
  try {
    await deleteResult(candidateId, resultId);
    await deletePercentageResult(resultId);
    candidateResults.value = candidateResults.value.filter(
      result => result.id !== resultId,
    );
    Notify.success("Result successfully deleted", {
      distance: "65px",
      success: {
        background: "#87CF23",
      },
    });
  } catch (e) {
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
          v-if="currentCandidate.avatarUrl"
          id="avatarUrl"
          :src="currentCandidate.avatarUrl"
          alt="singleCandidate image"
          class="candidate__img rounded-4 border bg-light p-1"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-user-large"
          class="text-primary m-auto"
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
            v-if="currentCandidate.linkedinUrl"
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
          <div class="col-12 mb-2">
            {{ result.title }}, {{ formattingDate(result.endedAt) }}
          </div>
          <div class="row align-items-center">
            <div class="col-7 text-end">
              <button
                class="btn btn-outline-secondary rounded-pill px-4 opacity-75 show-more"
                @click="pushRoute(result.parent.id, result.id)"
              >
                show full
              </button>
            </div>
            <div class="col-5 text-start">
              <font-awesome-icon
                role="button"
                icon="fa-solid fa-trash-can"
                class="text-danger fs-4"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Delete quiz result"
                @click="deleteQuizResult(result.parent.id, result.id)"
              />
            </div>
          </div>
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
    :modal-size="'modal-m'"
  >
    <p class="text-secondary">
      Are you sure you want to delete this candidate ?
    </p>
    <div class="d-flex justify-content-end">
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
<style lang="scss" scoped>
.candidate__img {
  width: 270px;
  height: 270px;
}

.fa-user-large {
  height: 200px;
}
</style>
