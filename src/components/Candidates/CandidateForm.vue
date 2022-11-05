<script setup>
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import FormValidator from "../../service/FormValidator";

const candidateData = ref({
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
});
const errors = ref([]);
const validator = new FormValidator(candidateData, "candidate", errors);

const showErrorAlert = computed(() => {
  return validator.errors.value.length ? "show" : "";
});

async function addCandidate() {
  validator.validateForm();
  if (validator.errors.value.length) return;
  candidateData.value.id = uuidv4();
  // TODO:send candidateData to mockAPI, test api call
  resetForm();
}

function resetForm() {
  candidateData.value = {
    position: "",
    username: "",
    linkedinUrl: "",
    feedback: "",
    avatarUrl: "",
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
      Add candidate
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      @click.self="resetForm"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-primary">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Candidate form</h5>
            <button
              type="button"
              @click="resetForm"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-start">
            <label for="position" class="form-label">Position:</label>
            <input
              type="position"
              v-model="candidateData.position"
              id="position"
              placeholder="Junior front-end developer"
              class="form-control border-0 text-secondary"
            />
            <label for="username" class="form-label">Username:</label>
            <input
              type="username"
              v-model="candidateData.username"
              id="username"
              placeholder="tyler111"
              class="form-control border-0 text-secondary"
            />
            <label for="linkedin" class="form-label">Linkedin:</label>
            <input
              type="linkedin"
              v-model="candidateData.linkedinUrl"
              id="linkedin"
              placeholder="https://www.linkedin.com/"
              class="form-control border-0 text-secondary"
            />
            <label for="avatar" class="form-label">Avatar:</label>
            <input
              type="avatar"
              v-model="candidateData.avatarUrl"
              id="avatar"
              placeholder="https://myavatar"
              class="form-control border-0 text-secondary"
            />
            <div class="form-floating my-4">
              <textarea
                name="feedback"
                id="feedback"
                v-model="candidateData.feedback"
                style="height: 100px"
                class="form-control border-0 text-secondary"
                placeholder="Feedback:"
              ></textarea>
              <label for="feedback">Feedback:</label>
            </div>
          </div>
          <div class="modal-footer">
            <div
              class="col-12 alert alert-warning fade text-start"
              :class="showErrorAlert"
              style="height: 55px"
              role="alert"
            >
              {{ validator.errors.value[0] ? validator.errors.value[0] : "" }}
            </div>
            <button
              type="button"
              @click.self="resetForm"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              @click="addCandidate"
              class="btn btn-primary candidate__submit-btn"
            >
              Add candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
