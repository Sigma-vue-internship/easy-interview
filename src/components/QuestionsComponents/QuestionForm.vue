<script setup>
import { reactive } from "vue";
import { v4 as uuidv4 } from "uuid";

const categories = ["Vue.js", "Native Java Script", "React"];

const questionData = reactive({
  point: 0,
  text: "",
  answer: "",
  category: "HTML",
  id: 0,
});
async function addQuestion() {
  questionData.id = uuidv4();
  console.log(questionData);
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
      <div class="modal-dialog">
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
            <label for="point" class="form-label">Max point:</label>
            <input
              type="number"
              v-model="questionData.point"
              id="point"
              placeholder="2"
              class="form-control"
            />
            <label for="text" class="form-label">Text:</label>
            <input
              type="text"
              v-model="questionData.text"
              id="text"
              placeholder="How to centre div ?"
              class="form-control"
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
                v-model="questionData.answer"
                style="height: 100px"
                class="form-control"
                placeholder="Answer:"
              ></textarea>
              <label for="answer">Answer:</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="addQuestion"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              Add question
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
