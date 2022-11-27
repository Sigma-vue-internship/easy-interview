<script setup lang="ts">
import { ref } from "vue";
import { useFormValidator } from "../../utils/useFormValidator";

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
  initCandidate,
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
        <h5
          id="exampleModalLabel"
          class="modal-title"
        >
          Candidate form
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetForm"
        ></button>
      </template>
      <template #body>
        <form @submit.prevent="onSubmit">
          <label
            for="position"
            class="form-label"
            >Position:</label
          >
          <input
            id="position"
            v-model="candidate.position"
            name="position"
            type="position"
            placeholder="Junior front-end developer"
            class="form-control text-dark"
          />
          <p
            style="height: 25px"
            class="pt-1 ps-1 text-danger mb-2"
          >
            <span v-if="v$.position.$error">{{
              v$.position.$errors[0].$message
            }}</span>
          </p>
          <label
            for="username"
            class="form-label"
            >Username:</label
          >
          <input
            id="username"
            v-model="candidate.username"
            name="username"
            type="username"
            placeholder="tyler111"
            class="form-control text-secondary"
          />
          <p
            style="height: 25px"
            class="pt-1 ps-1 text-danger mb-2"
          >
            <span v-if="v$.username.$error">{{
              v$.username.$errors[0].$message
            }}</span>
          </p>
          <label
            for="linkedin"
            class="form-label"
            >Linkedin:</label
          >
          <input
            id="linkedin"
            v-model="candidate.linkedinUrl"
            name="linkedin"
            type="linkedin"
            placeholder="https://www.linkedin.com/"
            class="form-control text-secondary mb-4"
          />
          <label
            for="avatar"
            class="form-label"
            >Avatar:</label
          >
          <input
            id="avatar"
            v-model="candidate.avatarUrl"
            name="avatar"
            type="avatar"
            placeholder="https://myavatar"
            class="form-control text-secondary"
          />
          <div class="form-floating my-4">
            <textarea
              id="feedback"
              v-model="candidate.feedback"
              name="feedback"
              style="height: 120px"
              class="form-control text-secondary"
              placeholder="Feedback:"
            />
            <label for="feedback">Feedback:</label>
            <p
              style="height: 25px"
              class="pt-1 ps-1 text-danger mb-2"
            >
              <span v-if="v$.feedback.$error">{{
                v$.feedback.$errors[0].$message
              }}</span>
            </p>
          </div>
          <div class="pt-2 d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click.self="resetForm"
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
