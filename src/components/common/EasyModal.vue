<script>
export default {
  name: "EasyModal",
};
</script>
<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="exampleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content text-primary">
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
