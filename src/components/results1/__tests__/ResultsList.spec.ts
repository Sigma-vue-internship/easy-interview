import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ResultsList from "../ResultsList.vue";

describe("ResultsList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all results from array", async () => {
    const wrapper = mount(ResultsList);
    const resultsArrayLength = wrapper.vm.quizResults.length;
    const quizResultsLength = wrapper.findAll("li").length;

    expect(resultsArrayLength).toEqual(quizResultsLength);
  });
});
