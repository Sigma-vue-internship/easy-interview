import { createPinia, setActivePinia } from "pinia";
import { useCandidateStore } from "../candidates";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../../service/axiosInstance";
import { createApp } from "vue";

const app = createApp({});

describe("Candidate Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const pinia = createPinia().use(() => ({ $axios: axiosInstance }));
    app.use(pinia);
    setActivePinia(pinia);
  });
  it("should call action with candidate id and proper address", async () => {
    axiosInstance.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const candidateStore = useCandidateStore();
    const data = await candidateStore.getCandidateById("1");
    expect(axiosInstance.get).toBeCalled();

    expect(axiosInstance.get).toBeCalledWith("/candidates/1");
    expect(data).toBe("123");
  });
  it("should call getCandidatesByPage action", async () => {
    axiosInstance.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const { getCandidatesByPage } = useCandidateStore();
    const data = await getCandidatesByPage(1);
    expect(axiosInstance.get).toBeCalled();
    expect(data).toBe("123");
  });
  it("should call addCandidate action, with candidate body", async () => {
    axiosInstance.post = vi.fn().mockImplementation(() =>
      Promise.resolve({
        position: "position",
        username: "username",
        linkedinUrl: "url",
        feedback: "feedback",
        avatarUrl: "avatar",
        id: "1",
      }),
    );
    const { addCandidate } = useCandidateStore();
    const data = await addCandidate({
      position: "position",
      username: "username",
      linkedinUrl: "url",
      feedback: "feedback",
      avatarUrl: "avatar",
      id: "1",
    });
    expect(axiosInstance.post).toBeCalled();
    expect(data).toMatchObject({
      position: "position",
      username: "username",
      linkedinUrl: "url",
      feedback: "feedback",
      avatarUrl: "avatar",
      id: "1",
    });
  });
});
