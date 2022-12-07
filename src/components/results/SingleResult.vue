<script setup lang="ts">
import { formattingDate, formattingHours } from "../../utils/dateFormatting";
import CategoryListItem from "./CategoryListItem.vue";
import _uniq from "lodash/uniq";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useResultsStore } from "../../stores/results";
import { Result, ResultParent } from "../../../dto/results";

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

const categories = computed(() =>
  _uniq(singleResult.value.questionAnswer.map(obj => obj.category)),
);
</script>

<template>
  <div class="container mt-3 text-secondary">
    <div class="row">
      <div class="col-md-4 col-lg-2 text-center text-md-start">
        <img
          class="rounded-circle img-fluid p-2 border-primary border border-3"
          :src="singleResult.parent.avatarUrl"
          width="180"
          height="180"
          alt="candidateAvatar"
        />
      </div>
      <div class="col-md-8 col-lg-4 mt-3 mt-lg-2">
        <h2 class="text-primary text-center text-md-start">
          {{ singleResult.parent.username }}
        </h2>
        <div class="text-center text-md-start">
          <h3>{{ singleResult.parent.position }}</h3>
        </div>
        <div class="text-center text-md-start mb-3">
          <h4>Result: {{ resultPercentage }}</h4>
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
        <h4>Short summary: {{ singleResult.parent.feedback }}</h4>
      </div>
      <div class="col-12 text-center text-md-end mt-3">
        Start Date: {{ formattingDate(singleResult.startedAt) }},
        {{ formattingHours(singleResult.startedAt) }}
      </div>
      <div class="col-12 text-center text-md-end">
        End Date: {{ formattingDate(singleResult.endedAt) }},
        {{ formattingHours(singleResult.endedAt) }}
      </div>

      <p class="mt-5 text-center text-md-start">
        <button
          class="btn btn-outline-primary px-5 py-3 fs-5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#datailedResult"
          aria-expanded="false"
          aria-controls="datailedResult"
        >
          Detailed Result
        </button>
      </p>
      <div
        id="datailedResult"
        class="collapse"
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
</template>
