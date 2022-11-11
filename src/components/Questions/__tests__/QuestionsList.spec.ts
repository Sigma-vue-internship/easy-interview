import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionsList from "../QuestionsList.vue";
import { createTestingPinia } from "@pinia/testing";
import { useQuestionStore } from "../../../stores/questions";
import { useRoute } from "vue-router";

vi.mock("vue-router", () => {
  return {
    useRoute: vi.fn().mockImplementation(() => ({
      params: {
        title: "test_category",
      },
    })),
  };
});
describe("QuestionsList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all questions", async () => {
    const wrapper = mount(QuestionsList, {
      global: {
        plugins: [createTestingPinia(), useRoute()],
      },
    });
    const { getAllQuestions } = useQuestionStore();
    wrapper.vm.questionsList = [
      {
        point: 99,
        text: "text 1",
        answer: "answer 1",
        category: "category 1",
        id: "1",
      },
      {
        point: 11,
        text: "text 10",
        answer: "answer 10",
        category: "category 10",
        id: "10",
      },
      {
        point: 12,
        text: "text 11",
        answer: "answer 11",
        category: "category 11",
        id: "11",
      },
      {
        point: 78,
        text: "text 12",
        answer: "answer 12",
        category: "category 12",
        id: "12",
      },
      {
        point: 19,
        text: "text 13",
        answer: "answer 13",
        category: "category 13",
        id: "13",
      },
      {
        point: 53,
        text: "text 14",
        answer: "answer 14",
        category: "category 14",
        id: "14",
      },
      {
        point: 61,
        text: "text 15",
        answer: "answer 15",
        category: "category 15",
        id: "15",
      },
      {
        point: 74,
        text: "text 16",
        answer: "answer 16",
        category: "category 16",
        id: "16",
      },
      {
        point: 69,
        text: "text 17",
        answer: "answer 17",
        category: "category 17",
        id: "17",
      },
      {
        point: 999,
        text: "text 1",
        answer: "answer 1",
        category: "category 1",
        id: "18",
      },
      {
        point: 999,
        text: "text1231",
        answer: "answer 1",
        category: "category 1",
        id: "19",
      },
    ];

    expect(getAllQuestions).toBeCalledWith("test_category");
    const questionsListArray = wrapper.vm.questionsList.length;
    const questionsLength = wrapper.findAll("li").length;

    expect(questionsListArray).toEqual(questionsLength);
  });
});
