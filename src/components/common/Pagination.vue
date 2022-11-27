<script lang="ts">
export default {
  name: "Pagination",
};
</script>
<script setup lang="ts">
import { ref } from "vue";

defineProps({
  pageCount: {
    type: Number,
    required: true,
  },
});
const currentPage = ref(1);
const emit = defineEmits(["changePage"]);
const sectionStart = ref(0);
const sectionEnd = ref(0);
function emitChangePage(page) {
  currentPage.value = page;
  sectionStart.value = page * 8;
  sectionEnd.value = sectionStart.value + 8;
  emit("changePage", sectionStart.value, sectionEnd.value);
  currentPage.value++;
}
</script>
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          >Previous</a
        >
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''"
      >
        <button
          class="page-link"
          @click="emitChangePage(page - 1)"
        >
          {{ page }}
        </button>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
