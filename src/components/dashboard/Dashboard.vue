<template>
  <div class="container overflow-hidden py-4">
    <div class="row gy-4 gx-4 text-center align-items-center">
      <div class="col-md-4 col-lg-3">
        <router-link class="text-decoration-none" to="/quiz">
          <div class="dashboard__activity border rounded-4 p-3">
            <span class="icon-form w-75" />
            <h1 class="text-primary fs-3 mt-4">Create quiz</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link class="text-decoration-none" to="/categories">
          <div class="dashboard__activity border rounded-4 p-3">
            <span class="icon-book-open" />

            <h1 class="text-primary fs-3 mt-4">Questions</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link class="text-decoration-none" to="/results">
          <div class="dashboard__activity border rounded-4 p-3">
            <span class="icon-paste" />

            <h1 class="text-primary fs-3 mt-4">Results</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link class="text-decoration-none" to="/candidates">
          <div class="dashboard__activity border rounded-4 p-3">
            <span class="icon-users" />

            <h1 class="text-primary fs-3 mt-4 text-unstyled">Candidates</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link class="text-decoration-none" to="/">
          <div class="dashboard__activity border rounded-4 p-3">
            <span class="icon-loop-alt" />

            <h1 class="text-primary fs-3 mt-4 text-unstyled">Last result</h1>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link class="text-decoration-none" to="/statistics">
          <div class="dashboard__activity border rounded-4 p-3">
            <span class="icon-stats" />

            <h1 class="text-primary fs-3 mt-4">Statistics</h1>
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
