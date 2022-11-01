export default class FormValidator {
  constructor(formData, formType, errors) {
    this.formData = formData;
    this.formType = formType;
    this.errors = errors;
  }
  validateForm() {
    this.errors.value = [];
    const data = this.formData.value;

    switch (true) {
      case this.formType === "question" && data.point <= 0:
        this.errors.value.push("Points have to be bigger than 0");

      case this.formType === "question" && data.text.length <= 5:
        this.errors.value.push("Question text has to be bigger than 5 chars");

      case this.formType === "question" && data.answer.length <= 5:
        this.errors.value.push("Question answer has to be bigger than 5 chars");

      case this.formType === "candidate" && data.position.length <= 5:
        this.errors.value.push("Position has to be bigger than 5 chars");

      case this.formType === "candidate" && data.username.length <= 5:
        this.errors.value.push("Username has to be bigger than 5 chars");
      default:
        return this.errors;
    }
  }
}
