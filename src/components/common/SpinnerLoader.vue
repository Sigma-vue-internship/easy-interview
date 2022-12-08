<script lang="ts">
export default {
  name: "SpinnerLoader",
};
</script>
<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div
      class="spinner-border text-primary"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
