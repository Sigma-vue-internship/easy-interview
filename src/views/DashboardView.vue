<template>
  <div class="overflow-hidden pb-4">
    <div class="row gy-4 gx-4 text-center align-items-center">
      <div class="col-md-4 col-lg-3">
        <router-link
          class="text-decoration-none"
          to="/constructor"
        >
          <div class="border rounded-4 p-3">
            <span class="icon-form w-75" />
            <h2 class="text-secondary fs-3 mt-4">Create quiz</h2>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link
          class="text-decoration-none"
          to="/questions"
        >
          <div class="border rounded-4 p-3">
            <span class="icon-book-open" />

            <h2 class="text-secondary fs-3 mt-4">Questions</h2>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link
          class="text-decoration-none"
          to="/results"
        >
          <div class="border rounded-4 p-3">
            <span class="icon-paste" />

            <h2 class="text-secondary fs-3 mt-4">Results</h2>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link
          class="text-decoration-none"
          to="/candidates?page=1"
        >
          <div class="border rounded-4 p-3">
            <span class="icon-users" />

            <h2 class="text-secondary fs-3 mt-4 text-unstyled">Candidates</h2>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link
          class="text-decoration-none"
          to="/lastresult"
        >
          <div class="border rounded-4 p-3">
            <span class="icon-loop-alt" />

            <h2 class="text-secondary fs-3 mt-4 text-unstyled">Last result</h2>
          </div>
        </router-link>
      </div>
      <div class="col-md-4 col-lg-3">
        <router-link
          class="text-decoration-none"
          to="/statistics"
        >
          <div class="border rounded-4 p-3">
            <span class="icon-stats" />

            <h2 class="text-secondary fs-3 mt-4">Statistics</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
