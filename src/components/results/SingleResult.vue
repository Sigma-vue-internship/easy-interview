<script setup lang="ts">
import {
  formattingDate,
  formattingHours,
  calculateTime,
} from "../../utils/dateFormatting";
import CategoryListItem from "./CategoryListItem.vue";
import _uniq from "lodash/uniq";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useResultsStore } from "../../stores/results";
import { Result, ResultParent } from "../../../dto/results";
import { getBarColor, defaultBarColor } from "../../utils/useChangeColor";

defineProps({
  resultParent: {
    type: Object as () => ResultParent,
    default: () => ({
      position: "",
      username: "",
      linkedinUrl: "",
      feedback: "",
      avatarUrl: "",
      id: "",
    }),
  },
  result: {
    type: Object as () => Result,
    default: () => ({
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
    }),
  },
});

const singleResult = ref<Result>({
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
async function getOneResultForCandidateData() {
  try {
    const { data } = await getOneResultForCandidate(
      route.params.candidateId,
      route.params.resultId,
    );
    singleResult.value = { ...data };
  } catch (e) {
    console.log(e);
  }
}
getOneResultForCandidateData();

const resultPercentage = computed(() =>
  (
    singleResult.value.questionAnswer.reduce(
      (summ, item) => summ + item.answerPoints,
      0,
    ) /
    singleResult.value.questionAnswer.reduce(
      (summ, item) => summ + item.point,
      0,
    )
  ).toLocaleString("en-GB", { style: "percent" }),
);

function answerPointsByCategory(category: string) {
  const filterAnswers = singleResult.value.questionAnswer.filter(
    answer => answer.category === category,
  );
  const summaryAnswerPoints = filterAnswers.reduce(
    (summ, item) => summ + item.answerPoints,
    0,
  );
  return summaryAnswerPoints;
}

function pointsByCategory(category: string) {
  const filterAnswers = singleResult.value.questionAnswer.filter(
    answer => answer.category === category,
  );
  const summaryQuestionPoints = filterAnswers.reduce(
    (summ, item) => summ + item.point,
    0,
  );
  return summaryQuestionPoints;
}

const categories = computed(() =>
  _uniq(singleResult.value.questionAnswer.map(obj => obj.category)),
);
</script>

<template>
  <div class="container mt-3 text-secondary">
    <div class="row">
      <div class="col-md-4 col-lg-3 col-xl-2 text-center text-md-start pt-4">
        <router-link :to="'/candidates/' + singleResult.parent.id">
          <img
            class="rounded-circle img-fluid p-2 border-primary border border-3"
            :src="singleResult.parent.avatarUrl"
            width="200"
            height="200"
            alt="candidateAvatar"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Go to candidate`s page"
          />
        </router-link>
      </div>
      <div class="col-md-8 col-lg-4 mt-3 mt-lg-2">
        <h2 class="text-primary text-center text-md-start">
          {{ singleResult.parent.username }}
        </h2>
        <div class="text-center text-md-start fs-4">
          <font-awesome-icon
            icon="fa-solid fa-user"
            class="text-primary"
          />
          {{ singleResult.parent.position }}
        </div>
        <div class="text-center text-md-start fs-4">
          <font-awesome-icon
            icon="fa-regular fa-clock"
            class="text-primary fs-4"
          />
          {{ calculateTime(singleResult.startedAt, singleResult.endedAt) }}
          minutes
        </div>
        <div class="text-center text-md-start fs-4">
          <font-awesome-icon
            icon="fa-solid fa-calendar-days"
            class="text-primary fs-5"
          />
          {{ formattingDate(singleResult.endedAt) }},
          {{ formattingHours(singleResult.endedAt) }}
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
          {{ singleResult.parent.feedback }}
        </h4>
      </div>
      <h4 class="text-center text-md-start ps-md-1 mt-4">Skills</h4>
      <div class="row">
        <radial-progress-bar
          v-for="category in categories"
          :key="category"
          class="col-3 mx-4 my-3"
          :completed-steps="answerPointsByCategory(category)"
          :total-steps="pointsByCategory(category)"
          :inner-stroke-color="defaultBarColor"
          :stroke-width="10"
          :inner-stroke-width="12"
          :diameter="140"
          :start-color="
            getBarColor(
              answerPointsByCategory(category),
              pointsByCategory(category),
            )
          "
          :stop-color="
            getBarColor(
              answerPointsByCategory(category),
              pointsByCategory(category),
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
              :questions-array="singleResult.questionAnswer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
