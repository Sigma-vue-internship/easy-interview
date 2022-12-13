import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header.vue";
import { useRoute } from "vue-router";

const loginWithRedirect = vi.fn();
const logout = vi.fn();
const isAuthenticated = false;

vi.mock("@auth0/auth0-vue", () => ({
  useAuth0: () => ({
    isAuthenticated,
    loginWithRedirect,
    logout,
  }),
}));

vi.mock("vue-router/dist/vue-router.mjs", () => ({
  useRoute: () => ({
    params: {
      title: "test_category",
    },
  }),
}));
describe("Header.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call auth0 login", async () => {
    const wrapper = mount(Header);

    const button = wrapper.find(".log-in");
    expect(button.exists()).toBe(true);

    await button.trigger("click");
    expect(loginWithRedirect).toBeCalled();
  });
});
