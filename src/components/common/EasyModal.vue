<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default() {
      return { formTitle: "Title" };
    },
  },
  visible: {
    type: Boolean,
    required: true,
    default() {
      return { visible: false };
    },
  },
});
const emit = defineEmits(["closeModal"]);
</script>
<script lang="ts">
export default {
  name: "EasyModal",
};
</script>
<template>
  <div
    v-show="visible"
    id="exampleModal"
    class="modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content text-primary">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
            @click="emit('closeModal')"
          />
        </div>
        <div class="modal-body text-start">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
