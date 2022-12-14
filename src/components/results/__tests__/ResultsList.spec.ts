import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ResultsList from "../ResultsList.vue";
import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(ResultsList, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("ResultsList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all results from array", async () => {
    const wrapper = getWrapper();
    const resultsArrayLength = wrapper.vm.quizResults.length;
    const quizResultsLength = wrapper.findAll("li").length;

    expect(resultsArrayLength).toEqual(quizResultsLength);
  });
});
