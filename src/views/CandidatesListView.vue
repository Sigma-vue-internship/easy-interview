<script setup lang="ts">
import CandidateForm from "../components/candidates/CandidateForm.vue";
import { useCandidateStore } from "../stores/candidates";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Candidate } from "../dto/candidates";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const { getCandidatesByPage, addCandidate } = useCandidateStore();
const candidatesList = ref<Array<Candidate>>([]);
const candidatePagesNum = ref(0);
const currentPage = ref(1);
const isLoaderVisible = ref(true);
const router = useRouter();
const candidateInit = {
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: "0",
};
const currentCandidate = ref({ ...candidateInit });
const formType = ref("post");

async function getCandidates(page: number = 1) {
  try {
    isLoaderVisible.value = true;
    router.push({ name: "candidates", query: { page } });
    const { candidates, count } = await getCandidatesByPage(page);

    candidatePagesNum.value = Math.ceil(count / 8);

    candidatesList.value = candidates;
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
async function postCandidate() {
  try {
    await addCandidate(currentCandidate.value);
    clearForm();
    await getCandidates();
  } catch (e) {
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
watch(currentPage, pageNum => {
  getCandidates(pageNum);
});

const formTitle = computed(() =>
  formType.value === "put" ? "Edit candidate" : "Add new candidate",
);

function clearForm() {
  currentCandidate.value = { ...candidateInit };
}

getCandidates();
</script>
<template>
  <div class="row mb-3 align-items-center">
    <div class="d-flex justify-content-between">
      <h1
        class="col-md-3 col-lg-2 mb-lg-0 align-self-center text-center text-md-start text-primary"
      >
        Candidates
      </h1>
      <button
        type="button"
        class="d-inline btn btn-outline-primary border-0 rounded-circle"
        style="width: 45px; height: 45px"
        data-bs-toggle="modal"
        data-bs-target="#candidate"
      >
        <font-awesome-icon icon="fa-solid fa-user-plus fa-xl" />
      </button>
    </div>
    <EasyModal
      :title="formTitle"
      :modal-id="'candidate'"
      @close-modal="clearForm"
    >
      <CandidateForm
        v-model:candidate="currentCandidate"
        :form-type="formType"
        @add-candidate="postCandidate"
      />
    </EasyModal>
  </div>
  <SpinnerLoader v-if="isLoaderVisible" />
  <ul
    v-if="!isLoaderVisible"
    class="list-unstyled row g-md-4 g-lg-4 g-2"
  >
    <li
      v-for="candidate in candidatesList"
      :key="candidate.id"
      class="d-flex mx-auto mx-md-0 mb-3 mb-md-0 text-center candidate__item"
    >
      <router-link
        class="text-decoration-none d-flex w-100 rounded-3 p-2 bg-dark text-primary"
        :to="'/candidates/' + candidate.id"
      >
        <img
          v-if="candidate.avatarUrl"
          class="rounded-circle p-2 border-primary border border-3 candidate__img"
          :src="candidate.avatarUrl"
          alt="candidateAvatar"
          onerror="this.onerror=null;  
            this.src='../../assets/not-found-img.3ed597be.svg' 
          "
        />
        <img
          v-else
          src="../../assets/not-found-img.svg"
          class="rounded-circle p-2 border-primary border border-3 candidate__img"
          alt="avatar"
        />

        <div class="flex ms-4 text-start">
          <h2 class="fs-3">{{ candidate.username }}</h2>

          <p class="border-dark fs-5 m-0">Position: {{ candidate.position }}</p>
          <button class="btn btn-primary mt-4">See full description</button>
        </div>
      </router-link>
    </li>
  </ul>
  <Pagination
    v-if="!isLoaderVisible && candidatePagesNum > 1"
    v-model:currentPage="currentPage"
    class="pb-5 pt-2"
    :page-count="candidatePagesNum"
  />
</template>
<style lang="scss">
.candidate__img {
  width: 150px;
  height: 150px;
}

.fa-user-large {
  height: 110px;
}
</style>
