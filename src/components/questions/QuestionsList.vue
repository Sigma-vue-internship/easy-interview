<script setup>
import DeleteButton from "../common/DeleteButton.vue";
import QuestionForm from "./QuestionForm.vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/questions";
import { onMounted, ref } from "vue";

const currentQuestion = ref({});
const allQuestions = ref([]);
const modalInfo = ref({});
const route = useRoute();
const initQuestion = ref({
  text: "",
  point: 0,
  category: "HTML",
  answer: "",
});
function deleteQuestion() {
  console.log("delete button");
}
const questionStore = useQuestionStore();
onMounted(async () => {
  try {
    const { data } = await questionStore.getAllQuestions(route.params.title);
    allQuestions.value = [...data];
  } catch (e) {
    console.log(e);
  }
});
function setModalItem(item, formId, formTitle) {
  currentQuestion.value = { ...item };
  modalInfo.value = { formId, formTitle };
}
function updateItem(item) {
  const questionI = allQuestions.value.findIndex(
    (question) => question.id === item.id
  );
  if (questionI === -1) {
    allQuestions.value = [...allQuestions.value, item];
    return;
  }
  allQuestions.value[questionI] = { ...item };
}
</script>
<template>
  <div class="container mt-3 text-center">
    <div class="row mb-3 align-items-center">
      <div
        class="col-lg-2 mb-md-4 mb-lg-0 col-xl-2 col-xxl-2 text-center text-md-start text-primary"
      >
        <h2>Category</h2>
      </div>
      <div
        class="col-lg-2 my-xs-4 my-lg-0 ms-lg-5 ms-xl-4 ms-xxl-0 text-center text-md-start"
      >
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="setModalItem(initQuestion, 'addModal', 'Add new question')"
        >
          Add question
        </button>
      </div>
    </div>
    <ul class="list-unstyled">
      <li
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
        v-for="item in allQuestions"
        :key="item.id"
      >
        <h4 class="text-secondary mt-2">{{ item.text }}</h4>
        <p class="text-secondary">{{ item.answer }}</p>
        <div
          class="row justify-content-center text-primary text-md-end align-items-center"
        >
          <div class="col-12 col-sm-3 col-xl-8">
            <h5>Score: {{ item.point }}</h5>
          </div>
          <div class="col-6 col-sm-3 col-xl-1 me-xl-2">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="setModalItem(item, 'editModal', 'Edit question')"
            >
              Edit
            </button>
          </div>
          <div class="col-6 col-sm-3 col-xl-1">
            <DeleteButton @click="deleteQuestion" />
          </div>
        </div>
      </li>
    </ul>
  </div>
  <QuestionForm
    @submit="updateItem"
    :item="currentQuestion"
    :modalInfo="modalInfo"
  />
</template>
