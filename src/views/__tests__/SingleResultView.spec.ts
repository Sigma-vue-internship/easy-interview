import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import SingleResult from "../SingleResultView.vue";
import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(SingleResult, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("SingleResult.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all answers from array", async () => {
    const wrapper = getWrapper();
    const answerArrayLength = wrapper.findAll(".full-answer-list").length;
    const renderedList = wrapper.findAll(".answer-item").length;

    expect(answerArrayLength).toEqual(renderedList);
  });
});
