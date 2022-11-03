import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import SearchComponent from "../SearchComponent.vue";

describe("SearchComponent.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("check dropdown", async () => {
    const wrapper = mount(SearchComponent);
    // const dropImg = wrapper.find(".drop_img");
    // const dropMenu = wrapper.find(".dropdown-menu");
    // await dropImg.trigger("click");
    expect(wrapper.find(".dropdown-menu").isVisible()).toBe(false);
  });
});
