import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, watch } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import CandidateForm from "../CandidateForm.vue";
import EasyModal from "../../common/EasyModal.vue";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";

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
  it("if form correct, candidate should be empty", async () => {
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
    await flushPromises();

    expect(wrapper.vm.candidate).toMatchObject({
      avatarUrl: "",
      feedback: "",
      id: 0,
      linkedinUrl: "",
      position: "",
      username: "",
    });
  });
  it("should emit candidate object on put", async () => {
    const wrapper = mount(CandidateForm, {
      propsData: {
        singleCandidate: {
          position: "position 3",
          username: "username 3",
          linkedinUrl: "linkedinUrl 3",
          feedback: "feedback 3",
          avatarUrl:
            "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/541.jpg",
          id: "3",
        },
        formType: "put",
      },
      global: {
        components: {
          EasyModal,
        },
        plugins: [createTestingPinia()],
      },
    });
    const singleCandidate = {
      position: "position 3",
      username: "username 3",
      linkedinUrl: "linkedinUrl 3",
      feedback: "feedback 3",
      avatarUrl:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/541.jpg",
      id: "3",
    };
    wrapper.vm.candidate = { ...singleCandidate };
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(wrapper.emitted("edit-candidate")).toBeTruthy();
    expect(wrapper.emitted("edit-candidate")[0][0]).toEqual(singleCandidate);
  });
});
