<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
import { IUser } from "../dto/user";
import { Notify } from "notiflix";

const router = useRouter();
const { singupUser } = useUsersStore();
const usernameValue = ref("");
const passwordValue = ref("");
const emailValue = ref("");

const newUser = ref<IUser>({
  username: "",
  password: "",
  email: "",
});

async function registration() {
  newUser.value.username = usernameValue.value;
  newUser.value.password = passwordValue.value;
  newUser.value.email = emailValue.value;
  try {
    await singupUser(newUser.value);
    Notify.success("You've successfuly signup", {
      distance: "65px",
    });
    router.push({
      name: "login",
    });
  } catch (e) {
    Notify.failure("Something went wrong. Please, try again.");
  }
}
</script>

<template>
  <div class="w-50 mx-auto mt-5">
    <h2 class="text-primary mb-4">Registration</h2>
    <form>
      <div class="mb-3">
        <label
          for="username"
          class="form-label"
          >Username</label
        >
        <input
          id="username"
          v-model="usernameValue"
          type="text"
          class="form-control"
          aria-describedby="usernameHelp"
        />
        <div
          id="usernameHelp"
          class="form-text"
        >
          Min 3 symbols required.
        </div>
      </div>
      <div class="mb-3">
        <label
          for="password"
          class="form-label"
          >Password</label
        >
        <input
          id="password"
          v-model="passwordValue"
          type="password"
          class="form-control"
        />
        <div
          id="passwordHelp"
          class="form-text"
        >
          Min 6 symbols required.
        </div>
      </div>
      <div class="mb-3">
        <label
          for="email"
          class="form-label"
          >Email address</label
        >
        <input
          id="email"
          v-model="emailValue"
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-outline-primary rounded-3 log-in col-md-2"
          @click="registration"
        >
          Sing In
        </button>
      </div>
    </form>
  </div>
</template>
