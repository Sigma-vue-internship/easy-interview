<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuestionStore } from "../../stores/questions";
import Categories from "../../utils/useCategories";
import { onBeforeMount, ref } from "vue";
import { Question } from "../../../dto/questions";

defineProps({
  questionsList: {
    type: Array as () => Question[],
    default: () => [],
  },
});

const questionStore = useQuestionStore();
const route = useRoute();
const questionsList = ref<Question[]>([]);

onBeforeMount(() => getQuestionList());

async function getQuestionList() {
  try {
    const { data } = await questionStore.getAllQuestions();
    questionsList.value = [...data];
  } catch (e) {
    console.log(e);
  }
}

const router = useRouter();

function pushRoute(category: string) {
  router.push({
    name: "category",
    params: {
      title: category,
    },
  });
}

function questionsQuantity(category: string) {
  return questionsList.value.filter(question => question.category === category)
    .length;
}
</script>

<template>
  <div class="container mt-3 text-center">
    <div class="row mb-3 align-items-center">
      <div
        class="col-lg-2 mb-md-4 mb-lg-0 col-xl-2 col-xxl-2 text-center text-md-start text-primary pb-1"
      >
        <h2 class="text-center text-md-start mb-0 text-primary">Questions</h2>
      </div>
      <p class="text-center mb-2 text-md-start mb-md-0 text-secondary">
        <font-awesome-icon
          icon="fa-solid fa-circle-info"
          class="text-secondary fs-6"
        />
        Questions based on categories click below to category name for see list
        of questions
      </p>
      <div
        class="col-lg-2 my-xs-4 my-lg-0 ms-lg-5 ms-xl-4 ms-xxl-0 text-center text-md-start"
      ></div>
    </div>
    <ul class="list-unstyled mt-5">
      <li
        v-for="category in Categories()"
        :key="category"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow-sm"
        @click="pushRoute(category)"
      >
        <div class="row">
          <div class="col-9">
            <h5 class="text-secondary pt-2">
              {{ category }}
            </h5>
          </div>
          <div
            class="col-1 d-flex text-primary align-items-center justify-content-center rounded-5 badge bg-light"
          >
            <h4 class="m-0 pb-1 fs-5">
              {{ questionsQuantity(category) }}
            </h4>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
