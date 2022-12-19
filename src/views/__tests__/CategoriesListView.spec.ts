import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import CategoriesList from "../CategoriesListView.vue";
const getWrapper = () =>
  mount(CategoriesList, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("CategoriesList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all categories", async () => {
    const wrapper = getWrapper();
    const categoriesListArrayLength = wrapper.vm.Categories().length;
    const categoriesLength = wrapper.findAll("li").length;

    expect(categoriesListArrayLength).toEqual(categoriesLength);
  });
});
