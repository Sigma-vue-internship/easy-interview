<script setup lang="ts">
import CandidateForm from "./CandidateForm.vue";
import { useCandidateStore } from "../../stores/candidates";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const { getCandidatesByPage } = useCandidateStore();
const candidatesList = ref([]);
const candidatePagesNum = ref(0);
const currentPage = ref(1);
const isLoaderVisible = ref(true);
const router = useRouter();
async function getCandidates(page: number = 1) {
  try {
    isLoaderVisible.value = true;
    router.push({ name: "candidates", query: { page } });
    const {
      data: { candidates, count },
    } = await getCandidatesByPage(page);

    candidatePagesNum.value = Math.ceil(count / 8);

    candidatesList.value = candidates;
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    console.log(e);
  }
}

watch(currentPage, pageNum => {
  getCandidates(pageNum);
});

const currentCandidate = ref({});
const formType = ref("post");

const formTitle = computed(() =>
  formType.value === "put" ? "Edit candidate" : "Add new candidate",
);

function clearForm() {
  currentCandidate.value = {};
}

getCandidates();
</script>
<template>
  <div class="container pt-4">
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
          :single-candidate="currentCandidate"
          :form-type="formType"
          @update-candidates-list="getCandidateList"
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
            class="rounded-circle img-fluid p-2 border-primary border border-3"
            :src="candidate.avatarUrl"
            width="150"
            height="150"
            alt="candidateAvatar"
          />

          <div class="flex ms-4 text-start">
            <h2 class="fs-3">{{ candidate.username }}</h2>

            <p class="border-dark fs-5 m-0">
              Position: {{ candidate.position }}
            </p>
            <button class="btn btn-primary mt-4">Open candidate</button>
          </div>
        </router-link>
      </li>
    </ul>
    <Pagination
      v-if="!isLoaderVisible"
      v-model:currentPage="currentPage"
      class="pb-5 pt-2"
      :page-count="candidatePagesNum"
    />
    <!-- <Pagination
      v-if="!isLoaderVisible"
      v-model:current-page="currentPage"
      class="pb-5 pt-2"
      :page-count="candidatePagesNum"
      @change-page="getCandidates"
    /> -->
  </div>
</template>
