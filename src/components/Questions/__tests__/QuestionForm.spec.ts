import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionForm from "../QuestionForm.vue";

describe("QuestionForm.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("v-models should assign values to questionData", async () => {
    const wrapper = mount(QuestionForm);

    await wrapper.find("#point").setValue(5);
    await wrapper.find("#text").setValue("text");
    await wrapper.find("#answer").setValue("answer");
    await wrapper.find("#category").setValue("HTML");

    expect(wrapper.vm.questionData).toEqual(
      expect.objectContaining({
        point: 5,
        text: "text",
        answer: "answer",
        category: "HTML",
        id: 0,
      })
    );
  });
});
