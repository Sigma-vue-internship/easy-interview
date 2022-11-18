<script setup lang="ts">
import ListItem from "./ListItem.vue";
import { computed } from "vue";
import { IquestionAnswer } from "./types";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  questionsArray: {
    type: Array as () => IquestionAnswer[],
    required: true,
  },
});

const filter = computed(() =>
  props.questionsArray.filter((answer) => answer.category === props.category)
);
</script>

<template>
  <div>
    <p class="text-center text-md-start">
      <button
        class="btn btn-outline-primary mt-2"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="
          '#multiCollapseExample1' + props.category.split(' ').join('')
        "
        aria-expanded="false"
        :aria-controls="
          'multiCollapseExample1' + props.category.split(' ').join('')
        "
      >
        {{ props.category }}
      </button>
    </p>
    <div
      class="collapse multi-collapse"
      :id="'multiCollapseExample1' + props.category.split(' ').join('')"
    >
      <div class="card card-body bg-light">
        <ul class="list-unstyled">
          <ListItem
            class="answers-item"
            v-for="item in filter"
            :key="item.question"
            :question="item.question"
            :questionScore="item.questionScore"
            :answerPoints="item.answerPoints"
            :category="item.category"
            :answer="item.answer"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
