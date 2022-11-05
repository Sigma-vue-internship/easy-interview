import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CandidateForm from "../CandidateForm.vue";

describe("CandidateForm.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("v-models should assign values to candidateData", async () => {
    const wrapper = mount(CandidateForm);

    await wrapper.find("#position").setValue("position");
    await wrapper.find("#username").setValue("username");
    await wrapper.find("#linkedin").setValue("linkedin");
    await wrapper.find("#feedback").setValue("feedback");
    await wrapper.find("#avatar").setValue("avatar");

    expect(wrapper.vm.candidateData).toEqual(
      expect.objectContaining({
        position: "position",
        username: "username",
        linkedinUrl: "linkedin",
        feedback: "feedback",
        avatarUrl: "avatar",
        id: 0,
      })
    );
  });
});
