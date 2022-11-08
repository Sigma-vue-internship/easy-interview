<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { v4 as uuidv4 } from "uuid";

const candidateData = ref({
  position: "",
  username: "",
  linkedinUrl: "",
  feedback: "",
  avatarUrl: "",
  id: 0,
});

const candidateSchema = {
  position(value) {
    if (!value) {
      return "Position field is required";
    }
    if (value.length <= 5) {
      return "Position has to be bigger than 5 chars";
    }
    return true;
  },
  username(value) {
    if (!value) {
      return "Username field is required";
    }
    if (value.length <= 5) {
      return "Username has to be bigger than 5 chars";
    }
    return true;
  },
  feedback(value) {
    if (value && value.length > 150) {
      return "Feedback max length 150 chars";
    }
    return true;
  },
};

function onSubmit(values, { resetForm }) {
  candidateData.value = { ...values };
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
          @click="this.$refs.form.resetForm"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </template>
      <template #body>
        <Form
          ref="form"
          @submit="onSubmit"
          :validation-schema="candidateSchema"
          v-slot="{ errors }"
        >
          <label for="position" class="form-label">Position:</label>
          <Field
            name="position"
            type="position"
            id="position"
            placeholder="Junior front-end developer"
            class="form-control border-0 text-secondary"
          />
          <label for="username" class="form-label">Username:</label>
          <Field
            name="username"
            type="username"
            id="username"
            placeholder="tyler111"
            class="form-control border-0 text-secondary"
          />
          <label for="linkedin" class="form-label">Linkedin:</label>
          <Field
            name="linkedin"
            type="linkedin"
            id="linkedin"
            placeholder="https://www.linkedin.com/"
            class="form-control border-0 text-secondary"
          />
          <label for="avatar" class="form-label">Avatar:</label>
          <Field
            name="avatar"
            type="avatar"
            id="avatar"
            placeholder="https://myavatar"
            class="form-control border-0 text-secondary"
          />
          <div class="form-floating my-4">
            <Field
              as="textarea"
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
            :class="{ show: Object.values(errors).length }"
            style="height: 55px"
            role="alert"
          >
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
              class="btn btn-primary candidate__submit-btn ms-2"
            >
              Add candidate
            </button>
          </div>
        </Form>
      </template>
    </EasyModal>
  </div>
</template>
