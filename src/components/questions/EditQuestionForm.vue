<script setup lang="ts">
// import useValidate from "../../utils/useValidate";
import useVuelidate from "@vuelidate/core";
import { useQuestionStore } from "../../stores/questions";

import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { computed, onMounted, onUpdated, ref, toRef, watch } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
// const question = toRef(props, "item");
const question = computed(() => props.item);
const questionStore = useQuestionStore();

const rules = {
  point: { required, minValue: minValue(1), maxValue: maxValue(5) },
  text: { required, minLength: minLength(5), maxLength: maxLength(50) },
  category: { required },
  answer: { required, minLength: minLength(5), maxLength: maxLength(50) },
};
const categories = ["HTML", "Vue.js", "Native Java Script", "React"];
const v$ = useVuelidate(rules, question);

function resetForm() {
  v$.value.$reset();
}

async function sendData() {
  const isFormCorrect = await v$.value.$validate();
  // console.log(v$.value.text.$error);
  if (!isFormCorrect) return;
  try {
    console.log(question.value);
    // { data: { answer, category, id, point, text } } =
    await questionStore.sendQuestion(question.value);
    resetForm();
  } catch (e) {
    resetForm();
    console.log(e);
  }
}
</script>
<template>
  <EasyModal>
    <template #header>
      <!-- <pre>{{ item }}</pre> -->
      <h5 class="modal-title" id="exampleModalLab el">Edit form</h5>
      <button
        type="button"
        @click="resetForm"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </template>
    <template #body>
      <form @submit.prevent="resetForm">
        <label for="title" class="form-label">Title:</label>
        <textarea
          v-model="question.text"
          name="title"
          id="title"
          placeholder="How to centre div ?"
          class="form-control text-secondary"
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.text.$silentErrors.length">{{
            v$.text.$silentErrors[0].$message
          }}</span>
        </p>
        <label for="point" class="form-label">Max point:</label>
        <input
          v-model="question.point"
          name="point"
          type="number"
          id="point"
          placeholder="1"
          class="form-control text-secondary"
          required
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.point.$silentErrors.length">{{
            v$.point.$silentErrors[0].$message
          }}</span>
        </p>
        <label for="category" class="form-label">Category:</label>
        <select
          v-model="question.category"
          name="category"
          id="category"
          class="form-select text-secondary"
        >
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
          <span v-if="v$.category.$silentErrors.length">{{
            v$.category.$silentErrors[0].$message
          }}</span>
        </p>
        <div class="form-floating my-4">
          <textarea
            v-model="question.answer"
            name="answer"
            id="answer"
            style="height: 100px"
            class="form-control text-secondary"
            placeholder="Answer:"
          />
          <label for="answer">Answer:</label>
        </div>
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.answer.$silentErrors.length">{{
            v$.answer.$silentErrors[0].$message
          }}</span>
        </p>
        <div class="pt-2 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-primary question__submit-btn ms-2"
            @click.self="sendData"
          >
            Submit
          </button>
        </div>
      </form>
    </template>
  </EasyModal>
</template>
