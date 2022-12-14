<script lang="ts">
export default {
  name: "EasyDropdown",
};
</script>
<script setup lang="ts">
import { ref, reactive } from "vue";
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
  zIndexStyle: {
    type: Number,
    required: false,
    default: 1000,
  },
});
const zIndexStyle = reactive({
  "z-index": props.zIndexStyle,
});
// const dropdownCurrentInput = ref("");
const isDropdownObjVisible = ref(false);
const emit = defineEmits<Emit>();
const emitDropdownUpdate = debounce(e => {
  // dropdownCurrentInput.value = e.target.value;
  emit("update:dropdownInput", e.target.value);
}, 350);

const emitSetDropdownObj = dropdownObj => {
  isDropdownObjVisible.value = false;
  // dropdownCurrentInput.value = e.target.value;
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
    class="w-100 position-relative"
  >
    <input
      id="candidateInput"
      class="form-control container-fluid"
      placeholder="Type something to search..."
      @input="emitDropdownUpdate"
      @focusin="isDropdownObjVisible = true"
    />
    <div
      v-if="dropdownInput.length >= 1 && isDropdownObjVisible"
      class="list-group overflow-scroll shadow-md w-100 position-absolute"
      :style="zIndexStyle"
    >
      <a
        v-for="(dropdownObj, index) in dropdownData"
        :key="
          `${dropdownObj.id}`
            ? `${dropdownObj.username}${dropdownObj.id}`
            : `${dropdownObj}`
        "
        class="list-group-item list-group-item-action px-2 h-100 w-100"
      >
        <div
          :id="'dropdownObjBtn' + index"
          class="d-flex w-100 align-items-center gap-3"
          :style="{ height: '85px' }"
          @click="emitSetDropdownObj(dropdownObj)"
        >
          <img
            v-if="dropdownObj.avatarUrl"
            :src="dropdownObj.avatarUrl"
            class="rounded-circle candidate__img"
            alt="avatar"
          />
          <div
            v-else
            class="badge rounded-pill text-bg-primary d-none d-lg-block"
          >
            Category
          </div>
          <div class="flex-column text-start">
            <p class="py-2 m-0">
              {{ dropdownObj.username ? dropdownObj.username : dropdownObj }}
            </p>
            <p
              v-if="dropdownObj.position"
              class="py-2 d-none d-lg-block m-0"
            >
              {{ dropdownObj.position }}
            </p>
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
.candidate__img {
  object-fit: cover;
  object-position: center;
  width: 50px;
  height: 50px;
}
</style>
