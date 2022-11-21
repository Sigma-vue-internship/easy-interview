<template>
  <form>
    <div class="row justify-content-evenly gx-0">
      <div
        class="col-md-10 row gx-2 justify-content-center justify-content-xl-end"
      >
        <div class="col-12 col-md-9 align-self-center">
          <input
            class="form-control text-secondary border-primary"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        <div class="dropdown col-md-1">
          <font-awesome-icon
            icon="fa-solid fa-filter "
            class="dropdown-toggle drop-img text-primary fs-3 text-center"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
          />
          <ul
            class="dropdown-menu p-2 bg-secondary"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  Candidates
                </label>
              </div>
            </li>
            <li>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  Categories
                </label>
              </div>
            </li>
            <li>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  Questions
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-2 align-self-center">
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </div>
    </div>
  </form>
</template>
