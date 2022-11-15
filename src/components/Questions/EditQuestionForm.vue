<script setup>
import { onMounted, ref } from "vue";
import useValidate from "../service/useValidate";
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
const prevState = ref({});

const initState = {
  point: 0,
  title: "",
  answer: "",
  category: "HTML",
  id: 0,
};

const categories = ["Vue.js", "Native Java Script", "React"];

const rules = {
  point: { required, minValue: minValue(1), maxValue: maxValue(5) },
  title: { required, minLength: minLength(5), maxLength: maxLength(50) },
  category: { required },
  answer: { required, minLength: minLength(5), maxLength: maxLength(50) },
};
onMounted(() => {
  prevState.value = {
    point: 3,
    title: "avcxvxc",
    answer: "xcvvbn",
    category: "HTML",
    id: 0,
  };
});

const { v$ } = useValidate(rules, prevState);

function resetForm() {
  prevState.value = { ...initState };
  v$.value.$reset();
}

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  console.log(prevState.value);
  resetForm();
}
</script>
<template>
  <EasyModal>
    <template #open-btn>Edit question</template>
    <template #header>
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
      <form class="needs-validation" @submit.prevent="onSubmit">
        <label for="title" class="form-label">Title:</label>
        <textarea
          v-model="prevState.title"
          name="title"
          type="text"
          id="title"
          placeholder="How to centre div ?"
          class="form-control border-0 text-secondary"
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.title.$error">{{ v$.title.$errors[0].$message }}</span>
        </p>
        <label for="point" class="form-label">Max point:</label>
        <input
          v-model="prevState.point"
          name="point"
          type="number"
          id="point"
          placeholder="1"
          class="form-control border-0 text-secondary"
          required
        />
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.point.$error">{{ v$.point.$errors[0].$message }}</span>
        </p>
        <label for="category" class="form-label">Category:</label>
        <select
          v-model="prevState.category"
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
        <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
          <span v-if="v$.category.$error">{{
            v$.category.$errors[0].$message
          }}</span>
        </p>
        <div class="form-floating my-4">
          <textarea
            v-model="prevState.answer"
            name="answer"
            id="answer"
            style="height: 100px"
            class="form-control border-0 text-secondary"
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
            Edit question
          </button>
        </div>
      </form>
    </template>
  </EasyModal>
</template>
