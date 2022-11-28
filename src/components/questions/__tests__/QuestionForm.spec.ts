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
      formType: "post",
    });
    const testObj = setProperFormValues(wrapper);
    const submitButton = wrapper.find(".question__submit-btn");
    const { postQuestion } = useQuestionStore();
    await submitButton.trigger("submit");
    await flushPromises();
    expect(postQuestion).toBeCalledWith(expect.objectContaining(testObj));
  });
  it("should put question", async () => {
    const wrapper = getWrapper({
      singleQuestion: {
        text: "test_question",
        point: 5,
        category: "HTML",
        answer: "test_answer",
      },
      formType: "put",
    });
    const testObj = setProperFormValues(wrapper);
    const submitButton = wrapper.find(".question__submit-btn");
    const { sendQuestion } = useQuestionStore();
    await submitButton.trigger("submit");
    await flushPromises();
    expect(sendQuestion).toBeCalledWith(expect.objectContaining(testObj));
  });
  it("should emit updateQuestionsList (put)", async () => {
    const wrapper = getWrapper({
      singleQuestion: {
        text: "test_question",
        point: 5,
        category: "HTML",
        answer: "test_answer",
      },
      formType: "put",
    });
    const testObj = setProperFormValues(wrapper);
    const submitButton = wrapper.find(".question__submit-btn");
    const { sendQuestion } = useQuestionStore();
    await submitButton.trigger("submit");
    await flushPromises();
    expect(sendQuestion).toBeCalledWith(expect.objectContaining(testObj));
    expect(wrapper.emitted().updateQuestionsList).toBeTruthy();
  });
  it("should emit updateQuestionsList (post)", async () => {
    const wrapper = getWrapper({
      singleQuestion: {
        text: "",
        point: 0,
        category: "HTML",
        answer: "",
      },
      formType: "post",
    });
    const testObj = setProperFormValues(wrapper);
    const submitButton = wrapper.find(".question__submit-btn");
    const { postQuestion } = useQuestionStore();
    await submitButton.trigger("submit");
    await flushPromises();
    expect(postQuestion).toBeCalledWith(expect.objectContaining(testObj));
    expect(wrapper.emitted().updateQuestionsList).toBeTruthy();
  });
});

function setProperFormValues(wrapper) {
  wrapper.find("#point").setValue(1);
  wrapper.find("#text").setValue("question");
  wrapper.find("#category").setValue("OOP");
  wrapper.find("#answer").setValue("answer");
  return {
    text: "question",
    point: 1,
    category: "OOP",
    answer: "answer",
  };
}
