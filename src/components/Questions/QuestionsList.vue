<script setup>
import EditButton from "../common/EditButton.vue";
import DeleteButton from "../common/DeleteButton.vue";

let questionsList = [
  {
    point: 99,
    text: "text 1",
    answer: "answer 1",
    category: "1",
    id: "1",
  },
  {
    point: 15,
    text: "text 2",
    answer: "answer 2",
    category: "2",
    id: "2",
  },
  {
    point: 70,
    text: "text 3",
    answer: "answer 3",
    category: "3",
    id: "3",
  },
  {
    point: 5,
    text: "text 4",
    answer: "answer 4",
    category: "4",
    id: "4",
  },
  {
    point: 77,
    text: "text 6",
    answer: "answer 6",
    category: "6",
    id: "6",
  },
  {
    point: 32,
    text: "text 7",
    answer: "answer 7",
    category: "7",
    id: "7",
  },
  {
    point: 84,
    text: "text 8",
    answer: "answer 8",
    category: "8",
    id: "8",
  },
  {
    point: 69,
    text: "text 9",
    answer: "answer 9",
    category: "9",
    id: "9",
  },
  {
    point: 11,
    text: "text 10",
    answer: "answer 10",
    category: "10",
    id: "10",
  },
  {
    point: 12,
    text: "text 11",
    answer: "answer 11",
    category: "11",
    id: "11",
  },
  {
    point: 78,
    text: "text 12",
    answer: "answer 12",
    category: "12",
    id: "12",
  },
  {
    point: 19,
    text: "text 13",
    answer: "answer 13",
    category: "13",
    id: "13",
  },
];

function editQuestion() {
  console.log("edit button");
}

function deleteQuestion() {
  console.log("delete button");
}
</script>

<template>
  <div class="container mt-3 text-center">
    <h2 class="text-primary">Category</h2>
    <ul class="list-unstyled">
      <li
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow-sm"
        v-for="item in questionsList"
        :key="item.id"
      >
        <h4 class="text-secondary mt-2">{{ item.text }}</h4>
        <p class="text-secondary">{{ item.answer }}</p>
        <div class="row text-primary">
          <div class="col-12 col-sm-6 col-xl-8">
            <h5>Score: {{ item.point }}</h5>
          </div>
          <div class="col-6 col-sm-3 col-xl-1 me-xl-2">
            <EditButton @click="editQuestion" />
          </div>
          <div class="col-6 col-sm-3 col-xl-1">
            <DeleteButton @click="deleteQuestion" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
