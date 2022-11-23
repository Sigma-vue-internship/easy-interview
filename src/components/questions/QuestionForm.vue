<script setup lang="ts">
import { useQuestionStore } from "../../stores/questions";
import { Question } from "../../../dto/questions";

import { toRef } from "vue";
import EasyModal from "../common/EasyModal.vue";
import useFormValidator from "../../utils/useFormValidator";

const props = defineProps({
  singleQuestion: {
    type: Object as () => Question,
    required: true,
  },
  modalInfo: {
    type: Object,
    required: false,
  },
});
const emit = defineEmits(["updateQuestionsList"]);
const question = toRef(props, "singleQuestion");
const questionStore = useQuestionStore();
const { v$, resetForm, showModal } = useFormValidator(question, "question");
const categories = ["HTML", "Vue.js", "Native Java Script", "React"];

async function sendData() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    showModal.value = true;
    return;
  }
  try {
    if (props.modalInfo.formId === "editModal") {
      await questionStore.sendQuestion(question.value);
      emit("updateQuestionsList", { ...question.value });
      resetForm();
      return;
    }
    console.log(question.value);
    await questionStore.postQuestion(question.value);
    emit("updateQuestionsList", { ...question.value });
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
      <h5 class="modal-title" id="edit_modal">
        {{ modalInfo.formTitle }}
      </h5>
      <button
        type="button"
        @click="resetForm"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      />
    </template>
    <template #body>
      <form @submit.prevent="sendData">
        <label for="text" class="form-label">Title:</label>
        <textarea
          v-model="question.text"
          name="text"
          id="text"
          placeholder="How to centre div ?"
          class="form-control text-secondary"
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.text.$error">{{ v$.text.$errors[0].$message }}</span>
        </p>
        <label for="point" class="form-label">Max point:</label>
        <input
          id="point"
          v-model="question.point"
          name="point"
          type="number"
          placeholder="1"
          class="form-control text-secondary"
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.point.$error">{{ v$.point.$errors[0].$message }}</span>
        </p>
        <label for="category" class="form-label">Category:</label>
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
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.category.$error">{{
            v$.category.$errors[0].$message
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
          <span v-if="v$.answer.$error">{{
            v$.answer.$errors[0].$message
          }}</span>
        </p>
        <div class="pt-2 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-primary question__submit-btn ms-2"
            :data-bs-dismiss="showModal ? '' : 'modal'"
            @click.self="sendData"
          >
            Submit
          </button>
        </div>
      </form>
    </template>
  </EasyModal>
</template>
