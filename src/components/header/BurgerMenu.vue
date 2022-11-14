<template>
  <form>
    <font-awesome-icon
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      class="btn btn-outline-primary text-primary burger__btn"
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
          <router-link class="text-decoration-none" to="/dashboard"
            ><li class="list-group-item bg-dark text-primary">
              Dashboard
            </li></router-link
          >

          <router-link class="text-decoration-none" to="/categories"
            ><li class="list-group-item bg-dark text-primary">
              Questions
            </li></router-link
          >

          <router-link class="text-decoration-none" to="/candidates"
            ><li class="list-group-item bg-dark text-primary">
              Candidates
            </li></router-link
          >

          <router-link class="text-decoration-none" to="/results"
            ><li class="list-group-item bg-dark text-primary">
              Quiz results
            </li></router-link
          >
        </ul>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import "../../assets/scss/custom.scss";
#dropdownMenuButton {
  height: 4.5vh;
  display: block;
}
.burger__btn {
  &:hover {
    color: black !important;
  }
}
.router-link-active.router-link-exact-active {
  .list-group-item {
    color: white !important;
    background-color: $primary !important;
  }
}
</style>
