<script setup lang="ts">
import { useRouter } from "vue-router";
import formattingDate from "../../utils/dateFormatting";

const quizResults = [
  {
    questionAnswer: [],
    startedAt: 1668092016,
    endedAt: 1668092016,
    title: "title 1",
    id: "1",
    candidateId: "1",
    parent: {
      position: "position 1",
      username: "username 1",
      linkedinUrl: "linkedinUrl 1",
      feedback: "feedback 1",
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
      id: "1",
    },
  },
  {
    questionAnswer: [],
    startedAt: 1668091776,
    endedAt: 1668091776,
    title: "title 5",
    id: "5",
    candidateId: "1",
    parent: {
      position: "position 1",
      username: "username 1",
      linkedinUrl: "linkedinUrl 1",
      feedback: "feedback 1",
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
      id: "1",
    },
  },
  {
    questionAnswer: [],
    startedAt: 1668091956,
    endedAt: 1668091956,
    title: "title 2",
    id: "2",
    candidateId: "2",
    parent: {
      position: "position 2",
      username: "username 2",
      linkedinUrl: "linkedinUrl 2",
      feedback: "feedback 2",
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg",
      id: "2",
    },
  },
  {
    questionAnswer: [],
    startedAt: 1668091716,
    endedAt: 1668091716,
    title: "title 6",
    id: "6",
    candidateId: "2",
    parent: {
      position: "position 2",
      username: "username 2",
      linkedinUrl: "linkedinUrl 2",
      feedback: "feedback 2",
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg",
      id: "2",
    },
  },
  {
    questionAnswer: [],
    startedAt: 1668091656,
    endedAt: 1668091656,
    title: "title 7",
    id: "7",
    candidateId: "3",
    parent: {
      position: "position 3",
      username: "username 3",
      linkedinUrl: "linkedinUrl 3",
      feedback: "feedback 3",
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/638.jpg",
      id: "3",
    },
  },
];

const router = useRouter();

function pushRoute(id: string) {
  router.push({
    name: "singleResult",
    params: { id },
  });
}
</script>

<template>
  <div class="container mt-3">
    <h2 class="text-primary text-center text-md-start">Quiz Results</h2>
    <ul class="list-unstyled">
      <li
        v-for="item in quizResults"
        :key="item.id"
        class="border border-light mt-4 p-2 rounded-3 text-secondary mx-auto shadow-sm ps-4"
        @click="pushRoute(item.id)"
      >
        <div class="row">
          <h4 class="text-center text-lg-start">{{ item.title }}</h4>
        </div>
        <div class="row text-center text-lg-start">
          <div class="col-12 col-lg-6">
            {{ item.parent.username }}
          </div>
          <div class="col-12 col-lg-3">
            {{ item.parent.position }}
          </div>
          <div class="col-12 col-lg-3 text-lg-end pe-4">
            {{ formattingDate(item.endedAt) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
