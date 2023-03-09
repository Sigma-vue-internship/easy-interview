import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import CandidateForm from "../CandidateForm.vue";
import EasyModal from "../../common/EasyModal.vue";
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
      avatar_url: "avatar",
      feedback: "feedback",
      id: 0,
      linkedin_url: "linkedin",
      position: "position",
      username: "username",
    });
  });
  it("should emit candidate object on put", async () => {
    const wrapper = mount(CandidateForm, {
      propsData: {
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
      linkedin_url: "linkedinUrl 3",
      feedback: "feedback 3",
      avatar_url:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/541.jpg",
      id: "3",
    };
    wrapper.setProps({ candidate: { ...singleCandidate } });
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(wrapper.emitted("edit-candidate")).toBeTruthy();
    expect(wrapper.emitted("update:candidate")?.[0][0]).toEqual(
      singleCandidate,
    );
  });
  it("should emit candidate object on post", async () => {
    const wrapper = mount(CandidateForm, {
      propsData: {
        formType: "post",
      },
      global: {
        components: {
          EasyModal,
        },
        plugins: [createTestingPinia()],
      },
    });
    const postCandidate = {
      position: "position 3",
      username: "username 3",
      linkedin_url: "linkedinUrl 3",
      feedback: "feedback 3",
      avatar_url:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/541.jpg",
      id: 0,
    };
    wrapper.setProps({ candidate: { ...postCandidate } });
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();
    expect(wrapper.emitted("add-candidate")).toBeTruthy();
    expect(wrapper.emitted("update:candidate")?.[0][0]).toEqual(postCandidate);
  });
});
