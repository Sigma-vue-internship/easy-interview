<template>
  <div class="d-flex container flex-column justify-content-center text-primary">
    <font-awesome-icon
      class="pt-4"
      icon="fa-regular fa-face-frown"
      size="4x"
    />
    <h3 class="my-4 ms-1 text-primary text-center">#404 Not found</h3>
    <div class="d-flex justify-content-center">
      <button class="ms-1 btn btn-primary">
        <router-link
          class="text-decoration-none text-black"
          to="/"
          >Dashboard</router-link
        >
      </button>
    </div>
  </div>
</template>
