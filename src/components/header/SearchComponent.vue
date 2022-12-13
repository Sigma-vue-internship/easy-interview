<script setup lang="ts">
import { ref, watch } from "vue";
import { useCandidateStore } from "../../stores/candidates";
import { useQuestionStore } from "../../stores/questions";
import { Candidate } from "../../../dto/candidates";
interface SearchData {}

const searchInput = ref<string>("");
const isCandidateMode = ref<boolean>(false);
const isCategoryMode = ref<boolean>(false);
const candidateStore = useCandidateStore();
const questionStore = useQuestionStore();
const searchData = ref<Array<Candidate>>([]);
watch(searchInput, async () => {
  if (isCandidateMode.value && !isCategoryMode.value) {
    const {
      data: { candidates },
    }: { data: { candidates: Candidate[] } } =
      await candidateStore.getCandidatesByUsername(searchInput.value);
    searchData.value = [...candidates];
    console.log(searchData.value);
    return;
  } else if (isCategoryMode.value && !isCandidateMode.value) {
    console.log("Search for results", searchInput);
    return;
  } else if (isCandidateMode.value && isCategoryMode.value) {
    console.log("Search All", searchInput);
    return;
  }
  console.log("Do nothing");
});
</script>
<template>
  <div>
    <div class="row justify-content-evenly gx-0">
      <div
        class="col-md-10 row gx-2 justify-content-center justify-content-xl-end"
      >
        <div class="col-12 col-md-9">
          <EasyDropdown
            v-model:dropdownInput="searchInput"
            dropdown-data="searchData"
          />
          <!-- <input
            class="form-control text-secondary border-primary"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> -->
        </div>

        <div class="dropdown d-flex col-md-1 align-items-center">
          <button
            id="dropdownMenuButton"
            class="btn btn-outline-primary rounded-pill border-0 dropdown-toggle drop-img"
            type="submit"
            data-bs-toggle="dropdown"
          >
            <font-awesome-icon
              icon="fa-solid fa-filter"
              class="text-center"
              type="button"
            />
          </button>
          <ul
            class="dropdown-menu p-2 bg-light"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckDefault"
                  v-model="isCandidateMode"
                  class="form-check-input"
                  type="checkbox"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckDefault"
                >
                  Candidates
                </label>
              </div>
            </li>
            <li>
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckDefault"
                  v-model="isCategoryMode"
                  class="form-check-input"
                  type="checkbox"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckDefault"
                >
                  Questions
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-2 ps-2 align-self-center">
        <button
          class="btn btn-outline-primary border-0 rounded-pill"
          type="submit"
        >
          <font-awesome-icon
            icon="btn fa-solid fa-magnifying-glass text-primary"
          />
        </button>
      </div>
    </div>
  </div>
</template>
