<script setup lang="ts">
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
const formType = ref("put");
const { getCandidateById, deleteCandidateById, editCandidate } =
  useCandidateStore();
const { getResultsForCandidate, deleteResult, deletePercentageResult } =
  useResultsStore();
const candidateResults = ref<Result[]>([]);

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
    // BUG:delete results as well
    const candidateResults = await getResultsForCandidate(
      currentCandidate.value.id,
    );
    const resultsIds = candidateResults.map(result => result.id);
    await sendDeleteRequests(resultsIds);
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
async function sendDeleteRequests(resultsIds: Array<string>) {
  resultsIds.forEach((id: string) => {
    deleteResult(currentCandidate.value.id, id);
    deletePercentageResult(id);
  });
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
    <div
      class="row gx-0 justify-content-center justify-content-lg-between px-4"
    >
      <div
        class="col-12 col-lg-4 col-xxl-3 mb-3 mb-lg-0 d-flex justify-content-center justify-content-lg-start"
      >
        <img
          v-if="currentCandidate.avatarUrl"
          id="avatarUrl"
          :src="currentCandidate.avatarUrl"
          alt="singleCandidate image"
          class="candidate__img rounded-4 border bg-light p-1"
          onerror="this.onerror=null; 
            this.src='../../assets/not-found-img.svg'
          "
        />
        <img
          v-else
          src="../../assets/not-found-img.svg"
          alt="singleCandidate image"
          class="candidate__img rounded-4 border bg-light p-1"
        />
      </div>
      <div
        class="col-11 col-lg-8 col-xxl-9 text-center text-lg-start shadow border border-2 border-light p-3 rounded-3"
      >
        <h2
          id="username"
          class="text-primary"
        >
          {{ currentCandidate.username }}
          <font-awesome-icon
            role="button"
            icon="fa-solid fa-pencil"
            class="text-primary fs-4 mx-3 edit-button"
            data-bs-toggle="modal"
            data-bs-target="#editCandidate"
          />
          <font-awesome-icon
            role="button"
            icon="fa-solid fa-trash-can"
            class="text-danger fs-4 delete-button"
            data-bs-toggle="modal"
            data-bs-target="#alertCandidate"
          />
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
          <a
            :href="currentCandidate.linkedinUrl"
            target="blank"
            class="candidate-link text-start text-truncate"
            >{{ currentCandidate.linkedinUrl }}</a
          >
        </div>
        <p
          id="feedback"
          class="text-secondary mt-4"
        >
          <span class="text-primary">Feedback:</span>
          {{ currentCandidate.feedback }}
        </p>
      </div>
    </div>
    <div class="text-md-start mt-4 ps-4">
      <h3 class="text-primary">Quiz results</h3>
      <ul
        v-if="candidateResults.length"
        class="list-unstyled row justify-content-lg-between"
      >
        <li
          v-for="(result, index) in candidateResults"
          :key="result.id"
          class="my-2 text-secondary row col-lg-4 align-items-center"
        >
          <div class="col-7 col-md-5 col-lg-7 mb-2">
            #{{ index + 1 }}. {{ result.title }},
            {{ formattingDate(result.endedAt) }}
          </div>
          <div class="col-4">
            <font-awesome-icon
              role="button"
              icon="fa-regular fa-circle-right"
              class="text-primary fs-4 me-3"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Go to full result"
              @click="pushRoute(result.parent.id, result.id)"
            />
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
        </li>
      </ul>
      <div v-if="!candidateResults.length">
        <p class="text-secondary text-md-start ps-1">
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
  height: 270px;
}

.candidate-link {
  word-wrap: break-word;
  width: 100%;
}
</style>
