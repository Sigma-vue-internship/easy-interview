import { createTestingPinia } from "@pinia/testing";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Candidate from "../CandidateView.vue";
import { useCandidateStore } from "../../stores/candidates";

import { useRoute, useRouter } from "vue-router";

vi.mock("vue-router/dist/vue-router.mjs", () => ({
  useRoute: () => ({
    params: {
      id: "1",
    },
  }),
  useRouter: () => ({
    data: "test",
  }),
}));

describe("Candidate.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should call getCandidateById onMounted with route param", async () => {
    const wrapper = mount(Candidate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const { getCandidateById } = useCandidateStore();
    expect(getCandidateById).toBeCalledWith("1");
  });
  it("should render all candidate results", async () => {
    const wrapper = mount(Candidate, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    await flushPromises();
    const candidateResultsArrayLength = wrapper.vm.candidateResults.length;
    const resultsLength = wrapper.findAll("li").length;
    expect(candidateResultsArrayLength).toEqual(resultsLength);
  });
});
