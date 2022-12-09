<script setup>
import QuestionForm from "./QuestionForm.vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../../stores/questions";
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
  <div class="container mt-3 text-center">
    <div class="row mb-3 align-items-center">
      <div class="d-flex justify-content-between">
        <div
          class="col-lg-2 mb-md-4 mb-lg-0 col-xl-2 col-xxl-2 text-center text-md-start text-primary"
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
          <div class="col-12 col-sm-3 col-lg-9 pt-2">
            <h5>Score: {{ item.point }}</h5>
          </div>
          <div class="col-6 col-sm-2 col-lg-1 me-xl-2">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#question"
              @click="setModalItem(item, 'put')"
            >
              Edit
            </button>
          </div>
          <div class="col-6 col-sm-2 col-lg-1 text-center">
            <font-awesome-icon
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#questionAlert"
              icon="fa-solid fa-square-xmark"
              class="text-danger delete-question__btn pt-1"
              @click="setDeleteQuestion(item.id)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
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

<style scoped>
.delete-question__btn {
  height: 44px;
}
</style>
