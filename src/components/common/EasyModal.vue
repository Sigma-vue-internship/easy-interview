<script setup lang="ts">
interface Emit {
  (e: "closeModal"): void;
}
defineProps({
  title: {
    type: String,
    required: false,
    default() {
      return { formTitle: "Title" };
    },
  },
  modalId: {
    type: String,
    required: true,
    default() {
      return "exampleModal";
    },
  },
  modalSize: {
    type: String,
    required: false,
    default() {
      return "modal-lg";
    },
  },
});
const emit = defineEmits<Emit>();
</script>
<script lang="ts">
export default {
  name: "EasyModal",
};
</script>
<template>
  <div
    :id="modalId"
    class="modal fade pt-2"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      :class="modalSize"
    >
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
