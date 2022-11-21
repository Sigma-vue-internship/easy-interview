import useVuelidate from "@vuelidate/core";

export default function (rules, data) {
  const v$ = useVuelidate(rules, data);
  return {
    v$,
  };
}
