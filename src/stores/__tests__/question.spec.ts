import { createPinia, setActivePinia } from "pinia";
import { useQuestionStore } from "../questions";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../../service/axiosInstance";
import { createApp } from "vue";

// TODO:try to make axios mock with vi.mock, and switch for url's
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
    const pinia = createPinia().use(() => ({ $axios: axiosInstance }));
    app.use(pinia);
    setActivePinia(pinia);
  });
  it("should call action with test params and proper address", async () => {
    axiosInstance.get = vi.fn().mockImplementation(() =>
      Promise.resolve({
        data: "123",
      }),
    );
    const questionStore = useQuestionStore();
    const data = await questionStore.getAllQuestions("category 1");
    expect(axiosInstance.get).toBeCalled();

    expect(axiosInstance.get).toBeCalledWith("/questions", {
      params: {
        category: "category 1",
      },
    });
    expect(data).toBe("123");
  });

  it("should call postQuestion action", async () => {
    axiosInstance.post = vi.fn().mockImplementation(() =>
      Promise.resolve({
        text: "text",
        point: 5,
        category: "test",
        answer: "text",
        id: "1",
      }),
    );
    const questionStore = useQuestionStore();
    const data = await questionStore.postQuestion({
      text: "text",
      point: 5,
      category: "test",
      answer: "text",
      id: "1",
    });
    expect(axiosInstance.post).toBeCalledWith("/questions", {
      text: "text",
      point: 5,
      category: "test",
      answer: "text",
      id: "1",
    });
    expect(data).toMatchObject({
      text: "text",
      point: 5,
      category: "test",
      answer: "text",
      id: "1",
    });
  });

  it("should call deleteQuestion action", async () => {
    axiosInstance.delete = vi.fn().mockImplementation(() =>
      Promise.resolve({
        text: "text",
        point: 5,
        category: "test",
        answer: "text",
        id: "1",
      }),
    );
    const questionStore = useQuestionStore();
    const data = await questionStore.deleteQuestion("1");
    expect(axiosInstance.delete).toBeCalledWith("/questions/1");
    expect(data).toMatchObject({
      text: "text",
      point: 5,
      category: "test",
      answer: "text",
      id: "1",
    });
  });
});
