<script setup lang="ts">
import { useQuestionStore } from "../../stores/questions";
import { Question } from "../../dto/questions";
import { ref, watch } from "vue";
import { useFormValidator } from "../../hooks/useFormValidator";
import { categories } from "../../hooks/categories";
const questionInit = {
  text: "",
  point: 0,
  category: "HTML",
  answer: "",
};
interface Emit {
  (e: "updateQuestionsList"): void;
}
const question = ref({ ...questionInit });

const props = defineProps({
  singleQuestion: {
    type: Object as () => Question,
    required: false,
    default() {
      return {
        text: "",
        point: 0,
        category: "HTML",
        answer: "",
      };
    },
  },
  formType: {
    type: String,
    required: false,
    default() {
      return {
        formType: "put",
      };
    },
  },
});

const emit = defineEmits<Emit>();
watch(props, currentQuestion => {
  question.value = { ...currentQuestion.singleQuestion };
});

const questionStore = useQuestionStore();
const { v$, resetForm, showModal } = useFormValidator(question, "question");

async function sendData() {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) {
    return;
  }
  try {
    if (props.formType === "put") {
      await questionStore.sendQuestion({ ...question.value });
      emitUpdateQuestions();
      return;
    }
    await questionStore.postQuestion({ ...question.value });
    emitUpdateQuestions();
  } catch (e) {
    resetForm();
    console.log(e);
  }
}
function emitUpdateQuestions() {
  emit("updateQuestionsList");
  resetForm();
  question.value = { ...questionInit };
}
</script>
<template>
  <form @submit.prevent="sendData">
    <label
      for="text"
      class="form-label"
      >Title:</label
    >
    <textarea
      id="text"
      v-model="question.text"
      name="text"
      placeholder="How to centre div ?"
      class="form-control text-secondary"
    />
    <p
      style="height: 25px"
      class="pt-1 ps-1 text-danger mb-2"
    >
      <span v-if="v$.text.$error">{{ v$.text.$errors[0].$message }}</span>
    </p>
    <label
      for="point"
      class="form-label"
      >Max point:</label
    >
    <input
      id="point"
      v-model="question.point"
      name="point"
      type="number"
      placeholder="1"
      class="form-control text-secondary"
    />
    <p
      style="height: 25px"
      class="pt-1 ps-1 text-danger mb-2"
    >
      <span v-if="v$.point.$error">{{ v$.point.$errors[0].$message }}</span>
    </p>
    <label
      for="category"
      class="form-label"
      >Category:</label
    >

    <select
      id="category"
      v-model="question.category"
      name="category"
      class="form-select text-secondary"
    >
      <option
        v-for="category in categories"
        :key="category"
        class="category__option"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
    <p
      style="height: 25px"
      class="pt-1 ps-1 text-danger mb-2"
    >
      <span v-if="v$.category.$error">{{
        v$.category.$errors[0].$message
      }}</span>
    </p>
    <div class="form-floating my-4">
      <textarea
        id="answer"
        v-model="question.answer"
        name="answer"
        style="height: 100px"
        class="form-control text-secondary"
        placeholder="Answer:"
      />
      <label for="answer">Answer:</label>
    </div>
    <p
      style="height: 25px"
      class="pt-1 ps-1 text-danger mb-2"
    >
      <span v-if="v$.answer.$error">{{ v$.answer.$errors[0].$message }}</span>
    </p>
    <div class="pt-2 d-flex justify-content-end">
      <button
        type="submit"
        class="btn btn-primary question__submit-btn ms-2"
        :data-bs-dismiss="showModal ? 'modal' : ''"
      >
        Submit
      </button>
    </div>
  </form>
</template>
