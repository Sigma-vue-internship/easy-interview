<script setup lang="ts">
import { ref } from "vue";
import useFormValidator from "../../utils/useFormValidator";

const initCandidate = {
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
};
const candidate = ref({ ...initCandidate });

const { v$, resetForm, showModal } = useFormValidator(
  candidate,
  "candidate",
  initCandidate
);

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  console.log(candidate.value);
  // TODO:send candidateData to mockAPI, test api call
  resetForm();
}
</script>
<template>
  <div>
    <EasyModal>
      <template #open-btn>Add candidate</template>
      <template #header>
        <h5 class="modal-title" id="exampleModalLabel">Candidate form</h5>
        <button
          type="button"
          @click="resetForm"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </template>
      <template #body>
        <form @submit.prevent="onSubmit">
          <label for="position" class="form-label">Position:</label>
          <input
            v-model="candidate.position"
            name="position"
            type="position"
            id="position"
            placeholder="Junior front-end developer"
            class="form-control text-dark"
          />
          <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
            <span v-if="v$.position.$error">{{
              v$.position.$errors[0].$message
            }}</span>
          </p>
          <label for="username" class="form-label">Username:</label>
          <input
            v-model="candidate.username"
            name="username"
            type="username"
            id="username"
            placeholder="tyler111"
            class="form-control text-secondary"
          />
          <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
            <span v-if="v$.username.$error">{{
              v$.username.$errors[0].$message
            }}</span>
          </p>
          <label for="linkedin" class="form-label">Linkedin:</label>
          <input
            v-model="candidate.linkedinUrl"
            name="linkedin"
            type="linkedin"
            id="linkedin"
            placeholder="https://www.linkedin.com/"
            class="form-control text-secondary mb-4"
          />
          <label for="avatar" class="form-label">Avatar:</label>
          <input
            v-model="candidate.avatarUrl"
            name="avatar"
            type="avatar"
            id="avatar"
            placeholder="https://myavatar"
            class="form-control text-secondary"
          />
          <div class="form-floating my-4">
            <textarea
              v-model="candidate.feedback"
              name="feedback"
              id="feedback"
              style="height: 120px"
              class="form-control text-secondary"
              placeholder="Feedback:"
            />
            <label for="feedback">Feedback:</label>
            <p style="height: 25px" class="pt-1 ps-1 text-danger mb-2">
              <span v-if="v$.feedback.$error">{{
                v$.feedback.$errors[0].$message
              }}</span>
            </p>
          </div>
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
              class="btn btn-primary candidate__submit-btn ms-2"
              :data-bs-dismiss="showModal ? '' : 'modal'"
            >
              Add candidate
            </button>
          </div>
        </form>
      </template>
    </EasyModal>
  </div>
</template>
