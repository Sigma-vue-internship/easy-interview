import { VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import QuizList from "../QuizList.vue";
import { IEmit } from "../../../../dto/emit";
import { wrapperFactory } from "../../../service/wrapperFactory";

const props = {
  categories: ["HTML"],
  isModeReview: false,
  questionArraysByCategory: {
    HTML: [
      { point: 5, text: "HTML2", answer: "answer", category: "HTML", id: "2" },
      { point: 1, text: "HTML3", answer: "answer", category: "HTML", id: "3" },
      {
        point: 5,
        text: "HTML 4",
        answer: "answer",
        category: "HTML",
        id: "15",
      },
    ],
  },
};
const propsReview = {
  categories: ["HTML"],
  isModeReview: true,
  questionArraysByCategory: {
    HTML: [
      { point: 5, text: "HTML2", answer: "answer", category: "HTML", id: "2" },
      { point: 1, text: "HTML3", answer: "answer", category: "HTML", id: "3" },
      {
        point: 5,
        text: "HTML 4",
        answer: "answer",
        category: "HTML",
        id: "15",
      },
    ],
  },
};
const plugins = [createTestingPinia()];
const wrapper: VueWrapper = wrapperFactory(QuizList, props, plugins);

describe("QuizList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all questions, by props", async () => {
    expect(wrapper.findAll("#questionItem").length).toBe(3);
  });

  it("should emit add point", async () => {
    const formChecks = wrapper.findAll(".form-check-input");
    expect(formChecks[2].exists()).toBe(true);
    await formChecks[2].trigger("click");

    expect(wrapper.emitted<IEmit[]>().addPoint).toBeTruthy();
    expect(wrapper.emitted<IEmit[]>().addPoint[0][0]).toEqual(2);
  });

  it("should delete question on review mode", async () => {
    const wrapperReview: VueWrapper = wrapperFactory(
      QuizList,
      propsReview,
      plugins,
    );
    expect(wrapperReview.findAll("#questionItem").length).toBe(3);

    wrapperReview.findAll(".btn-outline-danger")[0].trigger("click");

    expect(wrapperReview.emitted<IEmit[]>().deleteQuestion).toBeTruthy();
    expect(wrapperReview.emitted<IEmit[]>().deleteQuestion[0][1]).toEqual(
      propsReview.questionArraysByCategory["HTML"][0],
    );
  });
  it("should emit postQuiz with result", async () => {
    const wrapperReview: VueWrapper = wrapperFactory(
      QuizList,
      propsReview,
      plugins,
    );
    expect(wrapperReview.findAll("#questionItem").length).toBe(3);

    wrapperReview.findAll(".btn-outline-danger")[0].trigger("click");

    expect(wrapperReview.emitted<IEmit[]>().deleteQuestion).toBeTruthy();
    expect(wrapperReview.emitted<IEmit[]>().deleteQuestion[0][1]).toEqual(
      propsReview.questionArraysByCategory["HTML"][0],
    );
  });
});
