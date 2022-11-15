import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionsList from "../QuestionsList.vue";
import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../../stores/questions";
import { useRoute } from "vue-router";

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
    const wrapper = mount(QuestionsList, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { getAllQuestions } = useQuestionStore();

    expect(getAllQuestions).toBeCalledWith("test_category");
  });
});
