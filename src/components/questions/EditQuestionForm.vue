<script setup lang="ts">
import useValidate from "../../utils/useValidate";
import { useQuestionStore } from "../../stores/questions";

import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const item = computed(() => props.item);

const questionStore = useQuestionStore();
const prevState = computed(() => {
  return questionStore.currentEditQuestion;
});

const rules = {
  point: { required, minValue: minValue(1), maxValue: maxValue(5) },
  text: { required, minLength: minLength(5), maxLength: maxLength(50) },
  category: { required },
  answer: { required, minLength: minLength(5), maxLength: maxLength(50) },
};
const { v$ } = useValidate(rules, prevState);
const categories = ["Vue.js", "Native Java Script", "React"];

const isFormValid = computed(async () => {
  return (await v$.value.$validate()) ? "modal" : "";
});

function resetForm() {
  v$.value.$reset();
}

async function sendData() {
  // const isFormCorrect = await v$.value.$validate();
  // if (!isFormCorrect) return;
  try {
    await questionStore.sendQuestion(props.item);
    // resetForm();
  } catch (e) {
    // resetForm();
    console.log(e);
  }
}
</script>
<template>
  <EasyModal>
    <template #header>
      <pre>{{item}}</pre>
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
          v-model="item.text"
          name="title"
          id="title"
          placeholder="How to centre div ?"
          class="form-control text-secondary"
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.text.$error">{{ v$.text.$errors[0].$message }}</span>
        </p>
        <label for="point" class="form-label">Max point:</label>
        <input
          v-model="item.point"
          name="point"
          type="number"
          id="point"
          placeholder="1"
          class="form-control text-secondary"
          required
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.point.$error">{{ v$.point.$errors[0].$message }}</span>
        </p>
        <label for="category" class="form-label">Category:</label>
        <select
          v-model="item.category"
          name="category"
          id="category"
          class="form-select text-secondary"
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
            v-model="item.answer"
            name="answer"
            id="answer"
            style="height: 100px"
            class="form-control text-secondary"
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
            type="submit"
            class="btn btn-primary question__submit-btn ms-2"
            :data-bs-dismiss="isFormValid"
            @click.self="sendData"
          >
            Submit
          </button>
        </div>
      </form>
    </template>
  </EasyModal>
</template>
