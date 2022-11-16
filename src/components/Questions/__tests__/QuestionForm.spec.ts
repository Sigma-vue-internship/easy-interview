import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionForm from "../QuestionForm.vue"
import EasyModal from "../../common/EasyModal.vue";
import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../../stores/questions";
import { nextTick } from "vue";

describe("QuestionForm.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("v-model should set values to question's initState", async () => {
    const wrapper = mount(QuestionForm, {
      global: {
        components: {
          EasyModal,
        },
      },
    });
    wrapper.find("#point").setValue(1);
    wrapper.find("#text").setValue("question");
    wrapper.find("#category").setValue("React");
    wrapper.find("#answer").setValue("answer");
    expect(wrapper.vm.questionData).toMatchObject({
      point: 1,
      text: "question",
      id: 0,
      category: "React",
      answer: "answer",
    });
  });

  it("should post question", async () => {
    const wrapper = mount(QuestionForm, {
      global: {
        components: {
          EasyModal,
        },
        plugins: [createTestingPinia()],
      },
    });
    wrapper.find("#point").setValue(1);
    wrapper.find("#text").setValue("question");
    wrapper.find("#category").setValue("React");
    wrapper.find("#answer").setValue("answer");
    const submitButton = wrapper.find(".question__submit-btn");
    const { postQuestion } = useQuestionStore();
    await submitButton.trigger("submit");
    await nextTick();
    await nextTick();
    expect(postQuestion).toBeCalled();
  })
});
