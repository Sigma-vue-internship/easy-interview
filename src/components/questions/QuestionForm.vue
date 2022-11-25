<script setup lang="ts">
import { useQuestionStore } from "../../stores/questions";
import { Question } from "../../../dto/questions";
import { computed, onUpdated, reactive, ref, toRef, toRefs } from "vue";
import { useFormValidator } from "../../utils/useFormValidator";
import Categories from "../../utils/useCategories";

const props = defineProps({
  singleQuestion: {
    type: Object as () => Question,
    required: true,
  },
  formType: {
    type: String,
    required: false,
    default() {
      return {
        formType: "edit",
      };
    },
  },
});
const emit = defineEmits(["updateQuestionsList"]);
const question = toRef(props, "singleQuestion");
onUpdated(() => {
  console.log({ ...question.value });
});
const questionStore = useQuestionStore();
const { v$, resetForm, showModal } = useFormValidator(question, "question");
async function sendData() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    // showModal.value = false;
    return;
  }
  try {
    if (props.formType === "edit") {
      await questionStore.sendQuestion({ ...question.value });
      emit("updateQuestionsList", showModal.value);
      resetForm();
      return;
    }
    await questionStore.postQuestion({ ...question.value });
    emit("updateQuestionsList", showModal.value);
    resetForm();
  } catch (e) {
    resetForm();
    console.log(e);
  }
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
        v-for="category in Categories()"
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
        @click.self="sendData"
      >
        Submit
      </button>
    </div>
  </form>
</template>
<!-- :data-bs-dismiss="showModal ? '' : 'modal'" -->
