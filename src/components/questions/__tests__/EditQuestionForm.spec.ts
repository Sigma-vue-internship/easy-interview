import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import EditQuestionForm from "../EditQuestionForm.vue";
import EasyModal from "../../common/EasyModal.vue";

describe("Candidate.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("v-model should set values to question's prevState", async () => {
    const wrapper = mount(EditQuestionForm, {
      global: {
        components: {
          EasyModal,
        },
      },
    });
    wrapper.find("#point").setValue("5");
    wrapper.find("#title").setValue("text123");
    wrapper.find("#category").setValue("HTML");
    wrapper.find("#answer").setValue("answer");

    expect(wrapper.vm.prevState).toMatchObject({
      point: 5,
      title: "text123",
      id: 0,
      category: "HTML",
      answer: "answer",
    });
  });
});
