import { createPinia, setActivePinia } from "pinia";
import { useQuestionStore } from "../questions";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "../../service/axiosInstance";
import { createApp } from "vue";

// vi.mock("axios", () => ({
//   default: {
//     create: vi.fn().mockImplementation((config) => {
//       get: vi.fn().mockImplementation((url) => {
//         switch (url) {
//           case `${import.meta.env.VITE_MOCK_API_URL}/questions`:
//             return Promise.resolve({
//               data: "123",
//             });
//         }
//       });
//     }),
//   },
// }));
const app = createApp({});
describe("Question Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
  });
  it("should call getAllQuestions", async () => {
    axios.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const questionStore = useQuestionStore();
    const data = await questionStore.getAllQuestions("category 1");

    expect(axios.get).toBeCalledWith("/questions", {
      params: {
        category: "category 1",
      },
    });
    expect(data).toBe("123");
  });

  it("should call postQuestion", async () => {
    axios.post = vi.fn().mockImplementation(() => Promise.resolve());
    const questionStore = useQuestionStore();
    await questionStore.postQuestion({
      text: "text",
      point: 5,
      category: "test",
      answer: "text",
      id: "1",
    });
    expect(axios.post).toBeCalledWith("/questions", {
      text: "text",
      point: 5,
      category: "test",
      answer: "text",
      id: "1",
    });
  });
  it("should call sendQuestion action", async () => {
    const question = {
      text: "string",
      point: 5,
      category: "string",
      answer: "string",
      id: "123",
    };
    axios.put = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const questionStore = useQuestionStore();
    const data = await questionStore.sendQuestion(question);
    expect(axios.put).toBeCalledWith("/questions/123", question);
    expect(data).toEqual("123");
  });

  it("should call deleteQuestion action", async () => {
    axios.delete = vi.fn().mockImplementation(() => Promise.resolve());
    const questionStore = useQuestionStore();
    await questionStore.deleteQuestion("1");
    expect(axios.delete).toBeCalledWith("/questions/1");
  });
});
