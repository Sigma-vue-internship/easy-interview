<script lang="ts">
export default {
  name: "Pagination",
};
</script>
<script setup lang="ts">
import { useRoute } from "vue-router";

const props = defineProps({
  pageCount: {
    type: Number,
    required: true,
  },
});
const route = useRoute();
const emit = defineEmits(["changePage"]);
function emitChangePage(page) {
  emit("changePage", page);
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
        v-for="(page, index) in pageCount"
        :key="page"
        class="page-item"
        :class="`${index + 1}` === route.query.page ? 'active' : ''"
      >
        <button
          class="page-link"
          @click="emitChangePage(`${index + 1}`)"
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
