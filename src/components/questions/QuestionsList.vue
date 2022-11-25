<script setup>
import DeleteButton from "../common/DeleteButton.vue";
import QuestionForm from "./QuestionForm.vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/questions";
import { ref, onBeforeMount } from "vue";

const questionStore = useQuestionStore();
const questionInitValue = {
  question: {
    text: "",
    point: 0,
    category: "HTML",
    answer: "",
  },
  formType: "",
  formTitle: "",
};
const currentQuestion = ref({
  ...questionInitValue,
});
const questionsList = ref([]);
const route = useRoute();
const isShowModal = ref(false);
onBeforeMount(() => getQuestionList(false));

async function getQuestionList(showModal) {
  try {
    const { data } = await questionStore.getAllQuestions(route.params.title);
    questionsList.value = [...data];
    isShowModal.value = showModal;
  } catch (e) {
    console.log(e);
  }
}
function setModalItem(item, formType, formTitle) {
  currentQuestion.value = { question: { ...item }, formType, formTitle };
}
function closeModal() {
  currentQuestion.value = { ...questionInitValue };
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
          @click="setModalItem(currentQuestion.question, 'add', 'Add new question')"
        >
          Add question
        </button>
      </div>
    </div>
    <ul class="list-unstyled">
      <li
        v-for="item in questionsList"
        :key="item.id"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
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
              @click="setModalItem(item, 'edit', 'Edit question')"
            >
              Edit
            </button>
          </div>
          <div class="col-6 col-sm-3 col-xl-1">
            <DeleteButton />
          </div>
        </div>
      </li>
    </ul>
  </div>
  <EasyModal
    :title="currentQuestion.formTitle"
    :visible="isShowModal"
    @close-modal="closeModal"
  >
    <QuestionForm
      :single-question="currentQuestion.question"
      :form-type="currentQuestion.formType"
      @update-questions-list="getQuestionList"
    />
  </EasyModal>
</template>
