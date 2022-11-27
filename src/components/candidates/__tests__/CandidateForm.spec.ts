import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CandidateForm from "../CandidateForm.vue";
import EasyModal from "../../common/EasyModal.vue";
import { nextTick } from "vue";

describe("Candidate.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("v-model should set values to candidate", async () => {
    const wrapper = mount(CandidateForm, {
      global: {
        components: {
          EasyModal,
        },
      },
    });
    wrapper.find("#position").setValue("position");
    wrapper.find("#username").setValue("username");
    wrapper.find("#linkedin").setValue("linkedin");
    wrapper.find("#avatar").setValue("avatar");
    wrapper.find("#feedback").setValue("feedback");

    expect(wrapper.vm.candidate).toMatchObject({
      avatarUrl: "avatar",
      feedback: "feedback",
      id: 0,
      linkedinUrl: "linkedin",
      position: "position",
      username: "username",
    });
  });
  it("after click onSubmit, candidate should be empty", async () => {
    const wrapper = mount(CandidateForm, {
      global: {
        components: {
          EasyModal,
        },
      },
    });

    wrapper.find("#position").setValue("position");
    wrapper.find("#username").setValue("username");
    wrapper.find("#linkedin").setValue("linkedin");
    wrapper.find("#avatar").setValue("avatar");
    wrapper.find("#feedback").setValue("feedback");

    const submitBtn = wrapper.find(".candidate__submit-btn");
    expect(submitBtn.exists()).toBe(true);

    await submitBtn.trigger("submit");
    await nextTick();
    await nextTick();

    expect(wrapper.vm.candidate).toMatchObject({
      avatarUrl: "",
      feedback: "",
      id: 0,
      linkedinUrl: "",
      position: "",
      username: "",
    });
  });
});
