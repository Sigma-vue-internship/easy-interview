<script setup lang="ts">
import ListItem from "./ListItem.vue";
import { computed } from "vue";
import { QuestionAnswer } from "../../../dto/results";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  questionsArray: {
    type: Array as () => QuestionAnswer[],
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
});

const questionsSegregation = computed(() =>
  props.questionsArray.filter(answer => answer.category === props.category),
);
</script>

<template>
  <div
    id="categoryAccordionFlush"
    class="accordion accordion-flush border border-primary rounded mb-2"
  >
    <div class="accordion-category">
      <h2
        id="flush-heading"
        class="accordion-header"
      >
        <button
          class="accordion-button collapsed text-primary"
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
              v-for="oneQuestion in questionsSegregation"
              :key="oneQuestion.text"
              :one-question="oneQuestion"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
