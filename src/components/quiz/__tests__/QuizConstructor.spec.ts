import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import EditButton from "../../common/EditButton.vue";
import QuizConstructor from "../QuizConstructor.vue";
const getWrapper = () => mount(QuizConstructor);

describe("QuizConstructor.vue", () => {
  it("should render a checkbox after category selction", async () => {
    const wrapper = getWrapper();
    const categoriesArray = wrapper.vm.categories;
    const questionsArray = wrapper.vm.categoryQuestions.length;
    const inputsQuantity = wrapper.findAll("input").length;
    expect(wrapper.find("input").exists()).toBe(false);
    await wrapper.find("select").setValue(categoriesArray[0]);
    expect(inputsQuantity).toEqual(questionsArray);
  });

  it("should add questions", async () => {
    const wrapper = getWrapper();
    const categoriesArray = wrapper.vm.categories;
    await wrapper.find("select").setValue(categoriesArray[0]);
    await wrapper.find("input").setValue(true);
    expect(wrapper.findAll(".list-unstyled")).toHaveLength(1);
    wrapper.findComponent(EditButton).vm.$emit("click");
    await nextTick();
    expect(wrapper.findAll(".list-unstyled")).toHaveLength(2);
  });
});
