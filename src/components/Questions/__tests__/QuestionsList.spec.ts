import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionsList from "../QuestionsList.vue";

describe("QuestionsList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all questions results", async () => {
    const wrapper = mount(QuestionsList);
    const questionsListArray = wrapper.vm.questionsList.length;
    const questionsLength = wrapper.findAll("li").length;

    expect(questionsListArray).toEqual(questionsLength);
  });
});