import useVuelidate from "@vuelidate/core";
import { ref, watch } from "vue";
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";

export function useFormValidator(data, formType) {
  const showModal = ref(false);
  let v$;
  const questionRules = {
    point: { required, minValue: minValue(1), maxValue: maxValue(5) },
    text: { required, minLength: minLength(5), maxLength: maxLength(50) },
    category: { required },
    answer: { required, minLength: minLength(5), maxLength: maxLength(250) },
  };
  const candidateRules = {
    position: { required, minLength: minLength(5), maxLength: maxLength(50) },
    username: { required, minLength: minLength(5), maxLength: maxLength(50) },
    feedback: { required, minLength: minLength(5), maxLength: maxLength(250) },
  };

  switch (formType) {
  case "question":
    v$ = useVuelidate(questionRules, data);
    break;
  case "candidate":
    v$ = useVuelidate(candidateRules, data);
    break;
  default:
    v$ = useVuelidate(questionRules, data);
    break;
  }

  watch(v$, async newValidation => {
    if (newValidation.$silentErrors.length) {
      showModal.value = false;
      return;
    }
    showModal.value = true;
  });
  function resetForm() {
    v$.value.$silentErrors.length = 0;
  }
  return {
    v$,
    resetForm,
    showModal,
  };
}
