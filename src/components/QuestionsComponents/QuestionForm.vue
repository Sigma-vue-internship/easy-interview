<script setup>
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import FormValidator from "../../service/FormValidator";

const categories = ["Vue.js", "Native Java Script", "React"];
const errors = ref([]);

const questionData = ref({
  point: 0,
  text: "",
  answer: "",
  category: "HTML",
  id: 0,
});
const validator = new FormValidator(questionData, "question", errors);

const showErrorAlert = computed(() => {
  return validator.errors.value.length ? "show" : "";
});

async function addQuestion() {
  validator.validateForm();

  if (validator.errors.value.length) return;
  questionData.value.id = uuidv4();
  console.log(questionData);
  resetForm();
}

function resetForm() {
  questionData.value = {
    point: 0,
    text: "",
    answer: "",
    category: "HTML",
    id: 0,
  };
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
      @click.self="resetForm"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="question__modal-container modal-dialog">
        <div class="modal-content bg-dark text-primary">
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
                class="form-control border-0 text-secondary"
                required
              />
              <label for="text" class="form-label">Text:</label>
              <input
                type="text"
                v-model.trim="questionData.text"
                id="text"
                placeholder="How to centre div ?"
                class="form-control border-0 text-secondary"
              />
              <label for="category" class="form-label">Category:</label>
              <select
                id="category"
                v-model="questionData.category"
                class="form-select border-0 text-secondary"
              >
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
                  class="form-control border-0 text-secondary"
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
                  {{
                    validator.errors.value[0] ? validator.errors.value[0] : ""
                  }}
                </div>
                <!-- TODO:successAlert -->
                <div>
                  <button
                    @click="resetForm"
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
