import { flushPromises, VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import QuizConstructor from "../QuizConstructorView.vue";
import { IEmit } from "../../../dto/emit";
import _uniq from "lodash/uniq";
import SubmitButton from "../../components/common/SubmitButton.vue";
import EasyDropdown from "../../components/common/EasyDropdown.vue";
import { useQuestionStore } from "../../stores/questions";
import { useCandidateStore } from "../../stores/candidates";
import CandidateInfo from "../../components/quiz/CandidateInfo.vue";
import { wrapperFactory } from "../../service/wrapperFactory";

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
        getCandidatesByUsername: username =>
          Promise.resolve({
            data: {
              candidates: [
                {
                  position: "Mihael Shumaher",
                  username: "shoom911",
                  linkedinUrl: "",
                  feedback: "Lol racer",
                  avatarUrl: "123",
                  id: "1",
                },
              ],
              count: 1,
            },
          }),
        deleteQuestion: () => Promise.resolve("Question deleted"),
      }),
    ],
  }),
];

describe("QuizConstructor.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });
  it("should call getAllQuestions on next step click, after candidate got selected", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);
    const { getAllQuestions } = useQuestionStore();
    // const { getCandidatesByUsername } = useCandidateStore();
    // // STAGE: candidate select view
    // const dropdownInput = wrapper.find("#candidateInput");
    // await dropdownInput.trigger("focusin");
    // await dropdownInput.setValue("s");
    // await flushPromises();

    // vi.runAllTimers();
    // await flushPromises();

    // expect(wrapper.emitted().input[0]).toBeTruthy();

    // expect(getCandidatesByUsername).toBeCalledWith("s");
    // const droppedCandidateBtn = wrapper.find("#dropdownObjBtn1");
    // await flushPromises();
    // droppedCandidateBtn.trigger("click");

    // vi.runAllTimers();
    // await flushPromises();
    // // STAGE: candidate got selected
    // expect(wrapper.vm.currentCandidateId).toEqual("1");
    // // STAGE: click next step to questions
    // const nextStepButton = wrapper.find("#stepToQuestions");
    // nextStepButton.trigger("click");
    // await flushPromises();

    // await flushPromises();

    wrapper.findComponent(CandidateInfo).vm.$emit("setCandidateSelected");
    await flushPromises();
    expect(getAllQuestions).toBeCalled();

    // expect(getAllQuestions).toBeCalled();
  });
  it("should add question to quizList on click", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);

    const { getAllQuestions } = useQuestionStore();
    await flushPromises();

    wrapper.findComponent(CandidateInfo).vm.$emit("setCandidateSelected");
    await flushPromises();
    expect(getAllQuestions).toBeCalled();

    await wrapper.find("select").setValue("HTML");
    await wrapper.find("#addQuestionBtn").trigger("click");
    await flushPromises();

    expect(wrapper.vm.quizList.length).toEqual(1);
  });
  it("should add all questions to quizList on click", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);

    wrapper.findComponent(CandidateInfo).vm.$emit("setCandidateSelected");

    await flushPromises();

    wrapper.vm.isCandidateChoosed = false;
    await flushPromises();

    wrapper.findComponent(CandidateInfo).vm.$emit("setCandidateSelected");
    await flushPromises();

    await wrapper.find("select").setValue("HTML");
    await wrapper.find("#addAllQuestionsBtn").trigger("click");
    await flushPromises();

    expect(wrapper.vm.quizList.length).toEqual(2);
  });
  it("should delete question from quizList on click inside child QuizList", async () => {
    const wrapper: VueWrapper = wrapperFactory(QuizConstructor, {}, plugins);

    await flushPromises();

    wrapper.vm.isCandidateChoosed = false;
    await flushPromises();
    wrapper.findComponent(CandidateInfo).vm.$emit("setCandidateSelected");
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
