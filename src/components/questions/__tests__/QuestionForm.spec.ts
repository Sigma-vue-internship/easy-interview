import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import QuestionForm from "../QuestionForm.vue";
import EasyModal from "../../common/EasyModal.vue";
import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../../stores/questions";

const getWrapper = () =>
  mount(QuestionForm, {
    global: {
      components: {
        EasyModal,
      },
      plugins: [createTestingPinia()],
    },
  });

describe("QuestionForm.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should post question", async () => {
    const wrapper = getWrapper();
    wrapper.find("#point").setValue(1);
    wrapper.find("#text").setValue("question");
    wrapper.find("#category").setValue("React");
    wrapper.find("#answer").setValue("answer");
    const submitButton = wrapper.find(".question__submit-btn");
    const { postQuestion } = useQuestionStore();
    await submitButton.trigger("submit");
    await flushPromises();
    expect(postQuestion).toBeCalledWith(
      expect.objectContaining({
        point: 1,
        text: "question",
        category: "React",
        answer: "answer",
      })
    );
  });
});
