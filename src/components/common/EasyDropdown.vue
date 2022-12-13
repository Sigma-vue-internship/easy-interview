<script lang="ts">
export default {
  name: "EasyDropdown",
};
</script>
<script setup lang="ts">
import { ref, onUpdated } from "vue";
import debounce from "lodash/debounce";
interface Emit {
  (e: "update:dropdownInput", targetValue: string): void;
  (e: "setDropdownObj", dropdownObj: object): void;
}
const props = defineProps({
  dropdownInput: {
    type: String,
    required: false,
    default() {
      return "";
    },
  },
  dropdownData: {
    type: Array,
    required: false,
    default() {
      return [];
    },
  },
});

const isDropdownObjVisible = ref(false);
const emit = defineEmits<Emit>();
const emitDropdownUpdate = debounce(e => {
  emit("update:dropdownInput", e.target.value);
}, 500);

const emitSetDropdownObj = dropdownObj => {
  isDropdownObjVisible.value = false;
  emit("setDropdownObj", dropdownObj);
};
function handleBlur(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDropdownObjVisible.value = false;
  }
}
</script>
<template>
  <div
    tabindex="1"
    @focusout="handleBlur"
  >
    <input
      id="candidateInput"
      class="form-control container-fluid"
      placeholder="Type something to search..."
      :value="dropdownInput"
      @input="emitDropdownUpdate"
      @focusin="isDropdownObjVisible = true"
    />
    <div
      v-if="dropdownInput.length >= 1 && isDropdownObjVisible"
      class="list-group overflow-scroll shadow-md w-100 position-absolute"
    >
      <a
        v-for="dropdownObj in dropdownData"
        :key="dropdownObj.id"
        class="list-group-item list-group-item-action p-0 px-2"
      >
        <div
          :id="'dropdownObjBtn' + dropdownObj.id"
          class="d-flex w-100 align-items-center gap-3"
          @click="emitSetDropdownObj(dropdownObj)"
        >
          <img
            :src="dropdownObj.avatarUrl"
            class="rounded-circle"
            height="50"
            width="50"
            alt="avatar"
          />
          <div class="flex-column text-start">
            <p class="m-1 me-3">{{ dropdownObj.username }}</p>
            <p class="m-1 me-3">{{ dropdownObj.position }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.overflow-scroll {
  max-height: 245px;
  overflow-x: hidden !important;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background-color: #555555;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #87cf23;
  border-radius: 10px;
}
.candidateInput {
  z-index: -100 !important;
}
</style>
