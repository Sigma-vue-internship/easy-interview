import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import SubmitButton from "../../common/SubmitButton.vue";
import QuizConstructor from "../QuizConstructor.vue";
const getWrapper = () => mount(QuizConstructor);

describe("QuizConstructor.vue", () => {
  it("should render a checkbox after category selction", async () => {
    const wrapper = getWrapper();
    expect(wrapper.find("input").exists()).toBe(false);
    await wrapper.find("select").setValue("HTML");
    expect(wrapper.findAll("input")).toHaveLength(2);
  });

  it("should add questions", async () => {
    const wrapper = getWrapper();
    await wrapper.find("select").setValue("HTML");
    await wrapper.find("input").setValue(true);
    expect(wrapper.findAll(".list-unstyled")).toHaveLength(1);
    wrapper.findComponent(SubmitButton).vm.$emit("click");
    await nextTick();
    expect(wrapper.findAll(".list-unstyled")).toHaveLength(2);
  });
});
