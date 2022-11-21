import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import SingleResult from "../SingleResult.vue";

describe("SingleResult.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all answers from array", async () => {
    const wrapper = mount(SingleResult);
    const answerArrayLength = wrapper.findAll(".full-answer-list").length;
    const renderedList = wrapper.findAll(".answer-item").length;

    expect(answerArrayLength).toEqual(renderedList);
  });
});
