import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import QuestionForm from "../QuestionForm.vue";
import EasyModal from "../../common/EasyModal.vue";
import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../../stores/questions";

const getWrapper = (props = {}) =>
  mount(QuestionForm, {
    propsData: {
      ...props,
    },
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
    const wrapper = getWrapper({
      singleQuestion: {
        text: "",
        point: 0,
        category: "HTML",
        answer: "",
      },
      modalInfo: {
        formId: "addModal",
        formTitle: "Add new question",
      },
    });
    wrapper.find("#point").setValue(1);
    wrapper.find("#text").setValue("question");
    wrapper.find("#category").setValue("React");
    wrapper.find("#answer").setValue("answer");
    const submitButton = wrapper.find(".question__submit-btn");
    const { postQuestion } = useQuestionStore();
    await submitButton.trigger("click");
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
  it("should edit question", async () => {
    const wrapper = getWrapper({
      singleQuestion: {
        text: "test_question",
        point: 5,
        category: "HTML",
        answer: "test_answer",
      },
      modalInfo: {
        formId: "editModal",
        formTitle: "Edit question",
      },
    });
    wrapper.find("#point").setValue(1);
    wrapper.find("#text").setValue("question");
    wrapper.find("#category").setValue("React");
    wrapper.find("#answer").setValue("answer");
    const submitButton = wrapper.find(".question__submit-btn");
    const { sendQuestion } = useQuestionStore();
    await submitButton.trigger("click");
    await flushPromises();
    expect(sendQuestion).toBeCalledWith(
      expect.objectContaining({
        text: "question",
        point: 1,
        category: "React",
        answer: "answer",
      })
    );
  });
});
