<script setup lang="ts">
import ListItem from "./ListItem.vue";

const props = defineProps({
  item: String,
  array: Array,
});
</script>

<template>
  <div>
    <p class="text-center text-md-start">
      <button
        class="btn btn-outline-primary mt-2"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="
          '#multiCollapseExample1' + props.item.split(' ').join('')
        "
        aria-expanded="false"
        :aria-controls="
          'multiCollapseExample1' + props.item.split(' ').join('')
        "
      >
        {{ props.item }}
      </button>
    </p>
    <div
      class="collapse multi-collapse"
      :id="'multiCollapseExample1' + props.item.split(' ').join('')"
    >
      <div class="card card-body bg-light">
        <ul class="list-unstyled">
          <ListItem
            class="answers-item"
            v-for="item in array.filter((obj) => obj.category === item)"
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
