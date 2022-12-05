import { createPinia, setActivePinia } from "pinia";
import { useResultsStore } from "../results";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../../service/axiosInstance";
import { createApp } from "vue";

const app = createApp({});
describe("Results Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const pinia = createPinia().use(() => ({ $axios: axiosInstance }));
    app.use(pinia);
    setActivePinia(pinia);
  });
  it("should call action", async () => {
    axiosInstance.post = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const resultStore = useResultsStore();
    const { data } = await resultStore.postResult("123", 1);
    expect(axiosInstance.post).toBeCalledWith("/candidates/1/results", "123");
    expect(data).toBe("123");
  });
});
