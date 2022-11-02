<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import SearchComponent from "./SearchComponent.vue";
const auth0 = useAuth0();

const isUserAuthenticated = auth0.isAuthenticated;

function login() {
  auth0.loginWithRedirect();
}

function logoutUser() {
  auth0.logout({ returnTo: window.location.origin });
}
</script>
<template>
  <header>
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <img src="../icons/easylogo.svg" alt="logo" height="30" class="my-1" />
        <SearchComponent class="w-50 d-none d-lg-block ms-auto" />
        <button
          class="btn btn-outline-primary rounded-3"
          v-if="!isUserAuthenticated"
          @click="login"
        >
          Log in
        </button>
        <button
          class="btn btn-outline-secondary rounded-3"
          v-else
          @click="logoutUser"
        >
          Log out
        </button>
        <div
          class="col-12 mt-2 d-block d-lg-none d-flex justify-content-evenly"
        >
          <SearchComponent class="w-100" />
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss"></style>
