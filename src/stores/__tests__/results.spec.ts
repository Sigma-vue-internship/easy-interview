import { createPinia, setActivePinia } from "pinia";
import { useResultsStore } from "../results";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "../../service/axiosInstance";
import { createApp } from "vue";

const app = createApp({});
describe("Results Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
  });
  it("should call action", async () => {
    axios.post = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: {
          questionAnswer: [],
          startedAt: 123,
          endedAt: 123,
          title: "title",
          id: "123",
          parent: {
            position: "position",
            username: "username",
            linkedinUrl: "url",
            feedback: "feedback",
            avatarUrl: "avatar",
            id: "1",
          },
        },
      }),
    );
    const resultStore = useResultsStore();
    const data = await resultStore.postResult(
      {
        questionAnswer: [],
        startedAt: 123,
        endedAt: 123,
        title: "title",
        id: "123",
        parent: {
          position: "position",
          username: "username",
          linkedinUrl: "url",
          feedback: "feedback",
          avatarUrl: "avatar",
          id: "1",
        },
      },
      "1",
    );
    console.log(data, "!!!!!!!!!");
    expect(axios.post).toBeCalledWith("/candidates/1/results", {
      questionAnswer: [],
      startedAt: 123,
      endedAt: 123,
      title: "title",
      id: "123",
      parent: {
        position: "position",
        username: "username",
        linkedinUrl: "url",
        feedback: "feedback",
        avatarUrl: "avatar",
        id: "1",
      },
    });
    expect(data).toMatchObject({
      questionAnswer: [],
      startedAt: 123,
      endedAt: 123,
      title: "title",
      id: "123",
      parent: {
        position: "position",
        username: "username",
        linkedinUrl: "url",
        feedback: "feedback",
        avatarUrl: "avatar",
        id: "1",
      },
    });
  });
  it("should call deleteResult action", async () => {
    axios.delete = vi.fn().mockImplementation(() => Promise.resolve());
    const resultStore = useResultsStore();
    await resultStore.deleteResult("1", "2");
    expect(axios.delete).toBeCalledWith("/candidates/1/results/2");
  });
  it("should call deletePercentageResult action", async () => {
    axios.delete = vi.fn().mockImplementation(() => Promise.resolve());
    const resultStore = useResultsStore();
    await resultStore.deletePercentageResult("1");
    expect(axios.delete).toBeCalledWith("/candidateResults/1");
  });
});
