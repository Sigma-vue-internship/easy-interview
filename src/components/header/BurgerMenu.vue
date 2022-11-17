<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log();
</script>
<template>
  <div>
    <font-awesome-icon
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      class="btn btn-outline-primary text-primary fs-5"
      icon="fa-solid fa-bars"
    />
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header bg-dark text-primary">
        <h5 id="offcanvasRightLabel">Menu</h5>
        <button
          type="button"
          class="btn-close bg-primary"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body p-0 bg-dark">
        <ul class="list-group">
          <li class="list-group-item bg-dark text-primary">
            <router-link
              class="text-decoration-none"
              :class="{ 'text-white': route.path === '/' }"
              to="/"
              >Dashboard</router-link
            >
          </li>
          <li class="list-group-item bg-dark text-primary">
            <router-link
              class="text-decoration-none"
              :class="{ 'text-white': route.path === '/categories' }"
              to="/categories"
              >Questions</router-link
            >
          </li>

          <li class="list-group-item bg-dark text-primary">
            <router-link
              class="text-decoration-none"
              :class="{ 'text-white': route.path === '/candidates' }"
              to="/candidates"
              >Candidates</router-link
            >
          </li>

          <li class="list-group-item bg-dark text-primary">
            <router-link
              class="text-decoration-none"
              :class="{ 'text-white': route.path === '/results' }"
              to="/results"
              >Quiz results</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
