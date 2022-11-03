<template>
  <form>
    <div class="row">
      <div class="col-8">
        <input
          class="form-control text-secondary border-primary"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <div class="col-2">
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </div>
      <div class="col-2">
        <div class="dropdown ms-3 ms-md-1">
          <img
            src="../icons/filter.svg"
            class="dropdown-toggle pt-1 drop_img"
            height="30px"
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
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Candidates</label
                >
              </div>
            </li>
            <li>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Categories</label
                >
              </div>
            </li>
            <li>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Questions</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </form>
</template>
