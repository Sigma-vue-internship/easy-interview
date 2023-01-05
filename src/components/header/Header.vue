<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import BurgerMenu from "./BurgerMenu.vue";
import SearchComponent from "./SearchComponent.vue";
const auth0 = useAuth0();

const isUserAuthenticated = auth0.isAuthenticated;

function login() {
  auth0.loginWithRedirect();
}

// function logoutUser() {
//   auth0.logout({ returnTo: window.location.origin });
// }
// TODO: after deploy, switch urls
function logoutUser() {
  auth0.logout({
    returnTo:
      "https://dev-epuimnxm.us.auth0.com/v2/logout?returnTo=https://easy-interview.netlify.app/hero",
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  });
}
</script>
<template>
  <header>
    <nav class="navbar navbar-light bg-light d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-between align-items-center w-100 gx-0">
          <router-link
            class="col-8 col-sm-4 col-md-3"
            to="/dashboard"
          >
            <img
              src="../icons/easylogo.svg"
              alt="logo"
              height="30"
              class=""
            />
          </router-link>
          <div
            class="d-none d-md-flex col-md-8 row gx-5 gx-lg-0 justify-content-end align-items-center justify-content-md-around"
          >
            <SearchComponent class="d-none d-md-block col-12 col-md-9" />
            <button
              v-if="!isUserAuthenticated"
              class="btn btn-outline-primary rounded-3 log-in col-md-2 d-none d-md-block"
              @click="login"
            >
              Log in
            </button>
            <button
              v-else
              class="btn btn-outline-primary rounded-3 log-out col-md-3 col-lg-2 d-none d-md-block"
              @click="logoutUser"
            >
              Logout
            </button>
          </div>
          <BurgerMenu
            class="d-block col-3 col-sm-1 justify-content-end text-end col-md-1 my-auto"
          />
        </div>
      </div>
    </nav>
  </header>
</template>
