<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
import { IUser } from "../dto/user";
import { Notify } from "notiflix";

const router = useRouter();
const { loginUser } = useUsersStore();
const usernameValue = ref("");
const passwordValue = ref("");

const currentUser = ref<IUser>({
  username: "",
  password: "",
});

async function logging() {
  const usersStore = useUsersStore();
  currentUser.value.username = usernameValue.value;
  currentUser.value.password = passwordValue.value;
  try {
    const res = await loginUser(currentUser.value);
    usersStore.isAuthenticated = true;
    localStorage.setItem("token", res.data.token);
    router.push({
      name: "dashboard",
    });
  } catch (e) {
    Notify.failure("Login or password is invalid");
  }
}

function redirect() {
  router.push({
    name: "singIn",
  });
}
</script>

<template>
  <div class="w-50 mx-auto mt-5">
    <h2 class="text-primary mb-4">Login</h2>
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
      <div class="row mt-4 d-flex align-items-center">
        <div class="col-12 col-md-8">
          If you haven't account, please sing up
          <span
            class="text-primary fw-semibold"
            @click="redirect"
          >
            <a
              href="#"
              class="text-decoration-none"
              >here</a
            ></span
          >.
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-outline-primary rounded-3 log-in px-4"
            @click="logging"
          >
            Log in
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
