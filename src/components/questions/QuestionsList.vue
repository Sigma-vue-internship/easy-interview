<script setup>
import DeleteButton from "../common/DeleteButton.vue";
import QuestionForm from "./QuestionForm.vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/questions";
import { ref, onBeforeMount } from "vue";

const questionStore = useQuestionStore();
const currentQuestion = ref({});
const questionsList = ref([]);
const modalInfo = ref({});
const route = useRoute();
const initQuestion = ref({
  text: "",
  point: 0,
  category: "HTML",
  answer: "",
});

onBeforeMount(() => getQuestionList());

async function getQuestionList() {
  try {
    const { data } = await questionStore.getAllQuestions(route.params.title);
    questionsList.value = [...data];
  } catch (e) {
    console.log(e);
  }
}
function deleteQuestion() {
  console.log("delete button");
}
function setModalItem(item, formId, formTitle) {
  currentQuestion.value = { ...item };
  modalInfo.value = { formId, formTitle };
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
        v-for="item in questionsList"
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
    @updateQuestionsList="getQuestionList"
    :singleQuestion="currentQuestion"
    :modalInfo="modalInfo"
  />
</template>
