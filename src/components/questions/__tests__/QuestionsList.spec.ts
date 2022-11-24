import { describe, it, expect, vi, beforeEach, vitest } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import QuestionsList from "../QuestionsList.vue";
import EasyModal from "../../common/EasyModal.vue";
import DeleteButton from "../../common/DeleteButton.vue";

import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../../stores/questions";
import { useRoute } from "vue-router";

const getWrapper = (props = {}) =>
  mount(QuestionsList, {
    propsData: {
      ...props,
    },
    global: {
      components: {
        EasyModal,
        DeleteButton,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
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
    const questionStore = useQuestionStore();
    const spy = vi.spyOn(questionStore, "getAllQuestions");
    spy.mockImplementation(() => [
      {
        point: 2,
        text: "На чем основывается ООП в JavaScript ",
        answer: "На прототипном наследовании",
        category: "HTML",
        id: "34",
      },
    ]);
    await flushPromises();
    expect(spy).toBeCalledWith("test_category");

    // expect(spy).toHaveBeenCalledTimes(1);
    // const btn = wrapper.find(".btn-outline-danger");
    // console.log(btn);
    // await btn.trigger("click");
    // expect(store.deleteQuestion).toBeCalledWith("34");
  });
});
