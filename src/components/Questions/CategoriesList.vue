<script setup>
import { useRouter } from "vue-router";
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

const router = useRouter();

function pushRoute(item) {
  router.push({
    name: "category",
    params: {
      title: item,
    },
  });
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
        @click="pushRoute(item)"
      >
        <div class="row">
          <div class="col-9">
            <h5 class="text-secondary pt-2">
              {{ item }}
            </h5>
          </div>
          <div
            class="col-3 text-primary text-center badge bg-light rounded-circle quantity-background"
          >
            <h5 class="questions-quantity">
              {{ questionsList.filter((obj) => obj.category === item).length }}
            </h5>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style class="scoped">
li {
  cursor: pointer;
}

.row .quantity-background {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
