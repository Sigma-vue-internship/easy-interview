import { describe, it, expect, vi, beforeEach, vitest } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import QuestionsList from "../QuestionsListView.vue";
import EasyModal from "../../components/common/EasyModal.vue";

import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../stores/questions";
import { useRoute } from "vue-router";

const getWrapper = (props = {}) =>
  mount(QuestionsList, {
    propsData: {
      ...props,
    },
    global: {
      components: {
        EasyModal,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          plugins: [
            () => ({
              getAllQuestions: () =>
                Promise.resolve({
                  data: [
                    {
                      point: 2,
                      text: "На чем основывается ООП в JavaScript ",
                      answer: "На прототипном наследовании",
                      category: "HTML",
                      id: "34",
                    },
                  ],
                }),
              deleteQuestion: () => Promise.resolve("Question deleted"),
            }),
          ],
        }),
      ],
    },
  });

vi.mock("vue-router/dist/vue-router.mjs", () => ({
  useRoute: () => ({
    params: {
      title: "test_category",
    },
  }),
}));
describe("QuestionsList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call getAllQuestions ", async () => {
    const wrapper = getWrapper();
    const { getAllQuestions } = useQuestionStore();

    expect(getAllQuestions).toBeCalledWith("test_category");
  });
  it("should call deleteQuestion with proper id ", async () => {
    const wrapper = getWrapper();
    const { getAllQuestions, deleteQuestion } = useQuestionStore();
    expect(getAllQuestions).toBeCalledWith("test_category");
    await flushPromises();
    const btn = wrapper.find(".delete-question__btn");
    await btn.trigger("click");
    expect(wrapper.vm.deleteQuestionId).toEqual("34");
    const btnDelete = wrapper.find(".btn-danger");
    await btnDelete.trigger("click");
    await flushPromises();
    expect(deleteQuestion).toBeCalled();
  });
});
