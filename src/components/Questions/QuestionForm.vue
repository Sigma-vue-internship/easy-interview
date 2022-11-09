<script setup>
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const categories = ["Vue.js", "Native Java Script", "React"];

const questionData = ref({
  point: 0,
  text: "",
  answer: "",
  category: "HTML",
  id: 0,
});
const rules = {
  point: { required, minValue: minValue(1), maxValue: maxValue(5) },
  text: { required, minLength: minLength(5), maxLength: maxLength(50) },
  category: { required },
  answer: { required, minLength: minLength(5), maxLength: maxLength(50) },
};

const formErrorMessage = computed(() => {
  if (v$.value.$errors.length && v$.value.$errors[0].$property) {
    return `${v$.value.$errors[0].$property}: ${v$.value.$errors[0].$message}`;
  }
  return "";
});

const v$ = useVuelidate(rules, questionData);

function resetForm() {
  questionData.value = {
    point: 0,
    text: "",
    answer: "",
    category: "HTML",
    id: 0,
  };
  v$.value.$errors = [];
}

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  questionData.value.id = uuidv4();
  console.log(questionData.value);
  // TODO:send candidateData to mockAPI, test api call
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
          class="form-control border-0 text-secondary"
          required
        />
        <label for="text" class="form-label">Text:</label>
        <input
          v-model="questionData.text"
          name="text"
          type="text"
          id="text"
          placeholder="How to centre div ?"
          class="form-control border-0 text-secondary"
        />
        <label for="category" class="form-label">Category:</label>
        <select
          v-model="questionData.category"
          name="category"
          id="category"
          class="form-select border-0 text-secondary"
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
        <div class="form-floating my-4">
          <textarea
            v-model="questionData.answer"
            name="answer"
            id="answer"
            style="height: 100px"
            class="form-control border-0 text-secondary"
            placeholder="Answer:"
          />
          <label for="answer">Answer:</label>
        </div>
        <div
          class="col-12 alert alert-warning fade text-start"
          :class="{ show: formErrorMessage }"
          style="height: 55px"
          role="alert"
        >
          <!-- TODO:successAlert -->
          {{ formErrorMessage }}
        </div>
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
