<script setup>
import formattingDate from "../../utils/dateFormatting";
import ListItem from "./ListItem.vue";

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
      category: "category 2",
      answer: "answer 2",
    },
    {
      question: "question3",
      questionScore: 1,
      answerPoints: 0,
      category: "category 3",
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
</script>

<template>
  <div class="container mt-3 text-center text-secondary">
    <h2 class="text-primary">{{ result.title }}</h2>
    <div class="row">
      <div class="col-12">
        <h3>{{ result.parent.username }}</h3>
      </div>
      <div class="col-12">
        <h3>{{ result.parent.position }}</h3>
      </div>
      <div class="col-12 text-center text-md-end">
        Start Date: {{ formattingDate(result.startedAt) }}
      </div>
      <div class="col-12 text-center text-md-end">
        End Date: {{ formattingDate(result.endedAt) }}
      </div>
      <p>
        <button
          class="btn btn-outline-primary rounded-pill mt-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample1"
          aria-expanded="false"
          aria-controls="multiCollapseExample1"
        >
          Correct:
          {{
            result.questionAnswer.filter(
              (obj) => obj.questionScore === obj.answerPoints
            ).length
          }}
        </button>
      </p>
      <div class="collapse multi-collapse" id="multiCollapseExample1">
        <div class="card card-body bg-light">
          <ul class="list-unstyled">
            <ListItem
              class="answers-item"
              v-for="item in result.questionAnswer.filter(
                (item) => item.questionScore === item.answerPoints
              )"
              :key="item"
              :item="item"
            />
          </ul>
        </div>
      </div>

      <p>
        <button
          class="btn btn-outline-warning mt-4 rounded-pill"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2"
        >
          Partially:
          {{
            result.questionAnswer.filter(
              (obj) =>
                obj.answerPoints != 0 && obj.answerPoints < obj.questionScore
            ).length
          }}
        </button>
      </p>
      <div class="collapse multi-collapse" id="multiCollapseExample2">
        <div class="card card-body bg-light">
          <ul class="list-unstyled">
            <ListItem
              class="answers-item"
              v-for="item in result.questionAnswer.filter(
                (item) =>
                  item.answerPoints != 0 &&
                  item.answerPoints < item.questionScore
              )"
              :key="item"
              :item="item"
            />
          </ul>
        </div>
      </div>

      <p>
        <button
          class="btn btn-outline-danger mt-4 rounded-pill"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample3"
          aria-expanded="false"
          aria-controls="multiCollapseExample3"
        >
          Wrong:
          {{
            result.questionAnswer.filter((obj) => obj.answerPoints === 0).length
          }}
        </button>
      </p>
      <div class="collapse multi-collapse" id="multiCollapseExample3">
        <div class="card card-body bg-light">
          <ul class="list-unstyled">
            <ListItem
              class="answers-item"
              v-for="item in result.questionAnswer.filter(
                (item) => item.answerPoints === 0
              )"
              :key="item"
              :item="item"
            />
          </ul>
        </div>
      </div>

      <p>
        <button
          class="btn btn-outline-primary mt-4 rounded-pill"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample4"
          aria-expanded="false"
          aria-controls="multiCollapseExample4"
        >
          Total: {{ result.questionAnswer.length }}
        </button>
      </p>
      <div class="collapse multi-collapse" id="multiCollapseExample4">
        <div class="card card-body bg-light">
          <ul class="list-unstyled">
            <ListItem
              class="full-answers-list"
              v-for="item in result.questionAnswer"
              :key="item"
              :item="item"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 15rem;
}
</style>
