<script setup lang="ts">
const emit = defineEmits(["addPoint"]);

defineProps({
  idNumber: {
    type: Number,
    default: 0,
  },
});

function addPoint(point: number) {
  emit("addPoint", point);
}
</script>

<template>
  <div>
    <input
      :id="'answer' + idNumber"
      class="form-check-input"
      type="checkbox"
      :value="idNumber"
      @click="addPoint(idNumber)"
    />
    <label
      class="form-check-label"
      for="answerCheckbox"
      :value="idNumber"
      >{{ idNumber }}</label
    >
  </div>
</template>
