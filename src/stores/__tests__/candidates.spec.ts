import { createPinia, setActivePinia } from "pinia";
import { useCandidateStore } from "../candidates";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "../../service/axiosInstance";
import { createApp } from "vue";

const app = createApp({});

describe("Candidate Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
  });
  it("should call action with candidate id and proper address", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const candidateStore = useCandidateStore();
    const data = await candidateStore.getCandidateById("1");
    expect(axios.get).toBeCalled();

    expect(axios.get).toBeCalledWith("/candidates/1");
    expect(data).toBe("123");
  });
  it("should call getCandidatesByPage action", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const { getCandidatesByPage } = useCandidateStore();
    const data = await getCandidatesByPage(1);
    expect(axios.get).toBeCalled();
    expect(data).toBe("123");
  });
  it("should call addCandidate action, with candidate body", async () => {
    axios.post = vi.fn().mockImplementation(() => Promise.resolve());
    const { addCandidate } = useCandidateStore();
    await addCandidate({
      position: "position",
      username: "username",
      linkedinUrl: "url",
      feedback: "feedback",
      avatarUrl: "avatar",
      id: "1",
    });
    expect(axios.post).toBeCalledWith("/candidates", {
      position: "position",
      username: "username",
      linkedinUrl: "url",
      feedback: "feedback",
      avatarUrl: "avatar",
      id: "1",
    });
  });
});
