<script setup lang="ts">
import { ref, watch } from "vue";

interface SearchData{
  
}

const searchInput = ref("");
const isCandidateMode = ref<boolean>(false);
const isResultMode = ref<boolean>(false);
const searchData = ref([]);
watch(searchInput, updatedInput => {
  if (isCandidateMode.value) {
    console.log("Search for candidate");
    return;
  } else if (isResultMode.value) {
    console.log("Search for results");
    return;
  } else if (isCandidateMode.value && isResultMode.value) {
    console.log("Search All");
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
            class="d-block form-control text-secondary border-primary h-100"
            type="search"
            placeholder="Search"
            aria-label="Search"
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
                  v-model="isResultMode"
                  class="form-check-input"
                  type="checkbox"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckDefault"
                >
                  Results
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
