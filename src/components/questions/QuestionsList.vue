<script setup>
import DeleteButton from "../common/DeleteButton.vue";
import EditQuestionForm from "./EditQuestionForm.vue";

import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/questions";
import { onMounted, ref } from "vue";

const questionsList = ref([]);
const route = useRoute();

function deleteQuestion() {
  console.log("delete button");
}
onMounted(async () => {
  try {
    const { getAllQuestions } = useQuestionStore();
    const { data } = await getAllQuestions(route.params.title);
    questionsList.value = [...data];
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div class="container mt-3 text-center">
    <h2 class="text-primary">Category</h2>
    <ul class="list-unstyled">
      <li
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
        v-for="item in questionsList"
        :key="item.id"
      >
        <h4 class="text-secondary mt-2">{{ item.text }}</h4>
        <p class="text-secondary">{{ item.answer }}</p>
        <div class="row justify-content-center text-primary text-sm-end">
          <div class="col-12 col-sm-6 col-xl-8">
            <h5>Score: {{ item.point }}</h5>
          </div>
          <div class="col-6 col-sm-3 col-xl-1 me-xl-2">
            <EditQuestionForm />
          </div>
          <div class="col-6 col-sm-3 col-xl-1">
            <DeleteButton @click="deleteQuestion" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
