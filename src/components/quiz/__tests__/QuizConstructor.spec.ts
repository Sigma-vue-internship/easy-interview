import { flushPromises, VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import QuizConstructor from "../QuizConstructor.vue";
import { IEmit } from "../../../../dto/emit";
import _uniq from "lodash/uniq";

import { useQuestionStore } from "../../../stores/questions";

import { wrapperFactory } from "../../../service/wrapperFactory";

const plugins = [
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
              {
                point: 5,
                text: "На чем основывается JavaScript ",
                answer: "На наследовании",
                category: "HTML",
                id: "32",
              },
            ],
          }),
        deleteQuestion: () => Promise.resolve("Question deleted"),
      }),
    ],
  }),
];

describe("QuizConstructor.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should call getAllQuestions on created", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);
    const { getAllQuestions } = useQuestionStore();
    await flushPromises();
    expect(getAllQuestions).toBeCalled();
  });
  it("should add question to quizList on click", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);

    const { getAllQuestions } = useQuestionStore();
    await flushPromises();

    wrapper.vm.isCandidateChoosed = true;
    await flushPromises();

    await wrapper.find("select").setValue("HTML");
    await wrapper.find("#addQuestionBtn").trigger("click");
    await flushPromises();

    expect(wrapper.vm.quizList.length).toEqual(1);
  });
  it("should add all questions to quizList on click", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);

    const { getAllQuestions } = useQuestionStore();
    await flushPromises();

    wrapper.vm.isCandidateChoosed = true;
    await flushPromises();

    await wrapper.find("select").setValue("HTML");
    await wrapper.find("#addAllQuestionsBtn").trigger("click");
    await flushPromises();

    expect(wrapper.vm.quizList.length).toEqual(2);
  });
  it("should delete question from quizList on click inside child QuizList", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);

    const { getAllQuestions } = useQuestionStore();
    await flushPromises();

    wrapper.vm.isCandidateChoosed = true;
    await flushPromises();

    await wrapper.find("select").setValue("HTML");
    await wrapper.find("#addAllQuestionsBtn").trigger("click");
    await flushPromises();

    expect(wrapper.vm.quizList.length).toEqual(2);
    await wrapper.find("#deleteQuestionBtn").trigger("click");
    await flushPromises();
    expect(wrapper.vm.quizList.length).toEqual(1);
  });
});
