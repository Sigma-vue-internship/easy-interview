<script setup>
let categoriesList = [
  "HTML",
  "CSS",
  "JavaScript",
  "Frameworks",
  "OOP",
  "Security",
  "Network",
  "Database",
  "Browser",
];

let questionsList = [
  {
    category: "HTML",
    id: "1",
  },
  {
    category: "JavaScript",
    id: "3",
  },
  {
    category: "Frameworks",
    id: "4",
  },
  {
    category: "CSS",
    id: "2",
  },
  {
    category: "HTML",
    id: "1",
  },
  {
    category: "JavaScript",
    id: "3",
  },
  {
    category: "JavaScript",
    id: "3",
  },
  {
    category: "JavaScript",
    id: "3",
  },
  {
    category: "Network",
    id: "5",
  },
  {
    category: "JavaScript",
    id: "3",
  },
  {
    category: "CSS",
    id: "2",
  },
  {
    category: "HTML",
    id: "1",
  },
  {
    category: "Security",
    id: "6",
  },
  {
    category: "Security",
    id: "6",
  },
  {
    category: "Browser",
    id: "8",
  },
  {
    category: "Browser",
    id: "8",
  },
  {
    category: "Browser",
    id: "8",
  },
  {
    category: "Browser",
    id: "8",
  },
  {
    category: "Security",
    id: "6",
  },
  {
    category: "OOP",
    id: "9",
  },
  {
    category: "Security",
    id: "6",
  },
  {
    category: "Browser",
    id: "8",
  },
];

function categoryTitle(item) {
  console.log(item);
}
</script>

<template>
  <div class="container mt-3 text-center">
    <h2 class="text-primary">Categories List</h2>
    <ul class="list-unstyled mt-5">
      <li
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow"
        v-for="item in categoriesList"
        :key="item"
        @click="categoryTitle(item)"
      >
        <div class="row">
          <div class="col-9">
            <h5 class="text-secondary pt-2">
              {{ item }}
            </h5>
          </div>
          <div
            class="col-1 d-flex text-primary align-items-center justify-content-center rounded-5 badge bg-light"
          >
            <h4 class="m-0 pb-1 fs-5">
              {{ questionsList.filter((obj) => obj.category === item).length }}
            </h4>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
