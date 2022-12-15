import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuizResultsList from "../QuizResultsView.vue";
import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(QuizResultsList, {
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
