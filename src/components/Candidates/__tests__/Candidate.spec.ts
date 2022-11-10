import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Candidate from "../Candidate.vue";

describe("Candidate.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all candidate results", async () => {
    const wrapper = mount(Candidate);
    const candidateResultsArrayLength = wrapper.vm.candidateResults.length;
    const resultsLength = wrapper.findAll("li").length;

    expect(candidateResultsArrayLength).toEqual(resultsLength);
  });
});