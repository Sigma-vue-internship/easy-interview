<script>
export default {
  name: "EasyModal",
};
</script>
<template>
  <button
    type="button"
    class="btn btn-outline-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <slot name="open-btn">Click me</slot>
  </button>
  <div
    class="modal fade"
    id="exampleModal"
    ref="easyModal"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-primary">
        <div class="modal-header">
          <slot name="header" />
        </div>
        <div class="modal-body text-start">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>
