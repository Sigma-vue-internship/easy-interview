<script setup lang="ts">
import { ref } from "vue";

interface Emit {
  (e: "set-checked", isCorrect: number, questionId: string): void;
}
const emit = defineEmits<Emit>();
const switchValue = ref<boolean>(false);

const props = defineProps({
  id: {
    type: String,
    default: "",
    required: true,
  },
});

function toggleSwitch(isCorrect) {
  switchValue.value = isCorrect;
  if (switchValue.value) {
    return emit("set-checked", 1, props.id);
  }
  return emit("set-checked", 0, props.id);
}
</script>
<script lang="ts">
export default {
  name: "EasySwitch",
};
</script>
<template>
  <div class="switch-field">
    <input
      :id="'radio-one' + id"
      type="radio"
      :name="'switch-one' + id"
      @click="toggleSwitch(true)"
    />
    <label :for="'radio-one' + id">Correct</label>
    <input
      :id="'radio-two' + id"
      type="radio"
      :name="'switch-one' + id"
      @click="toggleSwitch(false)"
    />
    <label :for="'radio-two' + id">Incorrect</label>
  </div>
</template>
<style lang="scss" scoped>
.switch-field {
  display: block;
  overflow: hidden;
}

.switch-field input {
  position: absolute !important;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  width: 1px;
  border: 0;
  overflow: hidden;
}

.switch-field label {
  background-color: #e4e4e4;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  line-height: 1;
  text-align: center;
  padding: 8px 16px;
  margin-right: -1px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
  cursor: pointer;
}

.switch-field input[id*="radio-one"]:checked + label {
  background-color: #99ee68;
  box-shadow: none;
}
.switch-field input[id*="radio-two"]:checked + label {
  background-color: #f37171;
  box-shadow: none;
}

.switch-field label:first-of-type {
  border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
  border-radius: 0 4px 4px 0;
}

.form {
  max-width: 600px;
  font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
  font-weight: normal;
  line-height: 1.625;
  margin: 8px auto;
  padding: 16px;
}

h2 {
  font-size: 18px;
  margin-bottom: 8px;
}
</style>
