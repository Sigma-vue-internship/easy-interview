import { Notify } from "notiflix";

export function useError(e) {
  const validationError = e.response.data.validation?.body.message;
  const dbError = e.response.data?.message;

  if (validationError) {
    Notify.failure(`${validationError}`, {
      distance: "65px",
    });
  } else {
    Notify.failure(`${dbError}`, {
      distance: "65px",
    });
    console.log(e);
  }
}
