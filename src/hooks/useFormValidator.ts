import useVuelidate, {
  ValidationRuleCollection,
  ValidatorResponse,
} from "@vuelidate/core";
import { Candidate } from "../../dto/candidates";
import { Question } from "../../dto/questions";
import { Ref, ref, watch } from "vue";
import {
  required,
  maxValue,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";

export function useFormValidator(
  data: Ref<Candidate | Question>,
  formType: string,
) {
  const showModal = ref<boolean>(false);
  let v$;
  const questionRules: object = {
    max_point: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(5),
    } as ValidationRuleCollection,
    question: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50),
    } as ValidationRuleCollection,
    question_categories_id: { required } as ValidationRuleCollection,
    answer: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(250),
    } as ValidationRuleCollection,
  };
  const candidateRules: object = {
    position: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50),
    } as ValidationRuleCollection,
    username: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50),
    } as ValidationRuleCollection,
    feedback: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(250),
    } as ValidationRuleCollection,
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

  watch(v$, async (newValidation: ValidatorResponse) => {
    if (newValidation.$silentErrors.length) {
      showModal.value = false;
      return;
    }
    showModal.value = true;
  });
  function resetForm() {
    v$.value.$reset();
  }
  return {
    v$,
    resetForm,
    showModal,
  };
}
