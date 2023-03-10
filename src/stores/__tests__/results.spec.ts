import { createPinia, setActivePinia } from "pinia";
import { useResultsStore } from "../results";

import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "../../service/axiosInstance";
import { createApp } from "vue";
import { Result, PercentsResult } from "../../dto/results";
import { flushPromises } from "@vue/test-utils";

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
            linkedin_url: "url",
            feedback: "feedback",
            avatar_url: "avatar",
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
          linkedin_url: "url",
          feedback: "feedback",
          avatar_url: "avatar",
          id: "1",
        },
      },
      "1",
    );
    expect(axios.post).toBeCalledWith("/candidates/1/results", {
      questionAnswer: [],
      startedAt: 123,
      endedAt: 123,
      title: "title",
      id: "123",
      parent: {
        position: "position",
        username: "username",
        linkedin_url: "url",
        feedback: "feedback",
        avatar_url: "avatar",
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
        linkedin_url: "url",
        feedback: "feedback",
        avatar_url: "avatar",
        id: "1",
      },
    });
  });
  it("should call postPercentageResult", async () => {
    const resultStore = useResultsStore();
    const result: PercentsResult = {
      candidateId: "333",
      id: "1",
      candidateUsername: "test",
      resultPoints: 50,
    };
    axios.post = vi.fn().mockImplementation(() => Promise.resolve());
    await resultStore.postPercentageResult(result);

    expect(axios.post).toBeCalledWith("/candidateResults", result);
  });
  it("should call getPercentageResults", async () => {
    const results: PercentsResult[] = [
      {
        candidateId: "333",
        id: "1",
        candidateUsername: "123",
        resultPoints: 50,
      },
    ];
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: results,
      }),
    );

    const resultStore = useResultsStore();
    const data = await resultStore.getPercentageResults();
    expect(axios.get).toBeCalledWith("/candidateResults");
    expect(data).toEqual(results);
  });
  it("should call getResultsForCandidate", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );

    const resultStore = useResultsStore();
    const data = await resultStore.getResultsForCandidate("123");
    expect(axios.get).toBeCalledWith("/candidates/123/results");
    expect(data).toEqual("123");
  });
  it("should call getOneResultForCandidate", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const resultStore = useResultsStore();
    const data = await resultStore.getOneResultForCandidate("123", "123");

    expect(axios.get).toBeCalledWith("/candidates/123/results/123");
    expect(data).toEqual("123");
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
