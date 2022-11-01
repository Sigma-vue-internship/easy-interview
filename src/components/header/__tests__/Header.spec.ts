import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "../Header.vue";

const loginWithRedirect = vi.fn();
const logout = vi.fn();
let isAuthenticated = false;

vi.mock("@auth0/auth0-vue", () => ({
  useAuth0: () => ({
    isAuthenticated,
    loginWithRedirect,
    logout,
  }),
}));

describe("Header.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call auth0 login", async () => {
    const wrapper = mount(Header);

    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);

    await button.trigger("click");
    expect(loginWithRedirect).toBeCalled();
  });
});
