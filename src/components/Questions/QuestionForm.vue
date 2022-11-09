<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { Field, Form } from "vee-validate";

const categories = ["Vue.js", "Native Java Script", "React"];

const questionData = ref({
  point: 0,
  text: "",
  answer: "",
  category: "HTML",
  id: 0,
});
const questionSchema = {
  point(value) {
    if (!value) {
      return "Point field is required";
    }
    if (value <= 0) {
      return "Point field has to be bigger than 0";
    }
    return true;
  },
  text(value) {
    if (!value) {
      return "Text field is required";
    }
    if (value.length <= 5) {
      return "Text has to be bigger than 5 chars";
    }
    return true;
  },
  category(value) {
    if (!value) {
      return "Category field is required";
    }
    return true;
  },
  answer(value) {
    if (!value) {
      return "Answer field is required";
    }
    if (value.length <= 5) {
      return "Answer has to be bigger than 5 chars";
    }
    return true;
  },
};

function onSubmit(values, { resetForm }) {
  console.log(values);
  questionData.value = { ...values };
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
        @click="this.$refs.form.resetForm"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </template>
    <template #body>
      <Form
        ref="form"
        class="needs-validation"
        @submit="onSubmit"
        :validation-schema="questionSchema"
        v-slot="{ errors }"
      >
        <label for="point" class="form-label">Max point:</label>
        <Field
          name="point"
          type="number"
          id="point"
          placeholder="1"
          class="form-control border-0 text-secondary"
          required
        />
        <label for="text" class="form-label">Text:</label>
        <Field
          name="text"
          type="text"
          id="text"
          placeholder="How to centre div ?"
          class="form-control border-0 text-secondary"
        />
        <label for="category" class="form-label">Category:</label>
        <Field
          v-model="questionData.category"
          as="select"
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
        </Field>
        <div class="form-floating my-4">
          <Field
            as="textarea"
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
          :class="{ show: Object.values(errors).length }"
          style="height: 55px"
          role="alert"
        >
          <!-- TODO:successAlert -->
          {{ Object.values(errors)[0] }}
        </div>
        <div class="pt-2 d-flex justify-content-end">
          <button
            type="button"
            @click.self="this.$refs.form.resetForm"
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
      </Form>
    </template>
  </EasyModal>
</template>
