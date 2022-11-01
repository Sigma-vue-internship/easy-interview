<script setup>
import { reactive, computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const categories = ["Vue.js", "Native Java Script", "React"];
const errors = ref([]);
const initialValue = {
  point: 0,
  text: "",
  answer: "",
  category: "HTML",
  id: 0,
};
const showErrorAlert = computed(() => {
  return errors.value.length ? "show" : "";
});
const questionData = reactive({ ...initialValue });

async function addQuestion() {
  validateQuestion();
  console.log(errors.value);
  if (errors.value.length) return;
  questionData.id = uuidv4();
  console.log(questionData);
  resetForm();
}

function validateQuestion() {
  errors.value.length = 0;
  switch (true) {
    case questionData.point <= 0:
      errors.value.push("Points have to be bigger than 0");
    case questionData.text.length <= 5:
      errors.value.push("Question text have to be bigger than 5 chars");
    case questionData.answer.length <= 5:
      errors.value.push("Question answer have to be bigger than 5 chars");
    default:
      return errors;
  }
}

function resetForm() {
  Object.assign(questionData, initialValue);
}
</script>
<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add question
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="question__modal-container modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Question form</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-start">
            <form class="needs-validation" @submit.prevent="addQuestion">
              <label for="point" class="form-label">Max point:</label>
              <input
                type="number"
                v-model.trim="questionData.point"
                id="point"
                placeholder="2"
                class="form-control"
                required
              />
              <label for="text" class="form-label">Text:</label>
              <input
                type="text"
                v-model.trim="questionData.text"
                id="text"
                placeholder="How to centre div ?"
                class="form-control"
                required
              />
              <label for="category" class="form-label">Category:</label>
              <select v-model="questionData.category" class="form-select">
                <option selected value="HTML">HTML</option>
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
              <div class="form-floating my-4">
                <textarea
                  name="answer"
                  id="answer"
                  v-model.trim="questionData.answer"
                  style="height: 100px"
                  class="form-control"
                  placeholder="Answer:"
                ></textarea>
                <label for="answer">Answer:</label>
              </div>
              <div class="modal-footer">
                <div
                  class="col-12 alert alert-warning fade"
                  :class="showErrorAlert"
                  style="height: 55px"
                  role="alert"
                >
                  {{ errors[0] ? errors[0] : "" }}
                </div>
                <div>
                  <button
                    type="button"
                    class="btn btn-secondary me-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button class="btn btn-primary">Add question</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
