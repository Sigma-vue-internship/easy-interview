<script setup>
import { ref } from "vue";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { v4 as uuidv4 } from "uuid";
import useValidate from "../service/useValidate";

const candidateData = ref({
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
});
const rules = {
  position: { required, minLength: minLength(5), maxLength: maxLength(50) },
  username: { required, minLength: minLength(5), maxLength: maxLength(50) },
  feedback: { required, minLength: minLength(5), maxLength: maxLength(150) },
};
const { formErrorMessage, v$ } = useValidate(rules, candidateData);

function resetForm() {
  candidateData.value = {
    position: "",
    username: "",
    linkedinUrl: "",
    feedback: "",
    avatarUrl: "",
    id: 0,
  };
  v$.value.$errors = [];
}

async function onSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  candidateData.value.id = uuidv4();
  console.log(candidateData.value);
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
            v-model="candidateData.position"
            name="position"
            type="position"
            id="position"
            placeholder="Junior front-end developer"
            class="form-control border-0 text-secondary"
          />
          <label for="username" class="form-label">Username:</label>
          <input
            v-model="candidateData.username"
            name="username"
            type="username"
            id="username"
            placeholder="tyler111"
            class="form-control border-0 text-secondary"
          />
          <label for="linkedin" class="form-label">Linkedin:</label>
          <input
            v-model="candidateData.linkedinUrl"
            name="linkedin"
            type="linkedin"
            id="linkedin"
            placeholder="https://www.linkedin.com/"
            class="form-control border-0 text-secondary"
          />
          <label for="avatar" class="form-label">Avatar:</label>
          <input
            v-model="candidateData.avatarUrl"
            name="avatar"
            type="avatar"
            id="avatar"
            placeholder="https://myavatar"
            class="form-control border-0 text-secondary"
          />
          <div class="form-floating my-4">
            <textarea
              v-model="candidateData.feedback"
              name="feedback"
              id="feedback"
              style="height: 120px"
              class="form-control border-0 text-secondary"
              placeholder="Feedback:"
            />
            <label for="feedback">Feedback:</label>
          </div>
          <div
            class="col-12 alert alert-warning fade text-start"
            :class="{ show: formErrorMessage }"
            style="height: 55px"
            role="alert"
          >
            {{ formErrorMessage }}
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
            >
              Add candidate
            </button>
          </div>
        </form>
      </template>
    </EasyModal>
  </div>
</template>
