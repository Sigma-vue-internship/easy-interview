<script setup>
import CandidateForm from "./CandidateForm.vue";
const candidatesList = [
  {
    position: "position 1",
    username: "username 1",
    linkedinUrl: "linkedinUrl 1",
    feedback: "feedback 1",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
    id: "1",
  },
  {
    position: "position 2",
    username: "username 2",
    linkedinUrl: "linkedinUrl 2",
    feedback: "feedback 2",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg",
    id: "2",
  },
  {
    position: "position 3",
    username: "username 3",
    linkedinUrl: "linkedinUrl 3",
    feedback: "feedback 3",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/638.jpg",
    id: "3",
  },
  {
    position: "position 4",
    username: "username 4",
    linkedinUrl: "linkedinUrl 4",
    feedback: "feedback 4",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1019.jpg",
    id: "4",
  },
  {
    position: "position 6",
    username: "username 6",
    linkedinUrl: "linkedinUrl 6",
    feedback: "feedback 6",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/930.jpg",
    id: "6",
  },
  {
    position: "position 7",
    username: "username 7",
    linkedinUrl: "linkedinUrl 7",
    feedback: "feedback 7",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/755.jpg",
    id: "7",
  },
  {
    position: "position 8",
    username: "username 8",
    linkedinUrl: "linkedinUrl 8",
    feedback: "feedback 8",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/498.jpg",
    id: "8",
  },
  {
    position: "position 9",
    username: "username 9",
    linkedinUrl: "linkedinUrl 9",
    feedback: "feedback 9",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/896.jpg",
    id: "9",
  },
  {
    position: "position 10",
    username: "username 10",
    linkedinUrl: "linkedinUrl 10",
    feedback: "feedback 10",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1161.jpg",
    id: "10",
  },
  {
    position: "position 11",
    username: "username 11",
    linkedinUrl: "linkedinUrl 11",
    feedback: "feedback 11",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/749.jpg",
    id: "11",
  },
  {
    position: "position 12",
    username: "username 12",
    linkedinUrl: "linkedinUrl 12",
    feedback: "feedback 12",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/806.jpg",
    id: "12",
  },
  {
    position: "position 13",
    username: "username 13",
    linkedinUrl: "linkedinUrl 13",
    feedback: "feedback 13",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/852.jpg",
    id: "13",
  },
  {
    position: "position 14",
    username: "username 14",
    linkedinUrl: "linkedinUrl 14",
    feedback: "feedback 14",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/500.jpg",
    id: "14",
  },
  {
    position: "position 15",
    username: "username 15",
    linkedinUrl: "linkedinUrl 15",
    feedback: "feedback 15",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/437.jpg",
    id: "15",
  },
  {
    position: "position 16",
    username: "username 16",
    linkedinUrl: "linkedinUrl 16",
    feedback: "feedback 16",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1084.jpg",
    id: "16",
  },
  {
    position: "position 17",
    username: "username 17",
    linkedinUrl: "linkedinUrl 17",
    feedback: "feedback 17",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1196.jpg",
    id: "17",
  },
  {
    position: "position 18",
    username: "username 18",
    linkedinUrl: "linkedinUrl 18",
    feedback: "feedback 18",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/604.jpg",
    id: "18",
  },
  {
    position: "position 19",
    username: "username 19",
    linkedinUrl: "linkedinUrl 19",
    feedback: "feedback 19",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1027.jpg",
    id: "19",
  },
  {
    position: "position 20",
    username: "username 20",
    linkedinUrl: "linkedinUrl 20",
    feedback: "feedback 20",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/340.jpg",
    id: "20",
  },
  {
    position: "position 21",
    username: "username 21",
    linkedinUrl: "linkedinUrl 21",
    feedback: "feedback 21",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/29.jpg",
    id: "21",
  },
  {
    position: "position 22",
    username: "username 22",
    linkedinUrl: "linkedinUrl 22",
    feedback: "feedback 22",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/691.jpg",
    id: "22",
  },
  {
    position: "position 23",
    username: "username 23",
    linkedinUrl: "linkedinUrl 23",
    feedback: "feedback 23",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/685.jpg",
    id: "23",
  },
  {
    position: "position 24",
    username: "username 24",
    linkedinUrl: "linkedinUrl 24",
    feedback: "feedback 24",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/110.jpg",
    id: "24",
  },
  {
    position: "position 25",
    username: "username 25",
    linkedinUrl: "linkedinUrl 25",
    feedback: "feedback 25",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1174.jpg",
    id: "25",
  },
  {
    position: "position 26",
    username: "username 26",
    linkedinUrl: "linkedinUrl 26",
    feedback: "feedback 26",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/411.jpg",
    id: "26",
  },
  {
    position: "position 27",
    username: "username 27",
    linkedinUrl: "linkedinUrl 27",
    feedback: "feedback 27",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/855.jpg",
    id: "27",
  },
  {
    position: "position 28",
    username: "username 28",
    linkedinUrl: "linkedinUrl 28",
    feedback: "feedback 28",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1213.jpg",
    id: "28",
  },
  {
    position: "position 29",
    username: "username 29",
    linkedinUrl: "linkedinUrl 29",
    feedback: "feedback 29",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/921.jpg",
    id: "29",
  },
  {
    position: "position 30",
    username: "username 30",
    linkedinUrl: "linkedinUrl 30",
    feedback: "feedback 30",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/420.jpg",
    id: "30",
  },
  {
    position: "position 31",
    username: "username 31",
    linkedinUrl: "linkedinUrl 31",
    feedback: "feedback 31",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/863.jpg",
    id: "31",
  },
  {
    position: "position 32",
    username: "username 32",
    linkedinUrl: "linkedinUrl 32",
    feedback: "feedback 32",
    avatarUrl:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/544.jpg",
    id: "32",
  },
];
</script>
<template>
  <div class="container pt-4">
    <div class="row mb-3 align-items-center">
      <h1
        class="col-lg-2 mb-md-4 mb-lg-0 col-xl-2 col-xxl-2 text-center text-md-start text-primary"
      >
        Candidates
      </h1>
      <CandidateForm
        class="col-lg-2 my-xs-4 my-lg-0 ms-lg-5 ms-xl-4 ms-xxl-0 text-center text-md-start"
      />
    </div>
    <ul class="list-unstyled row g-md-4 g-lg-4 g-2">
      <li
        class="col-8 col-md-4 col-lg-3 mx-auto mx-md-0 mb-3 mb-md-0 text-center text-primary candidate__item"
        v-for="candidate in candidatesList"
        :key="candidate.id"
      >
        <div class="card rounded-3 bg-dark">
          <img
            class="card-img-top"
            :src="candidate.avatarUrl"
            alt="candidateAvatar"
          />

          <div class="card-body">
            <h2 class="card-title fs-3">{{ candidate.username }}</h2>
          </div>
          <div>
            <p class="card-footer border-secondary fs-5 m-0">
              Position: {{ candidate.position }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>