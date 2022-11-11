<template>
  <div class="container overflow-hidden py-4">
    <div
      class="row gy-4 gx-4 justify-content-evenly text-center align-items-center"
    >
      <div class="col-md-4">
        <router-link class="text-decoration-none" to="/quiz">
          <div class="dashboard__activity rounded-4 p-3">
            <img
              src="../../assets/images/form.png"
              class="w-75"
              alt="create quiz image"
            />
            <h1 class="text-primary fs-3 mt-4">Create quiz</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 offset-md-1">
        <router-link class="text-decoration-none" to="/statistics">
          <div class="dashboard__activity rounded-4 p-3">
            <img
              src="../../assets/images/stats.png"
              class="w-75"
              alt="create quiz image"
            />
            <h1 class="text-primary fs-3 mt-4">Statistics</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link class="text-decoration-none" to="/dashboard">
          <div class="dashboard__activity rounded-4 p-3">
            <img
              src="../../assets/images/no_photo.png"
              class="w-75"
              alt="create quiz image"
            />
            <h1 class="text-primary fs-3 mt-4">Undefined</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 offset-md-1">
        <router-link class="text-decoration-none" to="/dashboard">
          <div class="dashboard__activity rounded-4 p-3">
            <img
              src="../../assets/images/no_photo.png"
              class="w-75"
              alt="create quiz image"
            />
            <h1 class="text-primary fs-3 mt-4 text-unstyled">Undefined</h1>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "../../assets/scss/custom.scss";
.dashboard {
  &__activity {
    transition: background-color cubic-bezier(0.165, 0.84, 0.44, 1) 1000ms;
    &:hover {
      background-color: $dark;
    }
  }
}
</style>
