import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionForm from "../QuestionForm.vue";

describe("QuestionForm.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("all categories should be rendered", async () => {
    const wrapper = mount(QuestionForm);
    const categoriesLength = wrapper.vm.categories.length;
    const templateLength = wrapper.findAll(".category__option").length;
    expect(categoriesLength).toEqual(templateLength);
  });
});
