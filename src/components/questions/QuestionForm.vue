<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import useValidate from "../service/useValidate";
import { useQuestionStore } from "../../stores/questions";

const categories = ["Vue.js", "Native Java Script", "React"];

const initState = {
  point: 0,
  text: "",
  answer: "",
  category: "HTML",
  id: 0,
};

const questionData = ref({ ...initState });
const rules = {
  point: { required, minValue: minValue(1), maxValue: maxValue(5) },
  text: { required, minLength: minLength(5), maxLength: maxLength(50) },
  category: { required },
  answer: { required, minLength: minLength(5), maxLength: maxLength(50) },
};
const { v$ } = useValidate(rules, questionData);

function resetForm() {
  questionData.value = { ...initState };
  v$.value.$reset();
}

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  questionData.value.id = uuidv4();
  try {
    const store = useQuestionStore();
    store.postQuestion(questionData.value);
  } catch (e) {
    console.log(e);
  }
  resetForm();
}
</script>
<template>
  <EasyModal>
    <template #open-btn>Add question</template>
    <template #header>
      <h5 class="modal-title" id="exampleModalLabel">Question form</h5>
      <button
        type="button"
        @click="resetForm"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </template>
    <template #body>
      <form class="needs-validation" @submit.prevent="onSubmit">
        <label for="point" class="form-label">Max point:</label>
        <input
          v-model="questionData.point"
          name="point"
          type="number"
          id="point"
          placeholder="1"
          class="form-control"
          required
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.point.$error">{{ v$.point.$errors[0].$message }}</span>
        </p>
        <label for="text" class="form-label">Text:</label>
        <input
          v-model="questionData.text"
          name="text"
          type="text"
          id="text"
          placeholder="How to centre div ?"
          class="form-control"
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.text.$error">{{ v$.text.$errors[0].$message }}</span>
        </p>
        <label for="category" class="form-label">Category:</label>
        <select
          v-model="questionData.category"
          name="category"
          id="category"
          class="form-select"
        >
          <option selected value="HTML">HTML</option>
          <option
            v-for="category in categories"
            class="category__option"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.category.$error">{{
            v$.category.$errors[0].$message
          }}</span>
        </p>
        <div class="form-floating my-4">
          <textarea
            v-model="questionData.answer"
            name="answer"
            id="answer"
            style="height: 100px"
            class="form-control"
            placeholder="Answer:"
          />
          <label for="answer">Answer:</label>
        </div>
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.answer.$error">{{
            v$.answer.$errors[0].$message
          }}</span>
        </p>
        <div class="pt-2 d-flex justify-content-end">
          <button
            type="button"
            @click.self="resetForm"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            class="btn btn-primary question__submit-btn ms-2"
          >
            Add question
          </button>
        </div>
      </form>
    </template>
  </EasyModal>
</template>
