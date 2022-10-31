<script setup>
import { reactive } from "vue";
import { v4 as uuidv4 } from "uuid";

const candidateData = reactive({
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
});
async function addCandidate() {
  candidateData.id = uuidv4();
  console.log(candidateData);
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
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Candidate form</h5>
            <button
              type="button"
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
              class="form-control"
            />
            <label for="username" class="form-label">Username:</label>
            <input
              type="username"
              v-model="candidateData.username"
              id="username"
              placeholder="tyler111"
              class="form-control"
            />
            <label for="linkedin" class="form-label">Linkedin:</label>
            <input
              type="linkedin"
              v-model="candidateData.linkedinUrl"
              id="linkedin"
              placeholder="https://www.linkedin.com/"
              class="form-control"
            />
            <label for="avatar" class="form-label">Avatar:</label>
            <input
              type="avatar"
              v-model="candidateData.avatarUrl"
              id="avatar"
              placeholder="https://myavatar"
              class="form-control"
            />
            <div class="form-floating my-4">
              <textarea
                name="feedback"
                id="feedback"
                v-model="candidateData.feedback"
                style="height: 100px"
                class="form-control"
                placeholder="Feedback:"
              ></textarea>
              <label for="feedback">Feedback:</label>
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
            <button @click="addCandidate" class="btn btn-primary">
              Add candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
