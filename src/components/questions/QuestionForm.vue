<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { useQuestionStore } from "../../stores/questions";
import { Question } from "../../../dto/questions";
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { ref, toRef, watch } from "vue";
const props = defineProps({
  item: {
    type: Object as () => Question,
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  showBtn: {
    type: Boolean,
    default: true,
    required: false,
  },
  btnText: {
    type: String,
    default: "Click",
    required: false,
  },
  formTitle: {
    type: String,
    default: "Form",
    required: false,
  },
});
const emit = defineEmits(["submit"]);
const question = toRef(props, "item");
const questionStore = useQuestionStore();
const showModal = ref(true);

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

watch(v$, async (newValidation) => {
  if (newValidation.$silentErrors.length) {
    showModal.value = true;
    return;
  }
  showModal.value = false;
});

async function sendData() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    showModal.value = true;
    return;
  }
  try {
    if (props.formId === "editModal") {
      await questionStore.sendQuestion(question.value);
      emit("submit", { ...question.value });
      return;
    }
    await questionStore.postQuestion(question.value);
    emit("submit", { ...question.value });
  } catch (e) {
    resetForm();
    console.log(e);
  }
}
</script>
<template>
  <button
    v-if="showBtn"
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    :data-bs-target="'#' + formId"
  >
    {{ props.btnText }}
  </button>
  <div
    class="modal fade"
    :id="formId"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="editModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content text-primary">
        <div class="modal-header">
          <h5 class="modal-title" id="edit_modal">{{ props.formTitle }}</h5>
          <button
            type="button"
            @click="resetForm"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-start">
          <form @submit.prevent="resetForm">
            <label for="text" class="form-label">Title:</label>
            <textarea
              v-model="question.text"
              name="text"
              id="text"
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
                v-if="formId === 'editModal'"
                :value="question.category"
                selected
              >
                {{ question.category }}
              </option>
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
                :data-bs-dismiss="showModal ? '' : 'modal'"
                @click.self="sendData"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
