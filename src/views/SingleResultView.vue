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
import { Result } from "../../dto/results";
import { getBarColor, defaultBarColor } from "../utils/useChangeColor";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const result = ref<Result>({
  questionAnswer: [],
  startedAt: 0,
  endedAt: 0,
  id: "",
  title: "",
  parent: {
    position: "",
    username: "",
    linkedinUrl: "",
    feedback: "",
    avatarUrl: "",
    id: "",
  },
});

const route = useRoute();
const { getOneResultForCandidate } = useResultsStore();
const isLoaderVisible = ref(true);
const getRouterParam = (param: string | string[]): string =>
  Array.isArray(param) ? param[0] : param;

async function getOneResultForCandidateData() {
  try {
    isLoaderVisible.value = true;
    result.value = await getOneResultForCandidate(
      getRouterParam(route.params.candidateId),
      getRouterParam(route.params.resultId),
    );
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}

getOneResultForCandidateData();

const resultPercentage = computed(() =>
  (
    result.value.questionAnswer.reduce(
      (summ, item) => summ + item.answerPoints,
      0,
    ) / result.value.questionAnswer.reduce((summ, item) => summ + item.point, 0)
  ).toLocaleString("en-GB", { style: "percent" }),
);

const categories = computed(() =>
  _uniq(result.value.questionAnswer.map(obj => obj.category)),
);

const categoriesWithPoints = computed(() =>
  Object.fromEntries(
    categories.value.map(category => [
      category,
      result.value.questionAnswer
        .filter(answer => answer.category === category)
        .reduce((summ, item) => summ + item.point, 0),
    ]),
  ),
);

const categoriesWithAnswerPoints = computed(() =>
  Object.fromEntries(
    categories.value.map(category => [
      category,
      result.value.questionAnswer
        .filter(answer => answer.category === category)
        .reduce((summ, item) => summ + item.answerPoints, 0),
    ]),
  ),
);
</script>

<template>
  <SpinnerLoader v-if="isLoaderVisible" />
  <div
    v-if="!isLoaderVisible"
    class="row"
  >
    <div
      class="col-md-4 col-lg-3 col-xl-2 text-center text-md-start pt-4 avatar"
    >
      <router-link :to="'/candidates/' + result.parent.id">
        <img
          class="rounded-circle img-fluid p-2 border-primary border border-3 fit"
          :src="result.parent.avatarUrl"
          alt="candidateAvatar"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Go to candidate`s page"
        />
      </router-link>
    </div>
    <div class="col-md-8 col-lg-4 mt-3 mt-lg-2">
      <h2 class="text-primary text-center text-md-start">
        {{ result.parent.username }}
      </h2>
      <div class="text-center text-md-start fs-4">
        <font-awesome-icon
          icon="fa-solid fa-user"
          class="text-primary"
        />
        {{ result.parent.position }}
      </div>
      <div class="text-center text-md-start fs-4">
        <font-awesome-icon
          icon="fa-regular fa-clock"
          class="text-primary fs-4"
        />
        {{ calculateTime(result.startedAt, result.endedAt) }}
        minutes
      </div>
      <div class="text-center text-md-start fs-4">
        <font-awesome-icon
          icon="fa-solid fa-calendar-days"
          class="text-primary fs-5"
        />
        {{ formattingDate(result.endedAt) }},
        {{ formattingHours(result.endedAt) }}
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
        {{ result.parent.feedback }}
      </h4>
    </div>
    <h4 class="text-center text-md-start ps-md-1 mt-4">Skills</h4>
    <div class="row">
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
    <div
      id="detailedByCategory"
      class="accordion accordion-flush mt-5"
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
            v-for="(category, index) in categories"
            :key="category"
            :item-id="index"
            :category="category"
            :questions-array="result.questionAnswer"
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
