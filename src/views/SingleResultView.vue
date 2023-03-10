<script setup lang="ts">
import {
  formattingDate,
  formattingHours,
  calculateTime,
} from "../utils/dateFormatting";
import CategoryListItem from "../components/results/CategoryListItem.vue";
import _uniq from "lodash/uniq";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useResultsStore } from "../stores/results";
import { useCandidateStore } from "../stores/candidates";
import { useQuestionStore } from "../stores/questions";
import { IResultAnswer, IResultDescription } from "../dto/results";
import { getBarColor, defaultBarColor } from "../utils/useChangeColor";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { getRouterParam } from "../service/routerParam";
import { ICandidate } from "../dto/candidates";
import { ICategory } from "../dto/ICategory";

const resultAnswers = ref<Array<IResultAnswer>>([]);
const resultDescription = ref<IResultDescription>({
  id: 0,
  title: "",
  started_at: "",
  ended_at: "",
  candidates_id: 0,
  createdAt: "",
  updatedAt: "",
});

const route = useRoute();
const { getOneResultForCandidate, getResultAnswersByResultId } =
  useResultsStore();
const { getCandidateById } = useCandidateStore();
const { getAllQuestionCategories } = useQuestionStore();
const initialCategories = ref<Array<ICategory>>([]);
const isLoaderVisible = ref(true);
const candidateInfo = ref<ICandidate>({
  id: 0,
  position: "",
  username: "",
  linkedin_url: "",
  feedback: "",
  avatar_url: "",
  users_id: 0,
  createdAt: "",
  updatedAt: "",
});

async function getOneResultForCandidateData() {
  try {
    isLoaderVisible.value = true;
    debugger;

    resultDescription.value = await getOneResultForCandidate(
      getRouterParam(route.params.candidateId),
      getRouterParam(route.params.resultId),
    );

    resultAnswers.value = await getResultAnswersByResultId(
      resultDescription.value.id,
    );
    resultAnswers.value.pop();
    console.log("RESULT VALUE: ", resultAnswers.value);
  } catch (e) {
    isLoaderVisible.value = false;
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
async function getCandidateInfo() {
  try {
    isLoaderVisible.value = true;

    candidateInfo.value = await getCandidateById(
      getRouterParam(route.params.candidateId),
    );

    isLoaderVisible.value = false;
  } catch (e) {
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
    isLoaderVisible.value = false;
  }
}
async function getInitialCategories() {
  try {
    isLoaderVisible.value = true;

    initialCategories.value = await getAllQuestionCategories();

    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;

    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}

getOneResultForCandidateData();
getCandidateInfo();
getInitialCategories();

const resultPercentage = computed(() => {
  debugger;
  if (resultAnswers.value.length) {
    const percent =
      resultAnswers.value.reduce(
        (summ, item) => summ + item.question_point,
        0,
      ) /
      resultAnswers.value.reduce(
        (summ, item) => summ + item.question.max_point,
        0,
      );
    console.log(percent);
    return percent.toLocaleString("en-GB", { style: "percent" });
  }
  return "0%";
});

// const categoriesUniqueIds = ref<Array<number>>([]);
const categoriesUniqueIds = computed(() =>
  _uniq(
    resultAnswers.value.map(answer => answer.question.question_categories_id),
  ),
);

// TODO: rebuild for category id
const categories = computed(() => {
  return initialCategories.value
    .filter(category => categoriesUniqueIds.value.includes(category.id))
    .map(category => category.title);
});
// Rebuild not to ids, but just get categories, and filter them

const categoriesWithPoints = computed(() =>
  // TODO: rebuild for category id
  Object.fromEntries(
    categories.value.map(category => [
      category,
      resultAnswers.value
        .filter(answer =>
          categoriesUniqueIds.value.includes(
            answer.question.question_categories_id,
          ),
        )
        .reduce((summ, item) => summ + item.question.max_point, 0),
    ]),
  ),
);

// TODO: rebuild for category id
const categoriesWithAnswerPoints = computed(() =>
  Object.fromEntries(
    categories.value.map(category => [
      category,
      resultAnswers.value
        .filter(answer =>
          categoriesUniqueIds.value.includes(
            answer.question.question_categories_id,
          ),
        )
        .reduce((summ, item) => summ + item.question_point, 0),
    ]),
  ),
);

function toggleAccordion() {
  const accordionSelection = document.querySelectorAll(".accordion .collapse");
  accordionSelection.forEach(function (section) {
    section.classList.toggle("show");
  });
}

function printPage() {
  window.print();
}
</script>

<template>
  <SpinnerLoader v-if="isLoaderVisible" />
  <div
    v-if="!isLoaderVisible"
    class="row"
  >
    <div
      class="col-md-4 col-lg-3 col-xxl-2 text-center text-md-start pt-4 avatar d-flex justify-content-center"
    >
      <router-link :to="'/candidates/' + resultDescription.candidates_id">
        <img
          v-if="candidateInfo?.avatar_url"
          class="rounded-circle img-fluid p-2 border-primary border border-3 fit"
          :src="candidateInfo.avatar_url"
          onerror="this.onerror=null; 
            this.src='../../../assets/not-found-img.3ed597be.svg'
          "
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Go to candidate`s page"
          alt="avatar"
        />
        <img
          v-else
          src="../../assets/not-found-img.svg"
          class="rounded-circle img-fluid p-2 border-primary border border-3 fit"
          alt="avatar"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Go to candidate`s page"
        />
      </router-link>
    </div>
    <div class="col-md-8 col-lg-4 mt-3 mt-lg-2">
      <h2 class="text-primary text-center text-md-start">
        {{ candidateInfo.username }}
      </h2>
      <div class="text-center text-md-start fs-4">
        <font-awesome-icon
          icon="fa-solid fa-user"
          class="text-primary"
        />
        {{ candidateInfo.position }}
      </div>
      <div class="text-center text-md-start fs-4">
        <font-awesome-icon
          icon="fa-regular fa-clock"
          class="text-primary fs-4"
        />
        {{
          calculateTime(
            new Date(resultDescription.started_at).getTime(),
            new Date(resultDescription.ended_at).getTime(),
          )
        }}
        minutes
      </div>
      <div class="text-center text-md-start fs-4">
        <font-awesome-icon
          icon="fa-solid fa-calendar-days"
          class="text-primary fs-5"
        />
        {{ new Date(resultDescription.ended_at).toLocaleString() }}
      </div>
      <div class="text-center text-md-start mb-3 fs-4">
        Result: {{ resultPercentage }}
      </div>
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-label="candidate score"
          :style="`width: ${resultPercentage}`"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  </div>
  <div class="col-12 mt-md-5">
    <div
      class="text-center text-md-start shadow border border-secondary p-3 rounded border-1 mt-3"
    >
      <h4 class="fw-light">
        <span class="fw-bolder">Short summary:</span>
        {{ candidateInfo.feedback }}
      </h4>
    </div>
    <h4 class="text-center text-md-start ps-md-1 mt-4">Skills</h4>
    <div class="row d-flex justify-content-center justify-content-md-start">
      <radial-progress-bar
        v-for="category in categories"
        :key="category"
        class="col-3 mx-4 my-3"
        :completed-steps="categoriesWithAnswerPoints[`${category}`]"
        :total-steps="categoriesWithPoints[`${category}`]"
        :inner-stroke-color="defaultBarColor"
        :stroke-width="10"
        :inner-stroke-width="12"
        :diameter="140"
        :start-color="
          getBarColor(
            categoriesWithAnswerPoints[`${category}`],
            categoriesWithPoints[`${category}`],
          )
        "
        :stop-color="
          getBarColor(
            categoriesWithAnswerPoints[`${category}`],
            categoriesWithPoints[`${category}`],
          )
        "
      >
        <span class="ps-4 text-center">{{ category }}</span>
      </radial-progress-bar>
    </div>
    <div class="mt-5 mb-2 text-end text-primary fs-5">
      <a
        role="button"
        @click="toggleAccordion"
        >Show All</a
      >
      |
      <a
        role="button"
        @click="printPage"
        >Print</a
      >
    </div>
    <div
      id="detailedByCategory"
      class="accordion accordion-flush"
    >
      <div class="accordion-item">
        <h2
          id="detaildResultInfo"
          class="accordion-header"
        >
          <button
            class="accordion-button collapsed text-primary fs-5 shadow border border-light rounded py-4 fs-5 text-md-start mb-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#detaildResult"
            aria-expanded="false"
            aria-controls="detaildResult"
          >
            Detailed Result
          </button>
        </h2>
        <div
          id="detaildResult"
          class="accordion-collapse collapse text-secondary"
          aria-labelledby="headingResult"
          data-bs-parent="#detailedByCategory"
        >
          <CategoryListItem
            v-for="categoryId in categoriesUniqueIds"
            :key="categoryId"
            :item-id="categoryId"
            :questions-array="resultAnswers"
            :category-id="categoryId"
            :category="
              initialCategories.find(category => category.id === categoryId)
                .title
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.avatar .fit {
  object-fit: cover;
  height: 200px;
  width: 200px;
}
</style>
