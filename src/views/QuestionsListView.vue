<script setup>
import QuestionForm from "../components/questions/QuestionForm.vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../stores/questions";
import { ref, computed } from "vue";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const questionStore = useQuestionStore();
const route = useRoute();

const currentQuestion = ref({});
const formType = ref("");
const formTitle = computed(() =>
  formType.value === "put" ? "Edit question" : "Add new question",
);

const questionsList = ref([]);

const isLoaderVisible = ref(true);
const deleteQuestionId = ref("");

async function getQuestionList() {
  try {
    isLoaderVisible.value = true;
    const { data } = await questionStore.getAllQuestions(route.params.title);
    questionsList.value = [...data];

    clearForm();
    isLoaderVisible.value = false;
  } catch (e) {
    isLoaderVisible.value = false;
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
async function deleteQuestion() {
  try {
    await questionStore.deleteQuestion(deleteQuestionId.value);
    questionsList.value = questionsList.value.filter(
      question => question.id !== deleteQuestionId.value,
    );
    Notify.success("Question successfully deleted", {
      distance: "65px",
      success: {
        background: "#87CF23",
      },
    });
  } catch (e) {
    console.log(e);
    Notify.failure("Something went wrong. Please, try again.", {
      distance: "65px",
    });
  }
}
function setModalItem(item, action) {
  formType.value = action;

  currentQuestion.value = { ...item };
}
function clearForm() {
  currentQuestion.value = {};
}
function setDeleteQuestion(id) {
  deleteQuestionId.value = id;
}

getQuestionList();
</script>
<template>
  <div class="row mb-3 align-items-center">
    <div class="d-flex justify-content-between">
      <div
        class="col-lg-6 mb-md-4 mb-lg-0 col-xl-5 col-xxl-4 col-md-47 text-center text-md-start text-primary"
      >
        <h2>{{ route.params.title }}</h2>
      </div>
      <div
        class="col-lg-2 my-xs-4 my-lg-0 ms-lg-5 ms-xl-4 ms-xxl-0 text-center text-md-end pt-1"
      >
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#question"
          @click="setModalItem(currentQuestion, 'post')"
        >
          Add question
        </button>
      </div>
    </div>
  </div>
  <SpinnerLoader v-if="isLoaderVisible" />
  <ul
    v-else
    class="list-unstyled"
  >
    <li
      v-for="item in questionsList"
      :key="item.id"
      class="border border-light mt-4 p-2 rounded-3 mx-auto shadow text-sm-start ps-sm-3"
    >
      <h4 class="text-secondary mt-2">{{ item.text }}</h4>
      <p class="text-secondary">{{ item.answer }}</p>
      <div
        class="row text-primary text-md-end align-items-center d-flex justify-content-end"
      >
        <div class="col-6 col-sm-3 col-lg-9 pt-2">
          <h4>Score: {{ item.point }}</h4>
        </div>
        <div
          class="col-6 col-md-2 me-xl-2 d-flex align-items-center justify-content-md-end ps-5 ps-md-0 pe-4 pe-md-0"
        >
          <font-awesome-icon
            type="button"
            class="btn text-primary fs-3 p-0 me-4"
            data-bs-toggle="modal"
            data-bs-target="#question"
            icon="fa-solid fa-pencil"
            @click="setModalItem(item, 'put')"
          />
          <font-awesome-icon
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#questionAlert"
            icon="fa-solid fa-trash-can"
            class="text-danger delete-question__btn fs-3 me-4"
            @click="setDeleteQuestion(item.id)"
          />
        </div>
      </div>
    </li>
  </ul>
  <EasyModal
    :title="formTitle"
    :modal-id="'question'"
    @close-modal="clearForm"
  >
    <QuestionForm
      :single-question="currentQuestion"
      :form-type="formType"
      @update-questions-list="getQuestionList"
    />
  </EasyModal>
  <EasyModal
    :title="'Delete question'"
    :modal-id="'questionAlert'"
    :modal-size="'modal-m'"
    @close-modal="clearForm"
  >
    <p>Are you sure you want to delete this question ?</p>
    <div class="d-flex justify-content-end">
      <button
        class="btn btn-danger text-align-end"
        data-bs-dismiss="modal"
        @click="deleteQuestion"
      >
        Delete
      </button>
    </div>
  </EasyModal>
</template>
