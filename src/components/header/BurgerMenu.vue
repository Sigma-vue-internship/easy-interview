<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
function setTextColor(routeName) {
  return route.name === routeName ? "text-primary" : "text-secondary";
}
</script>
<template>
  <div>
    <font-awesome-icon
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      class="btn btn-outline-primary fs-5"
      icon="fa-solid fa-bars"
    />
    <div
      id="offcanvasRight"
      class="offcanvas offcanvas-end"
      tabindex="-1"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header text-primary">
        <h5 id="offcanvasRightLabel">Menu</h5>
        <button
          type="button"
          class="btn-close bg-primary"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body p-0">
        <ul class="text-start list-group">
          <li
            data-bs-dismiss="offcanvas"
            class="list-group-item text-dark"
          >
            <router-link
              class="text-decoration-none"
              :class="setTextColor('dashboard')"
              to="/dashboard"
              >Dashboard</router-link
            >
          </li>
          <li
            data-bs-dismiss="offcanvas"
            class="list-group-item"
          >
            <router-link
              class="text-decoration-none"
              :class="setTextColor('categoriesList')"
              to="/questions"
              >Questions</router-link
            >
          </li>
          <li
            data-bs-dismiss="offcanvas"
            class="list-group-item text-primary"
          >
            <router-link
              class="text-decoration-none"
              :class="setTextColor('candidates')"
              to="/candidates"
              >Candidates</router-link
            >
          </li>
          <li
            data-bs-dismiss="offcanvas"
            class="list-group-item text-primary"
          >
            <router-link
              class="text-decoration-none"
              :class="setTextColor('quizResults')"
              to="/results"
              >Quiz results</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
