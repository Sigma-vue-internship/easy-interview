import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import CandidatesList from "../CandidatesList.vue";
import { createTestingPinia } from "@pinia/testing";
import { useCandidateStore } from "../../../stores/candidates";
const getWrapper = (props = {}, data = {}) =>
  mount(CandidatesList, {
    propsData: {
      ...props,
    },
    global: {
      plugins: [createTestingPinia()],
    },
    data() {
      return {
        ...data,
      };
    },
  });

describe("CandidateList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should make axios getAllCandidates call on created hook", async () => {
    getWrapper();
    const { getAllCandidates } = useCandidateStore();
    await flushPromises();
    expect(getAllCandidates).toBeCalled();
  });
  it("should render all candidates", async () => {
    const wrapper = getWrapper(
      {},
      {
        candidatesList: [
          {
            position: "position 1",
            username: "Misha Pronka",
            linkedinUrl: "linkedinUrl 1",
            feedback: "feedback 1",
            avatarUrl:
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/602.jpg",
            id: "1",
          },
          {
            position: "position 2",
            username: "username 2",
            linkedinUrl: "linkedinUrl 2",
            feedback: "feedback 2",
            avatarUrl:
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg",
            id: "2",
          },
        ],
      },
    );
    const candidateItemsLength = wrapper.vm.candidatesList.length;
    const allCandidatesLength = wrapper.findAll(".candidate__item").length;
    console.log(candidateItemsLength);
    console.log(allCandidatesLength);
    expect(candidateItemsLength).toEqual(allCandidatesLength);
  });
});
