<script setup lang="ts">
import { ref, watch } from "vue";
import { useCandidateStore } from "../../stores/candidates";
import { Candidate } from "../../dto/candidates";
import { categories } from "../../hooks/categories";
import { useRouter } from "vue-router";

const searchInput = ref<string>("");
const isCandidateMode = ref(false);
const isCategoryMode = ref(false);
const currentMode = ref("all");
const candidateStore = useCandidateStore();
const searchData = ref<Array<string | Candidate>>([]);
const inputValue = ref("");
const router = useRouter();
watch([searchInput, currentMode], async ([newInput, newCurrentMode]) => {
  if (newInput.length === 0) {
    return;
  }
  switch (newCurrentMode) {
    case "candidate":
      searchData.value = await candidateStore.getCandidatesByUsername(newInput);
      break;

    case "category":
      searchData.value = [
        ...categories.filter(category =>
          category.toLowerCase().includes(newInput.toLowerCase()),
        ),
      ];
      break;
    default:
      const resCandidate = await candidateStore.getCandidatesByUsername(
        newInput,
      );
      const searchedCategories: Array<string> = categories.filter(category =>
        category.toLowerCase().includes(newInput.toLowerCase()),
      );
      searchData.value = [...spreadDynamicly(resCandidate, searchedCategories)];
      break;
  }
});
function spreadDynamicly(
  candidates: Array<Candidate>,
  categories: Array<string>,
) {
  const dynamicArray: Array<string | Candidate> = [];
  let maxLength = 0;
  if (candidates.length > categories.length) {
    maxLength = candidates.length;
  } else {
    maxLength = categories.length;
  }
  for (let i = 0; i < maxLength; i++) {
    if (candidates[i]) {
      dynamicArray.push(candidates[i]);
    }
    if (categories[i]) {
      dynamicArray.push(categories[i]);
    }
  }
  return dynamicArray;
}
function redirectTo(dropdownObj) {
  if (dropdownObj.id) {
    inputValue.value = dropdownObj.username;
    router.push({ path: `/candidates/${dropdownObj.id}`, replace: true });
  } else {
    inputValue.value = dropdownObj;
    router.push({ path: `/questions/${dropdownObj}`, replace: true });
  }
}

const tempSwitch = ref("");

function handleSwitch(currentSwitch) {
  if (tempSwitch.value === currentSwitch) {
    tempSwitch.value = "";
    isCandidateMode.value = false;
    isCategoryMode.value = false;
    return (currentMode.value = "all");
  }

  if (currentSwitch === "category") {
    tempSwitch.value = "category";
    isCategoryMode.value = true;
    isCandidateMode.value = false;
    return (currentMode.value = "category");
  }

  if (currentSwitch === "candidate") {
    tempSwitch.value = "candidate";
    isCandidateMode.value = true;
    isCategoryMode.value = false;
    return (currentMode.value = "candidate");
  }
}
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
            :selected-item="inputValue"
            :dropdown-data="searchData"
            @set-dropdown-obj="redirectTo"
          />
          <!-- <input
            class="form-control text-secondary border-primary"
            type="search"
            placeholder="Search"
            aria-label="Search"
          /> -->
        </div>

        <div
          tabindex="1"
          class="dropdown d-flex col-md-1 align-items-center"
        >
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
                  id="flexSwitchCandidate"
                  v-model="isCandidateMode"
                  class="form-check-input"
                  type="checkbox"
                  @click="handleSwitch('candidate')"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCandidates"
                >
                  Candidates
                </label>
              </div>
            </li>
            <li>
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCategory"
                  v-model="isCategoryMode"
                  class="form-check-input"
                  type="checkbox"
                  @click="handleSwitch('category')"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCategory"
                >
                  Questions
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="col-2 ps-2 align-self-center">
        <button
          class="btn btn-outline-primary border-0 rounded-pill"
          type="submit"
        >
          <font-awesome-icon
            icon="btn fa-solid fa-magnifying-glass text-primary"
          />
        </button>
      </div> -->
    </div>
  </div>
</template>
