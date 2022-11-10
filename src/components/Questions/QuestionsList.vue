<script setup>
import EditButton from "../common/EditButton.vue";
import DeleteButton from "../common/DeleteButton.vue";
import { useQuestionStore } from "../../stores/questions";
import { ref } from "vue";
import { useRoute } from "vue-router";

const questionsList = ref([]);
async function getQuestions() {
  const route = useRoute();
  const { getAllQuestions } = useQuestionStore();
  const { data } = await getAllQuestions(route.params.title);
  questionsList.value = [...data];
}

getQuestions();

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
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow"
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
