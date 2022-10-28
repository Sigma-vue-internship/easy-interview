<script setup>
const candidatesList = [
  {
    position: "position 1",
    username: "username 1",
    linkedinUrl: "linkedinUrl 1",
    feedback: "good 1",
    id: "1",
  },
  {
    position: "position 2",
    username: "username 2",
    linkedinUrl: "linkedinUrl 2",
    feedback: "feedback 2",
    id: "2",
  },
  {
    position: "position 3",
    username: "username 3",
    linkedinUrl: "linkedinUrl 3",
    feedback: "feedback 3",
    id: "3",
  },
  {
    position: "position 4",
    username: "username 4",
    linkedinUrl: "linkedinUrl 4",
    feedback: "feedback 4",
    id: "4",
  },
  {
    position: "position 6",
    username: "username 6",
    linkedinUrl: "linkedinUrl 6",
    feedback: "feedback 6",
    id: "6",
  },
  {
    position: "position 7",
    username: "username 7",
    linkedinUrl: "linkedinUrl 7",
    feedback: "feedback 7",
    id: "7",
  },
  {
    position: "position 8",
    username: "username 8",
    linkedinUrl: "linkedinUrl 8",
    feedback: "feedback 8",
    id: "8",
  },
  {
    position: "position 9",
    username: "username 9",
    linkedinUrl: "linkedinUrl 9",
    feedback: "feedback 9",
    id: "9",
  },
  {
    position: "position 10",
    username: "username 10",
    linkedinUrl: "linkedinUrl 10",
    feedback: "feedback 10",
    id: "10",
  },
  {
    position: "position 11",
    username: "username 11",
    linkedinUrl: "linkedinUrl 11",
    feedback: "feedback 11",
    id: "11",
  },
  {
    position: "position 12",
    username: "username 12",
    linkedinUrl: "linkedinUrl 12",
    feedback: "feedback 12",
    id: "12",
  },
  {
    position: "position 13",
    username: "username 13",
    linkedinUrl: "linkedinUrl 13",
    feedback: "feedback 13",
    id: "13",
  },
  {
    position: "position 14",
    username: "username 14",
    linkedinUrl: "linkedinUrl 14",
    feedback: "feedback 14",
    id: "14",
  },
  {
    position: "position 15",
    username: "username 15",
    linkedinUrl: "linkedinUrl 15",
    feedback: "feedback 15",
    id: "15",
  },
  {
    position: "position 16",
    username: "username 16",
    linkedinUrl: "linkedinUrl 16",
    feedback: "feedback 16",
    id: "16",
  },
  {
    position: "position 17",
    username: "username 17",
    linkedinUrl: "linkedinUrl 17",
    feedback: "feedback 17",
    id: "17",
  },
  {
    position: "position 18",
    username: "username 18",
    linkedinUrl: "linkedinUrl 18",
    feedback: "feedback 18",
    id: "18",
  },
  {
    position: "position 19",
    username: "username 19",
    linkedinUrl: "linkedinUrl 19",
    feedback: "feedback 19",
    id: "19",
  },
  {
    position: "position 20",
    username: "username 20",
    linkedinUrl: "linkedinUrl 20",
    feedback: "feedback 20",
    id: "20",
  },
  {
    position: "position 21",
    username: "username 21",
    linkedinUrl: "linkedinUrl 21",
    feedback: "feedback 21",
    id: "21",
  },
  {
    position: "position 22",
    username: "username 22",
    linkedinUrl: "linkedinUrl 22",
    feedback: "feedback 22",
    id: "22",
  },
  {
    position: "position 23",
    username: "username 23",
    linkedinUrl: "linkedinUrl 23",
    feedback: "feedback 23",
    id: "23",
  },
  {
    position: "position 24",
    username: "username 24",
    linkedinUrl: "linkedinUrl 24",
    feedback: "feedback 24",
    id: "24",
  },
  {
    position: "position 25",
    username: "username 25",
    linkedinUrl: "linkedinUrl 25",
    feedback: "feedback 25",
    id: "25",
  },
  {
    position: "position 26",
    username: "username 26",
    linkedinUrl: "linkedinUrl 26",
    feedback: "feedback 26",
    id: "26",
  },
  {
    position: "position 27",
    username: "username 27",
    linkedinUrl: "linkedinUrl 27",
    feedback: "feedback 27",
    id: "27",
  },
  {
    position: "position 28",
    username: "username 28",
    linkedinUrl: "linkedinUrl 28",
    feedback: "feedback 28",
    id: "28",
  },
  {
    position: "position 29",
    username: "username 29",
    linkedinUrl: "linkedinUrl 29",
    feedback: "feedback 29",
    id: "29",
  },
  {
    position: "position 30",
    username: "username 30",
    linkedinUrl: "linkedinUrl 30",
    feedback: "feedback 30",
    id: "30",
  },
  {
    position: "position 1",
    username: "username 1",
    linkedinUrl: "linkedinUrl 1",
    feedback: "feedback 1",
    id: "31",
  },
  {
    position: "position 1",
    username: "username 1",
    linkedinUrl: "linkedinUrl 1",
    feedback: "feedback 1",
    id: "32",
  },
];
</script>
<template>
  <div class="container">
    <ul class="row">
      <li
        class="col-12 col-md-4"
        v-for="candidate in candidatesList"
        :key="candidate.id"
      >
        {{ candidate.username }}
      </li>
    </ul>
  </div>
</template>
