<template>
  <div class="p-5 row">
    <div class="bg-dark p-5 col-12 col-sm-9 col-md-6 col-xl-4 rounded mx-auto">
      <h2 class="text-center mb-5">Login</h2>
      <div class="d-flex flex-column mb-2 align-items-center">
        <label
          class="w-100 text-primary p-1"
          for="username"
          >Username</label
        >
        <input
          id="username"
          v-model="user.username"
          class="form-control text-secondary mb-3"
          type="username"
        />
        <label
          class="w-100 p-1 text-primary"
          for="username"
          >Password</label
        >
        <input
          id="password"
          v-model="user.password"
          class="form-control text-secondary mb-5"
          type="password"
        />
        <button
          class="btn mt-4 btn-primary w-100 w-md-50"
          @click="login"
        >
          Login
        </button>
        <router-link
          class="text-primary pt-4 text-decoration-none"
          to="/signup"
          >Sign Up</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify } from "notiflix";
import { ref } from "vue";
import { useUserStore } from "../../stores/users";
import { IUser } from "../../dto/user";
import { useRouter } from "vue-router";
import { useError } from "../../hooks/useError";

const user = ref<IUser>({
  username: "",
  password: "",
});
const userStore = useUserStore();
const router = useRouter();

async function login() {
  try {
    const res = await userStore.loginUser(user.value);
    userStore.isAuthenticated = true;
    console.log("Hello");

    Notify.success("You've successfuly login", {
      distance: "65px",
    });
    console.log("Now do smthg with res: ", res);
    localStorage.setItem("auth_token", res.data.token);
    router.push({ name: "dashboard" });
  } catch (e) {
    useError(e);
  }
}
</script>

<style scoped></style>
