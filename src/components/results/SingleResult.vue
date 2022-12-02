<script setup lang="ts">
import formattingDate from "../../utils/dateFormatting";
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
    (singleResult.value.questionAnswer.reduce(
      (summ, item) => summ + item.answerPoints,
      0,
    ) *
      100) /
    singleResult.value.questionAnswer.reduce(
      (summ, item) => summ + item.point,
      0,
    )
  ).toFixed(1),
);

const categories = computed(() =>
  _uniq(singleResult.value.questionAnswer.map(obj => obj.category)),
);
</script>

<template>
  <div class="container mt-3 text-secondary">
    <div class="row">
      <div class="col-2">
        <img
          class="rounded-circle img-fluid p-2 border-primary border border-3"
          :src="singleResult.parent.avatarUrl"
          width="180"
          height="180"
          alt="candidateAvatar"
        />
      </div>
      <div class="col-6">
        <h2 class="text-primary text-center text-md-start">
          {{ singleResult.title }}
        </h2>
        <div class="text-center text-md-start">
          <h3>{{ singleResult.parent.username }}</h3>
        </div>
        <div class="text-center text-md-start">
          <h3>{{ singleResult.parent.position }}</h3>
        </div>
        <div class="text-center text-md-start">
          <h4>Result: {{ resultPercentage }}%</h4>
        </div>
      </div>
    </div>
    <div class="col-12 mt-5">
      <CategoryListItem
        v-for="(category, index) in categories"
        :key="category"
        :item-id="index"
        :category="category"
        :questions-array="singleResult.questionAnswer"
      />
      <div class="col-12 text-center text-md-end mt-3">
        Start Date: {{ formattingDate(singleResult.startedAt) }}
      </div>
      <div class="col-12 text-center text-md-end">
        End Date: {{ formattingDate(singleResult.endedAt) }}
      </div>
    </div>
  </div>
</template>
