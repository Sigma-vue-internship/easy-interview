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
  it("should call getCandidateById", async () => {
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
  it("should call getCandidatesByPage", async () => {
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
  it("should call addCandidate ", async () => {
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
  it("should call editCandidate ", async () => {
    axios.put = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const { editCandidate } = useCandidateStore();
    const data = await editCandidate({
      position: "position",
      username: "username",
      linkedinUrl: "url",
      feedback: "feedback",
      avatarUrl: "avatar",
      id: "1",
    });
    expect(axios.put).toBeCalledWith("/candidates/1", {
      position: "position",
      username: "username",
      linkedinUrl: "url",
      feedback: "feedback",
      avatarUrl: "avatar",
      id: "1",
    });
    expect(data).toEqual("123");
  });
  it("should call deleteCandidateById ", async () => {
    axios.delete = vi.fn().mockImplementation(() => Promise.resolve());
    const { deleteCandidateById } = useCandidateStore();
    await deleteCandidateById("1");
    expect(axios.delete).toBeCalledWith("/candidates/1");
  });
  it("should call getAllCandidates ", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          candidates: [
            {
              position: "string",
              username: "string",
              linkedinUrl: "string",
              feedback: "string",
              avatarUrl: "string",
              id: "123",
            },
          ],
        },
      }),
    );
    const { getAllCandidates } = useCandidateStore();
    const data = await getAllCandidates();
    expect(axios.get).toBeCalledWith("/candidates");
    expect(data).toMatchObject([
      {
        position: "string",
        username: "string",
        linkedinUrl: "string",
        feedback: "string",
        avatarUrl: "string",
        id: "123",
      },
    ]);
  });
  it("should call getCandidatesByUsername ", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          candidates: [
            {
              position: "string",
              username: "string",
              linkedinUrl: "string",
              feedback: "string",
              avatarUrl: "string",
              id: "123",
            },
          ],
        },
      }),
    );
    const { getCandidatesByUsername } = useCandidateStore();
    const data = await getCandidatesByUsername("1");
    expect(axios.get).toBeCalledWith("/candidates?username=1");
    expect(data).toMatchObject([
      {
        position: "string",
        username: "string",
        linkedinUrl: "string",
        feedback: "string",
        avatarUrl: "string",
        id: "123",
      },
    ]);
  });
});
