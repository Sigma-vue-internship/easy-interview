import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CandidatesList from "../CandidatesList.vue";

describe("CandidateList.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all the candidates", async () => {
    const wrapper = mount(CandidatesList);
    const candidateItemsLength = wrapper.vm.candidatesList.length;
    const allCandidatesLength = wrapper.findAll(".candidate__item").length;

    expect(candidateItemsLength).toEqual(allCandidatesLength);
  });
});
