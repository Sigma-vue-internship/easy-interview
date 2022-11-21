<script setup lang="ts">
import DeleteButton from "../common/DeleteButton.vue";
import EditButton from "../common/EditButton.vue";
import _uniq from "lodash/uniq";
import { computed, onMounted, ref } from "vue";

const selectedCategory = ref();
let checked = ref([]);
onMounted(() => {
  selectedCategory.value = "Select category for displaying questions";
});

const categories = computed(() =>
  _uniq(questionList.map((item) => item.category))
);

const categoryQuestions = computed(() =>
  questionList.filter(
    (question) => question.category === selectedCategory.value
  )
);

let quizList = ref([]);

const questionList = [
  {
    point: 99,
    text: "text 1",
    answer: "answer 1",
    category: "HTML",
    id: "1",
  },
  {
    point: 15,
    text: "text 2",
    answer: "answer 2",
    category: "HTML",
    id: "2",
  },
  {
    point: 70,
    text: "text 3",
    answer: "answer 3",
    category: "CSS",
    id: "3",
  },
  {
    point: 5,
    text: "text 4",
    answer: "answer 4",
    category: "CSS",
    id: "4",
  },
  {
    point: 77,
    text: "text 6",
    answer: "answer 6",
    category: "Vue",
    id: "6",
  },
  {
    point: 32,
    text: "text 7",
    answer: "answer 7",
    category: "JavaScript",
    id: "7",
  },
];

function addQuestions() {
  const checkedArray = checked.value;
  quizList.value = [...quizList.value, ...checkedArray];
  checked.value = [];
}
</script>

<template>
  <div class="container mt-3 text-center">
    <h2 class="text-primary text-center text-md-start">Constructor</h2>
    <select
      v-model="selectedCategory"
      class="form-select form-select-sm mb-3"
      aria-label=".form-select-sm"
    >
      <option selected>Select category for displaying questions</option>
      <option 
        v-for="category in categories" 
        :key="category" 
        :value="category"
      >
        {{ category }}
      </option>
    </select>
    <ul class="list-unstyled">
      <li
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
        v-for="item in categoryQuestions"
        :key="item.id"
      >
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :value="item"
            :id="item.id"
            v-model="checked"
          />
          <label class="form-check-label ps-2" :for="item.id">
            <div class="col">{{ item.text }}</div>
            <div class="col">{{ item.answer }}</div>
            <div class="col">
              Question Score: {{ item.point }}
            </div>
          </label>
        </div>
      </li>
    </ul>

    <div class="text-center text-md-end pe-md-4 mt-md-4 mb-md-5">
      <EditButton
        @click="addQuestions"
      >
        Add
      </EditButton>
    </div>

    <h4 class="text-primary text-center text-md-start">Question List</h4>
    <ul class="list-unstyled">
      <li
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
        v-for="question in quizList"
        :key="question.id"
      >
        <div class="row">
          <div class="col-10">
            <div class="row ps-2">
              {{ question.text }}
            </div>
            <div class="row ps-2">
              Category: {{ question.category }}
            </div>
            <div class="row ps-2">
              Question Score: {{ question.point }}
            </div>
          </div>
          <div class="col-2 d-flex align-items-center gx-5">
            <DeleteButton />
          </div>
        </div>
      </li>
    </ul>
    <div class="text-center text-md-end mt-md-4">
      <EditButton>Save Quiz</EditButton>
    </div>
  </div>
</template>
