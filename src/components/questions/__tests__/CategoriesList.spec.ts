import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CategoriesList from "../CategoriesList.vue";

describe("CategoriesList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all categories", async () => {
    const wrapper = mount(CategoriesList);
    const categoriesListArrayLength = wrapper.vm.Categories().length;
    const categoriesLength = wrapper.findAll("li").length;

    expect(categoriesListArrayLength).toEqual(categoriesLength);
  });
});
