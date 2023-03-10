<script setup lang="ts">
import ListItem from "./ListItem.vue";
import { computed } from "vue";
import { IResultAnswer } from "../../dto/results";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
    required: true,
  },
  questionsArray: {
    type: Array<IResultAnswer>,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
});

const questionsSegregation = computed(() =>
  props.questionsArray.filter(
    answer => answer.question.question_categories_id === props.categoryId,
  ),
);
</script>

<template>
  <div
    id="categoryAccordionFlush"
    class="accordion accordion-flush mb-3 mx-2"
  >
    <div class="accordion-category">
      <h2
        id="flush-heading"
        class="accordion-header"
      >
        <button
          class="accordion-button collapsed text-primary fs-5 shadow border border-light rounded text-md-start mb-3"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#flush-collapseOne' + itemId"
          aria-expanded="false"
          :aria-controls="'flush-collapseOne' + itemId"
        >
          {{ props.category }}
        </button>
      </h2>
      <div
        :id="'flush-collapseOne' + itemId"
        class="accordion-collapse collapse"
        aria-labelledby="flush-heading"
        data-bs-parent="#categoryAccordionFlush"
      >
        <div class="card card-body shadow py-0">
          <ul class="list-unstyled">
            <ListItem
              v-for="question in questionsSegregation"
              :key="question.question.id"
              :question="question"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
