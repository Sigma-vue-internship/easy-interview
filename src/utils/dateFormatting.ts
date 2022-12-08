export function formattingDate(date: number) {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formattingHours(date: number) {
  if (new Date(date).getMinutes() < 10) {
    return `${new Date(date).getHours()}:0${new Date(date).getMinutes()}`;
  }
  return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
}

export function calculateTime(startDate: number, endDate: number) {
  return Math.floor((endDate - startDate) / 60000);
}

export default { formattingDate, formattingHours, calculateTime };
