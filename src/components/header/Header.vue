<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import BrandIcon from "../icons/BrandIcon.vue";
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
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <BrandIcon class="brand_icon" />
        <button v-if="!isUserAuthenticated" @click="login">Log in</button>
        <button v-else @click="logoutUser">Log out</button>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
.brand_icon {
  width: 140px;
}
</style>
