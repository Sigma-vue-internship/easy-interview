<script setup>
import formattingDate from "../../utils/dateFormatting";
// import ListItem from "./ListItem.vue";
import CategoryListItem from "./CategoryListItem.vue";
// import { computed } from "vue";
import _uniq from "lodash/uniq";

let result = {
  questionAnswer: [
    {
      question: "question1",
      questionScore: 1,
      answerPoints: 1,
      category: "category 1",
      answer: "answer 1",
    },
    {
      question: "question2",
      questionScore: 5,
      answerPoints: 3,
      category: "category 1",
      answer: "answer 2",
    },
    {
      question: "question3",
      questionScore: 1,
      answerPoints: 0,
      category: "category 1",
      answer: "answer 3",
    },
    {
      question: "question4",
      questionScore: 5,
      answerPoints: 4,
      category: "category 4",
      answer: "answer 4",
    },
    {
      question: "question5",
      questionScore: 5,
      answerPoints: 0,
      category: "category 5",
      answer: "answer 5",
    },
    {
      question: "question6",
      questionScore: 1,
      answerPoints: 1,
      category: "category 6",
      answer: "answer 6",
    },
    {
      question: "question7",
      questionScore: 5,
      answerPoints: 2,
      category: "category 7",
      answer: "answer 7",
    },
  ],
  startedAt: 1668092016,
  endedAt: 1668092016,
  title: "title 1",
  id: "1",
  candidateId: "1",
  parent: {
    position: "position 1",
    username: "username 1",
    linkedinUrl: "linkedinUrl 1",
    feedback: "feedback 1",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
    id: "1",
  },
};

const totalScore = result.questionAnswer.reduce(
  (summ, item) => summ + item.questionScore,
  0
);

const answerScore = result.questionAnswer.reduce(
  (summ, item) => summ + item.answerPoints,
  0
);

const categories = result.questionAnswer.map((obj) => obj.category);
</script>

<template>
  <div class="container mt-3 text-secondary">
    <h2 class="text-primary text-center text-md-start">{{ result.title }}</h2>
    <div class="row">
      <div class="col-12 text-center text-md-start">
        <h3>{{ result.parent.username }}</h3>
      </div>
      <div class="col-12 text-center text-md-start">
        <h3>{{ result.parent.position }}</h3>
      </div>
      <div class="col-12  text-center text-md-start">
        <h4>Result: {{ ((answerScore * 100) / totalScore).toFixed(1) }}%</h4>
      </div>
      <CategoryListItem
        v-for="category in _uniq(categories)"
        :key="category"
        :item="category"
        :array="result.questionAnswer"
      />

      <div class="col-12 text-center text-md-end mt-3">
        Start Date: {{ formattingDate(result.startedAt) }}
      </div>
      <div class="col-12 text-center text-md-end">
        End Date: {{ formattingDate(result.endedAt) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 15rem;
}
</style>
