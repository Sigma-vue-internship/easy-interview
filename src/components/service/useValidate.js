import { computed } from "vue";
import useVuelidate from "@vuelidate/core";

export default function (rules, data) {
  const formErrorMessage = computed(() => {
    if (v$.value.$errors.length && v$.value.$errors[0].$property) {
      return `${v$.value.$errors[0].$property}: ${v$.value.$errors[0].$message}`;
    }
    return "";
  });

  const v$ = useVuelidate(rules, data);
  return {
    formErrorMessage,
    v$,
  };
}
