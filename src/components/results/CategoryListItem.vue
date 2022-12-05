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
        class="btn btn-outline-primary mt-2 px-4 py-2 category-button"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapseButton' + itemId"
        aria-expanded="false"
        :aria-controls="'collapseButton' + itemId"
      >
        <div class="row">
          <div class="col-2 col-md-1 me-md-2">
            <span class="badge bg-primary">{{
              questionsSegregation.length
            }}</span>
          </div>
          <div class="col-10 col-md-10 text-start">
            {{ props.category }}
          </div>
        </div>
      </button>
    </p>
    <div
      :id="'collapseButton' + itemId"
      class="collapse multi-collapse"
    >
      <div class="card card-body shadow mb-3 py-0">
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
</template>

<style>
.category-button {
  width: 14em;
}
</style>
