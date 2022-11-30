<script lang="ts">
export default {
  name: "Pagination",
};
</script>
<script setup lang="ts">
import { toRefs } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  pageCount: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});
const { currentPage } = toRefs(props);
const route = useRoute();
const emit = defineEmits(["update:currentPage"]);
const emitChangePage = page => {
  emit("update:currentPage", page);
};
const toNextPage = () => {
  if (currentPage.value >= props.pageCount) {
    return;
  }
  emit("update:currentPage", currentPage.value + 1);
};
const toPrevPage = () => {
  if (currentPage.value === 1) {
    return;
  }
  emit("update:currentPage", currentPage.value - 1);
};
</script>
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <button
          class="page-link"
          :class="{
            disabled: currentPage === 1,
          }"
          @click="toPrevPage"
        >
          Previous
        </button>
      </li>
      <li
        v-for="(page, index) in pageCount"
        :key="page"
        class="page-item"
        :class="`${index + 1}` === route.query.page ? 'active' : ''"
      >
        <button
          class="page-link"
          @click="emitChangePage(index + 1)"
        >
          {{ page }}
        </button>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          :class="{
            disabled: currentPage === pageCount || !pageCount,
          }"
          @click="toNextPage"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
