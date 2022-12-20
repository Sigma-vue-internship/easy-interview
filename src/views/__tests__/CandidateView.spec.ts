import { createTestingPinia } from "@pinia/testing";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Candidate from "../CandidateView.vue";
import { useCandidateStore } from "../../stores/candidates";
import { useResultsStore } from "../../stores/results";
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

const getWrapper = () =>
  mount(Candidate, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          plugins: [
            () => ({
              getCandidateById: () =>
                Promise.resolve({
                  data: {
                    position: "position",
                    username: "username",
                    linkedinUrl: "linkedin",
                    feedback: "feedback",
                    avatarUrl: "avatar",
                    id: "1",
                  },
                }),
            }),
            () => ({
              getResultsForCandidate: () =>
                Promise.resolve([
                  {
                    questionAnswer: [],
                    startedAt: 1670929139884,
                    endedAt: 1670929139884,
                    title: "title",
                    id: "11",
                    parent: {
                      id: "1",
                    },
                  },
                  {
                    questionAnswer: [],
                    startedAt: 1670929139884,
                    endedAt: 1670929139884,
                    title: "title",
                    id: "12",
                    parent: {
                      id: "1",
                    },
                  },
                ]),
            }),
          ],
        }),
      ],
    },
  });

describe("Candidate.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should call getCandidateById onMounted with route param", async () => {
    const wrapper = getWrapper();
    const { getCandidateById } = useCandidateStore();
    expect(getCandidateById).toBeCalledWith("1");
  });
  it("should render all candidate results", async () => {
    const wrapper = getWrapper();
    const { getResultsForCandidate } = useResultsStore();
    expect(getResultsForCandidate).toBeCalledWith("1");
    await flushPromises();
    const candidateResultsArray = wrapper.vm.candidateResults;
    const resultsArray = wrapper.findAll(".show-more").length;
    expect(resultsArray).toEqual(candidateResultsArray.length);
  });
});
