import { flushPromises, VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import CandidateInfo from "../CandidateInfo.vue";
import { IEmit } from "../../../../dto/emit";
import _uniq from "lodash/uniq";
import SubmitButton from "../../common/SubmitButton.vue";

import { wrapperFactory } from "../../../service/wrapperFactory";

const plugins = [createTestingPinia()];
describe("CandidateInfo.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should emit setCandidateSelected", async () => {
    const wrapper: VueWrapper = wrapperFactory(CandidateInfo, {}, plugins);
    wrapper.vm.choosedCandidateObj = {
      position: "123",
      username: "123",
      linkedinUrl: "123",
      feedback: "123",
      avatarUrl: "123",
      id: 4,
    };
    await flushPromises();
    wrapper.findComponent(SubmitButton).trigger("click");
    expect(wrapper.emitted().setCandidateSelected).toBeTruthy();
  });
});
