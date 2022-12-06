import { mount, flushPromises } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import SubmitButton from "../../common/SubmitButton.vue";
import QuizConstructor from "../QuizConstructor.vue";
import { useQuestionStore } from "../../../stores/questions";

const getWrapper = () =>
  mount(QuizConstructor, {
    global: {
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
                      point: 1,
                      text: "test question",
                      answer: "test answer",
                      category: "HTML",
                      id: "1",
                    },
                  ],
                }),
            }),
          ],
        }),
      ],
    },
  });

describe("QuizConstructor.vue", () => {
  it("should render a checkbox after category selction", async () => {
    const wrapper = getWrapper();
    const { getAllQuestions } = useQuestionStore();
    await flushPromises();
    expect(wrapper.find(".form-check-input").exists()).toBe(false);
    await wrapper.find("select").setValue("HTML");
    expect(getAllQuestions).toBeCalled();
    expect(wrapper.findAll("input")).toHaveLength(2);
  });

  it("should add questions", async () => {
    const wrapper = getWrapper();
    const { getAllQuestions } = useQuestionStore();
    await flushPromises();
    expect(getAllQuestions).toBeCalled();
    await wrapper.find("select").setValue("HTML");
    await wrapper.find("li input").setValue(true);
    expect(wrapper.findAll(".list-unstyled")).toHaveLength(1);
    wrapper.findComponent(SubmitButton).vm.$emit("click");
    await nextTick();
    expect(wrapper.findAll(".list-unstyled")).toHaveLength(2);
  });
});
