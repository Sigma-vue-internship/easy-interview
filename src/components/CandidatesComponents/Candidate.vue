<script setup>
let singleCandidate = {
  position: "position 1",
  username: "username 1",
  linkedinUrl: "linkedinUrl 1",
  feedback: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  avatarUrl:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/682.jpg",
  id: "1",
};

let candidateResults = [
  {
    questionAnswer: [],
    startedAt: 1666948101,
    endedAt: 1666948101,
    title: "title 1",
    id: "1",
    candidateId: "1",
  },
  {
    questionAnswer: [],
    startedAt: 1666958718,
    endedAt: 1666958718,
    title: "title 5",
    id: "5",
    candidateId: "1",
  },
];

function resultsID(id) {
  console.log(id);
}
</script>

<template>
  <div class="container border border-2 border-dark mt-3 rounded-3 p-4">
    <div class="row">
      <div class="col-12 col-md-6 d-flex justify-content-center">
        <img
          :src="singleCandidate.avatarUrl"
          alt="candidateAvatar"
          class="img-fluid"
          max-height="350px"
        />
      </div>
      <div class="col-12 col-md-6 text-center">
        <h2 class="text-primary">{{ singleCandidate.username }}</h2>
        <h3 class="text-secondary">{{ singleCandidate.position }}</h3>
        <div class="text-secondary my-4">
          <img
            src="../icons/linkedin.svg"
            alt="linkedin"
            class="me-2"
            style="width: 2rem"
          />
          {{ singleCandidate.linkedinUrl }}
        </div>
        <button
          class="btn border-primary text-primary me-4 rounded-pill"
          style="width: 6rem"
        >
          Edit
        </button>
        <button
          class="btn border-danger text-danger rounded-pill"
          style="width: 6rem"
        >
          Delete
        </button>
      </div>
    </div>
    <p class="text-secondary mt-4">
      <span class="text-primary ps-5">Feedback:</span>
      {{ singleCandidate.feedback }}
    </p>
    <div class="text-center">
      <h3 class="text-primary">Quiz results</h3>
      <ul class="list-unstyled">
        <li
          class="my-2 text-secondary"
          v-for="result in candidateResults"
          :key="result.id"
        >
          {{ result.title }}
          <button
            class="btn border-secondary rounded-pill text-secondary ms-3 opacity-75"
            style="width: 7rem"
            @click="resultsID(result.id)"
          >
            show full
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
