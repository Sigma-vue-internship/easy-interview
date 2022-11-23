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
  <div>
    <p class="text-center text-md-start">
      <button
        class="btn btn-outline-primary mt-2"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapseButton' + itemId"
        aria-expanded="false"
        :aria-controls="'collapseButton' + itemId"
      >
        {{ props.category }}
      </button>
    </p>
    <div
      :id="'collapseButton' + itemId"
      class="collapse multi-collapse"
    >
      <div class="card card-body bg-light">
        <ul class="list-unstyled">
          <ListItem
            v-for="oneQuestion in questionsSegregation"
            :key="oneQuestion.question"
            :one-question="oneQuestion"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
