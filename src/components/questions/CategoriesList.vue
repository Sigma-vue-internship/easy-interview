<script setup>
import { useRouter } from "vue-router";

import Categories from "../../utils/useCategories";

const questionsList = [
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
    <div class="row mb-3 align-items-center">
      <div
        class="col-lg-2 mb-md-4 mb-lg-0 col-xl-2 col-xxl-2 text-center text-md-start text-primary"
      >
        <h2 class="text-center mb-4 text-md-start mb-md-0 text-primary">
          Categories
        </h2>
      </div>
      <div
        class="col-lg-2 my-xs-4 my-lg-0 ms-lg-5 ms-xl-4 ms-xxl-0 text-center text-md-start"
      ></div>
    </div>
    <ul class="list-unstyled mt-5">
      <li
        v-for="item in Categories()"
        :key="item"
        class="border border-light mt-4 p-2 rounded-3 mx-auto shadow-sm"
        @click="pushRoute(item)"
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
              {{ questionsList.filter(obj => obj.category === item).length }}
            </h4>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
